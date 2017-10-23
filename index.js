const vCard = require('vcf')
const { promisify } = require('util')
const fs = require('fs')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const { singular } = require('pluralize')

const { matcherFunctions } = require('./src/matcher')

const readJSON = identifier => readFileAsync('./cards/' + identifier + '.json').then(JSON.parse)
const writeVCF = (identifier, data) => writeFileAsync('./cards/' + identifier + '.vcf', data)

const isArray = a => (!!a) && (a.constructor === Array)

const main = async () => {

  const sampleCardIdentifier = 'MyCard-JSON-Contact-Format-Prototype'
  const cardJSON = await readJSON(sampleCardIdentifier)
  const contact = cardJSON.contact

  const vcf = new vCard()
  vCard.prototype.addObj = ({ key, value, params }) => vCard.property.add(key, value, params)

  for (var contactProperty in contact) {

    const element = contact[contactProperty]

    if (isArray(element)) {
      
      element
        .map(profile => matcherFunctions[singular(contactProperty)](profile))
        .map(({ key, value, params }) => vcf.add(key, value, params))

    } else if (matcherFunctions.hasOwnProperty(contactProperty)) {

      const {key, value} = matcherFunctions[contactProperty](element)
      vcf.add(key, value)
    }
  }


  const newCardIdentifier = sampleCardIdentifier
  writeVCF(newCardIdentifier, vcf.toString('4.0'))
  console.log(vcf.toString('4.0'))

}

main()