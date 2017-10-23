const { expect } = require('chai')

const { matcherFunctions } = require('../src/matcher')
const { promisifyAll } = require('bluebird')
const { readFileAsync } = promisifyAll(require('fs'))

describe('matcherFunctions', () => {

  it('should parse social profiles as url', async () => {

    const path = './cards/MyCard-JSON-Contact-Format-Prototype.json'
    const { socialProfiles } = (await readFileAsync(path).then(JSON.parse)).contact
    const socialProfileMatcherFunction = matcherFunctions['socialProfile']
    const resultArray = socialProfiles.map(x => socialProfileMatcherFunction(x))

    for (let i = 0; i < resultArray.length; i++) {

      expect(resultArray[i].value).to.equal(socialProfiles[i].url)
      expect(resultArray[i].key).to.equal('url')
      expect(resultArray[i].params.type).to.equal(socialProfiles[i].service)
      
    }

  })
})