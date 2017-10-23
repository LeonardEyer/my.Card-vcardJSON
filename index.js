const vCard = require('vcf')

const { promisifyAll } = require('bluebird')
const { readFileAsync, writeFileAsync } = promisifyAll(require('fs'))
const { singular } = require('pluralize')
const { matcherFunctions } = require('./src/matcher')

const readJSON = identifier => readFileAsync('./cards/' + identifier + '.json').then(JSON.parse)
const writeVCF = (identifier, data) => writeFileAsync('./cards/' + identifier + '.vcf', data)
const isArray = a => (!!a) && (a.constructor === Array)
vCard.prototype.addPropObj = function ({ key, value, params = {} }) {
  this.add(key, value, params)
}

const main = async () => {

  const sampleCardIdentifier = 'MyCard-JSON-Contact-Format-Prototype'
  const cardJSON = await readJSON(sampleCardIdentifier)
  const contact = cardJSON.contact

  const vcf = new vCard()

  for (var contactProperty in contact) {

    const element = contact[contactProperty]

    if (isArray(element)) {

      element
        .map(profile => matcherFunctions[singular(contactProperty)](profile))
        .map(prop => vcf.addPropObj(prop))

    } else if (matcherFunctions.hasOwnProperty(contactProperty)) {

      const prop = matcherFunctions[contactProperty](element)
      vcf.addPropObj(prop)
    }
  }


  const newCardIdentifier = sampleCardIdentifier
  writeVCF(newCardIdentifier, vcf.toString('3.0'))
  console.log(vcf.toString('3.0'))

}

main()