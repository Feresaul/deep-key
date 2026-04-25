import js from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist']
    },
    ...tsEslint.config({
        extends: [js.configs.recommended, ...tsEslint.configs.recommended],
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off'
        }
    })
];
