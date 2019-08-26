import { string } from 'prop-types';

enum Status {
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}

type LeadForm = {
  id: string;
  name: string;
  items: LeadFormItem[];
  status: Status;
};

type LeadFormItem = {
  id: string;
  name: string;
  label: string;
  status: boolean;
  placeholder: string;
  type: LeadFormItemType | string;
  options?: LeadFormItemOption[] | string[];
};

type LeadFormItemType = {
  id: string;
  name: string;
};

type FormItemResponse = {
  formItem: LeadFormItem;
  value: string;
};

type LeadFormItemOption = {
  id?: string;
  value: string;
};

type Plan = {
  id?: string;
  name: string;
  description: string;
  forms_count: number;
  website: boolean;
};

type User = {
  id?: string;
  name: string;
  email: string;
};
