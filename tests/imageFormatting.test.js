const { expect } = require('chai')

const { parseMyCardJSON } = require('../index')
const { promisifyAll } = require('bluebird')
const { readFileAsync, writeFileAsync } = promisifyAll(require('fs'))

describe('imageFormatting', () => {
  it('formats image correctly', async () => {
    const cardJSON = await readFileAsync('./cards/cardwithimageandmissingfields.json').then(JSON.parse)
    const vcf = parseMyCardJSON(cardJSON)
    await writeFileAsync('./cards/cardwithimageandmissingfields.vcf', vcf.toString('3.0'))
  })
})