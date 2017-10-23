const contactMatcherFunctions = require('./contactMatcherFunctions')
const paramMatcherFunctions = require('./paramMatcherFunctions')

// Container for matcherFunctions
const matcherFunctions = { ...contactMatcherFunctions, ...paramMatcherFunctions }

module.exports = { matcherFunctions }