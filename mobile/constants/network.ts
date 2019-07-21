const { serverUrl } = require('../package.json');

const makeUrl = (endPoint: string) => {
  return `${serverUrl}/api/v1/${endPoint}`;
};

export const API_URLS = {
  BASE: serverUrl,
  LOGIN: serverUrl + '/oauth/token',
  CLIENT: serverUrl + '/api/clients',
  REGISTER: makeUrl('auth/register'),
  FORM: makeUrl('leadform'),
  SUBCRIPTION: makeUrl('subscription')
};
