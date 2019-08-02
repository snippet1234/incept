export type AuthData = {
  access_token: string,
  expiresAt: number;
  refresh_token: string;
}

export type ClientData = {
  secret: string;
  client_id: number;
  grant_type: string;
}

export enum Status {
  ACTIVE = "active",
  ARCHIVED = "archived"
}

export type LeadForm = {
  id: string;
  name: string;
  items: LeadFormItem[];
  status: Status;
}

export type LeadFormItem = {
  id: string;
  name: string;
  label: string;
  status: boolean;
  placeholder: string;
  lead_form_type_id: string;
  type: LeadFormItemType;
  options?: LeadFormItemOption[];
}

export type LeadFormItemType = {
  id: string;
  name: string;
}

export type FormItemResponse = {
  formItem: LeadFormItem;
  value: string;
}

export type LeadFormItemOption = {
  id?: string;
  value: string;
}