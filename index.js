const vCard = require('vcf')

const { singular } = require('pluralize')
const { matcherFunctions } = require('./src/matcher')
const { constructName } = require('./src/contactNameConstructor')

const isArray = a => (!!a) && (a.constructor === Array)

vCard.prototype.addPropObj = function ({ key, value, params = {} }) {
  this.add(key, value, params)
}

const parseMyCardJSON = async (cardJSON) => {

  const { contact } = cardJSON
  const vcf = new vCard()

  // Construct contact name
  vcf.add('n', constructName(contact))

  for (var contactProperty in contact) {

    const element = contact[contactProperty]

    // If the element is not set we do not need to add a property
    if(!element) continue

    if (isArray(element)) {

      // Generate props of every element in array and add it to our vcf
      element
        .map(profile => matcherFunctions[singular(contactProperty)](profile))
        .map(prop => vcf.addPropObj(prop))

    } else if (matcherFunctions.hasOwnProperty(contactProperty)) {

      // Add all other properties
      const prop = matcherFunctions[contactProperty](element)
      vcf.addPropObj(prop)
    }
  }

  return vcf
}

module.exports = { parseMyCardJSON }