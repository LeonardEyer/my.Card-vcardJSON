const { expect } = require('chai')

const { constructName } = require('../src/contactNameConstructor')

describe('contactNameConstructor', () => {

  it('constructs name from full name contact', () => {
    const contact = {
      familyName: 'familyName',
      givenName: 'givenName',
      middleName: 'middleName',
      namePrefix: 'namePrefix',
      nameSuffix: 'nameSuffix'
    }
    const name = constructName(contact)
    expect(name).to.equal('familyName;givenName;middleName;namePrefix;nameSuffix')

  })
})