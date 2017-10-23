// Generates a function that will generate a keyValue pair
// in an object container
const cmf = (key) => (value) => ({ key, value })

// Prepare cmf function with the keys
const contactMatcherFunctions = {
  identifier: cmf('identifier'),
  contactType: cmf('kind'),
  birthday: cmf('bday'),
  organizationName: cmf('org'),
  departmentName: cmf('role'),
  jobTitle: cmf('title'),
  note: cmf('note'),
  previousFamilyName: cmf('x-maidenname'),
  nickname: cmf('nickname')  
}

module.exports = contactMatcherFunctions