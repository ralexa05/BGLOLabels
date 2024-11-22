import express from 'express';
import { Registry, collectDefaultMetrics } from 'prom-client';

import logger from './logger.js';

const register = new Registry();
collectDefaultMetrics({ register });

const app = express();

// Middleware to set response headers for metrics
app.use((req, res, next) => {
  res.set('Content-Type', register.contentType);
  next();
});

app.get('/metrics', async (req, res) => {
  try {
    const metrics = await register.metrics();
    res.send(metrics);
  } catch (ex) {
    logger.error(`Error serving metrics: ${ex instanceof Error ? ex.message : 'Unknown error'}`);
    res.status(500).send(ex instanceof Error ? ex.message : 'Unknown error');
  }
});

export const startMetricsServer = (port: number, host: string = '127.0.0.1') => {
  const server = app.listen(port, host, () => {
    logger.info(`Metrics server is listening on ${host}:${port}`);
  });

  return {
    server,
    close: () => {
      server.close(() => {
        logger.info('Metrics server shutdown');
      });
    }
  };
};
