
const cmf = (key) => (value) => ({ key, value })

const contactMatcherFunctions = {
  identifier: cmf('identifier'),
  contactType: cmf('kind'),
  birthday: cmf('bday'),
  nickname: cmf('nickname'),
  organizationName: cmf('org'),
  departmentName: cmf('role'),
  jobTitle: cmf('title'),
  note: cmf('note'),
  imageData: cmf('photo')
}

// EXPERIMENtiNG ##############################################################

const noOP = () => { }

const nameConstructorFunctions = {
  namePrefix: noOP,
  givenName: noOP,
  middleName: noOP,
  familyName: noOP,
  previousFamilyName: noOP,
  nameSuffix: noOP,
}

// #############################################################################

const matcherFunctions = {

  ...contactMatcherFunctions,

  socialProfile: ({ url, service }) => ({
    key: 'url',
    value: url,
    params: { type: service }
  }),

  url: ({ url, label }) => ({
    key: 'url',
    value: url,
    params: { type: label }
  }),

  phoneNumber: ({ phoneNumber, label }) => ({
    key: 'tel',
    value: phoneNumber,
    params: { type: label }
  }),

  postalAddress: ({ data, label }) => ({
    key: 'adr',
    value: Object.values(data).join(';'),
    params: { type: label }
  }),

  email: ({ label, mail }) => ({
    key: 'email',
    value: mail,
    params: { type: label }
  })

}

const matcher = {
  matcherFunctions
}

module.exports = matcher