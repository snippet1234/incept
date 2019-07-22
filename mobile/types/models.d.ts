enum Status {
  ACTIVE = "active",
  ARCHIVED = "archived"
}

type LeadForm = {
  id: string;
  name: string;
  items: LeadFormItem[];
  status: Status;
}

type LeadFormItem = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: LeadFormItemType;
  options: LeadFormItemOption;
}

type LeadFormItemType = {
  id: string;
  name: string;
}

type FormItemResponse = {
  formItem: LeadFormItem;
  value: string;
}

type LeadFormItemOption = {
  id: string;
  value: string;
}