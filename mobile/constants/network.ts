const { serverUrl } = require('../package.json');

const makeUrl = (endPoint: string) => {
  return `${serverUrl}/${endPoint}`;
};

export const API_URLS = {
  BASE: serverUrl,
  LOGIN: makeUrl('auth/login'),
  CLIENT: makeUrl('clients'),
  REGISTER: makeUrl('auth/register'),
  FORM: makeUrl('form'),
  SUBCRIPTION: makeUrl('subscription')
};
