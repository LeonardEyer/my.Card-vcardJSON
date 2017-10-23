// Matcher functions for properties which have certain params that need
// to be matched aswell
const paramMatcherFunctions = {
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

  email: ({ mail, label }) => ({
    key: 'email',
    value: mail,
    params: { type: label }
  }),

  imageData: (value) => ({
    key: 'photo',
    value: value,
    params: { encoding: 'b', type: 'jpeg' }
  })
}

module.exports = paramMatcherFunctions