import { configs as eslintConfigs } from '@eslint/js';
import { configs as tsConfigs, config as tsConfig } from 'typescript-eslint';

export default tsConfig(
  eslintConfigs.recommended, // Base ESLint recommendations
  ...tsConfigs.strictTypeChecked, // TypeScript strict type-checking
  ...tsConfigs.stylisticTypeChecked, // TypeScript style guidelines
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'], // Allows JS files to be included in TypeScript project
          defaultProject: 'tsconfig.json', // Default TS project configuration
        },
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off', // Disabled: personal/project preference
      '@typescript-eslint/restrict-template-expressions': 'off', // Disabled: allow flexibility in template expressions
    },
  },
  {
    files: ['eslint.config.mjs'], // Specific file configuration
    extends: [tsConfigs.disableTypeChecked], // Disable type checking for specific files
  },
);
