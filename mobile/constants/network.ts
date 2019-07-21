const { serverUrl } = require('../package.json');

const makeUrl = (endPoint: string) => {
  return `${serverUrl}/api/${endPoint}`;
};

export const API_URLS = {
  LOGIN: serverUrl + 'oauth/token',
  CLIENT: makeUrl('clients'),
  REGISTER: makeUrl('auth/register'),
  FORM: makeUrl('form'),
  SUBCRIPTION: makeUrl('subscription')
};
