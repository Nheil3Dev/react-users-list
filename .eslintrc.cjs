module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: [
		'standard',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'react/prop-types': 'off',
		'react/display-name': 'off'
	}
}
