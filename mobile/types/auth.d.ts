export type ClientData = {
  client_id: string;
  secret: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthData = {
  token_type: string;
  access_token: string;
  expires_in: string;
};
