module.exports = {
    "ignoreFiles": [
        "**/*.js",
        "**/*.jsx",
        "**/*.svg"
      ],
    "rules": {
        "color-hex-case": ["lower", {
            "message": "Lowercase letters are easier to distinguish from numbers"
        }],
        "property-case": "lower",
        "no-eol-whitespace": true,
        "indentation": 2,
        "declaration-block-no-redundant-longhand-properties": true,
        "length-zero-no-unit": true,
        "number-leading-zero": "always",
        "declaration-colon-space-after": "always",
        "block-opening-brace-space-before": "always",
        "block-closing-brace-newline-after": "always",
        "declaration-block-semicolon-newline-after": "always",
        "declaration-block-single-line-max-declarations": 1,
        "rule-empty-line-before": "always",
        "selector-list-comma-newline-after": "always",
        "selector-attribute-quotes": "always",
        "function-url-quotes": "never",
        "string-quotes": "double",
        "comment-no-empty": true,
        "font-family-no-duplicate-names": true
    }
}