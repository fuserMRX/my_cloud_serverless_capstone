module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "parser": "@babel/eslint-parser",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "requireConfigFile": false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
         },
    },
    "plugins": [
        "react",
        "jsdoc"
    ],
    "rules": {
        "quotes": ["error", "single"],
        "no-trailing-spaces": [2, { "skipBlankLines": false }],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "semi": "error",
        "react/prop-types": 0,
        "array-bracket-spacing": ["error", "never"],
        "no-multi-spaces": "error",
        "react/no-unescaped-entities": 0,
        "jsdoc/require-jsdoc": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-returns": 1,
        "jsdoc/require-description": 1,
    }
};