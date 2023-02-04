module.exports = {
    "*.js": ["npm run lint", "git add"],
    "*.css": ["npm run stylelintcss", "git add"],
    "*.scss": ["npm run stylelintscss", "git add"]
}