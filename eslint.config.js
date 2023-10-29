import sheriff from 'eslint-config-sheriff';
import { defineFlatConfig } from 'eslint-define-config';

const sheriffOptions = {
	react: true,
	lodash: true,
	next: false,
	playwright: false,
	jest: false,
	vitest: true,
};

export default defineFlatConfig([
	...sheriff(sheriffOptions),
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			'@typescript-eslint/explicit-module-boundary-types': 'off',
		},
	},
]);
