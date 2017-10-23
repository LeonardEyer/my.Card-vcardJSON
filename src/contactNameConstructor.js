// All the keys corresponding to the contacts name
// in order as they have to appear in the vcard format
const contactNameKeys = [
  'familyName',
  'givenName',
  'middleName',
  'namePrefix',
  'nameSuffix'
]

const constructName = (contact) => {

  let fullName
  for (let key of contactNameKeys) {

    if (contact.hasOwnProperty(key)) {
      const element = contact[key]
      fullName = [fullName, element].join(';')
    }
  }

  return fullName.substr(1)
}

module.exports = { constructName }