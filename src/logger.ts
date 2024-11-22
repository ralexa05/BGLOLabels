// Logger configuration setup for the application
// Uses environment-specific settings to enable pretty printing in development
import { pino } from 'pino';

// Configure logger based on production or development environment settings
function createLogger() {
  const isProduction = process.env.NODE_ENV === 'production';
  return pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: isProduction ? undefined : {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname'
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime
  });
}

const logger = createLogger();

export default logger;
