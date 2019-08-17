import React, { SyntheticEvent, ChangeEvent } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Tag
} from 'antd';
import { FormProps } from 'antd/lib/form';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { Networker } from '../util/network';
import { API_URLS } from '../constants/network';
import { LeadFormItemType, LeadFormItem } from '../util/types';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

interface ItemFormViewProps extends FormComponentProps {
  selected?: LeadFormItem
}

type TagData = {
  id?: string;
  value: string;
}

class ItemFormView extends React.Component<ItemFormViewProps> {
  state = {
    selectedItem: this.props.selected,
    confirmDirty: false,
    autoCompleteResult: [],
    formItemTypes: [],
    inputVisible: false,
    inputValue: { value: '' },
    tags: this.props.selected ? this.props.selected.options ? this.props.selected.options : [] : []
  };


  static getDerivedStateFromProps(nextProps: ItemFormViewProps, prevState: any) {
    
    if(nextProps.selected !== prevState.selectedItem) {
      return {
        selectedItem: nextProps.selected,
        confirmDirty: false,
        autoCompleteResult: [],
        inputVisible: false,
        inputValue: { value: '' },
        tags: nextProps.selected ? nextProps.selected.options ? nextProps.selected.options : [] : []  
      }
    }

    return null;
  }

  async componentDidMount() {
    const { data } = await Networker.get(API_URLS.ITEM_TYPES);
    this.setState({
      formItemTypes: data
    });
  }

  input: any;

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.warn('YESSSS ')
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleClose = (removedTag: TagData) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.props.form.setFieldsValue({ options: tags.map(t => t.value) });

    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e: any) => {
    this.setState({ inputValue: { value: e.target.value } });
  };

  handleInputConfirm = () => {
    let { inputValue, tags } = this.state;
    let { selected: options } = this.props;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.props.form.setFieldsValue({ options: tags.map(t => t.value) });
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: { value: '' },
    });
  };

  saveInputRef = (input: any) => (this.input = input);


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, formItemTypes, inputVisible, inputValue, tags } = this.state;
    const { selected } = this.props;
    if (selected && !selected.options) {
      selected.options = []
    }

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onResetCapture={() => {
        this.setState({ tags: [] });
      }} onSubmit={this.handleSubmit}>
        <Form.Item label="Name" >
          {getFieldDecorator('name', {
            initialValue: selected ? selected.name : undefined,
            rules: [
              {
                required: true,
                message: 'Please enter item name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Placeholder" hasFeedback>
          {getFieldDecorator('placeholder', {
            initialValue: selected ? selected.placeholder : undefined,
            rules: [
              {
                required: true,
                message: 'Please input placeholder!',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Label" hasFeedback>
          {getFieldDecorator('label', {
            initialValue: selected ? selected.label : undefined,
            rules: [
              {
                required: true,
                message: 'Please enter label!',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Type" hasFeedback>
          {getFieldDecorator('type', {
            initialValue: selected ? selected.type.id : undefined,
            rules: [
              {
                required: true,
                message: 'Please choose type!',
              }
            ],
          })(<Select>
            {formItemTypes.map((type: LeadFormItemType) => <Option value={type.id}>{type.name}</Option>)}
          </Select>)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('options', {
            initialValue: selected ? selected.options : undefined,
          })(<Input type="hidden" />)}
        </Form.Item>
        {tags.map((tag, index) => <Tag key={index} closable={true} onClose={this.handleClose} >
          {tag.value}
        </Tag>)}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue.value}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
            </Tag>
        )}
      </Form>
    );
  }
}

export const ItemForm = Form.create<ItemFormViewProps>({ name: 'register' })(ItemFormView);
