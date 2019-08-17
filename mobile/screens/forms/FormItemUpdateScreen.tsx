import React, { Component } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Avatar, Button, Input, Layout, Text } from 'react-native-ui-kitten';
import { NavigationScreenProps, withNavigation } from 'react-navigation';

import { CustomButton } from '../../components/CustomButton';
import { API_URLS } from '../../constants/network';
import { Networker } from '../../util/networker';

interface FormItemUpdateScreenViewState {
  formItem: LeadFormItem;
  formItemTypes: LeadFormItemType[];
  selectedType?: string;
  selectedStatus?: string;
  optionValue: string;
}

class FormItemUpdateScreenView extends Component<
  NavigationScreenProps,
  FormItemUpdateScreenViewState
> {
  state: FormItemUpdateScreenViewState = {
    formItem: this.props.navigation.state.params.formItem,
    selectedType: this.props.navigation.state.params.formItem.type.name,
    selectedStatus:
      this.props.navigation.state.params.formItem.status || 'Enabled',
    formItemTypes: [],
    optionValue: ''
  };

  async componentDidMount() {
    const { formItem } = this.state;
    console.warn(formItem);
    const { data } = await Networker.get(API_URLS.FORM_ITEM_TYPES);

    if (data && data.length) {
      this.setState({ formItemTypes: data });
    }
  }

  removeTag = (index: number) => {
    const { formItem } = this.state;
    formItem.options.splice(index, 1);
    this.setState({ formItem });
  };

  addTag = () => {
    const { formItem, optionValue } = this.state;

    this.setState({
      formItem: {
        ...formItem,
        options: [...formItem.options, { value: optionValue }]
      },
      optionValue: ''
    });
  };

  renderOptions = () => {
    const { formItem, selectedType, optionValue } = this.state;
    if (selectedType !== 'select' && !formItem.options) {
      return null;
    }

    if (!formItem.options) {
      formItem.options = [];
    }

    return (
      <>
        <View>
          <Text category="h6" style={{ marginBottom: 15, marginTop: 15 }}>
            Options
          </Text>
        </View>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {formItem.options.map((item, index) => (
            <Button
              key={index}
              onPress={() => this.removeTag(index)}
              status=""
              style={{ width: 100, margin: 2 }}
              size="tiny"
            >
              {item.value}
            </Button>
          ))}
          <Input
            style={{ height: 25 }}
            themedStyle={{ height: 25 }}
            placeholder="Option value"
            value={optionValue}
            onChangeText={value => this.setState({ optionValue: value })}
            onSubmitEditing={this.addTag}
          />
          <Button
            onPress={this.addTag}
            status="warning"
            style={{ marginBottom: 45, marginLeft: 5 }}
          >
            +
          </Button>
        </View>
      </>
    );
  };

  public onSubmit = async () => {
    const {
      formItem,
      formItemTypes,
      selectedType,
      selectedStatus
    } = this.state;
    const newFormItem = formItem;
    newFormItem.status = selectedStatus === 'Enabled';
    newFormItem.type = formItemTypes.find(
      item => item.name === selectedType
    ).id;
    newFormItem.options = (formItem.options as LeadFormItemOption[]).map(
      item => item.value
    );

    console.warn(newFormItem);

    //@ts-ignore
    const { data } = await Networker.put(
      `${API_URLS.FORM}/${formItem.lead_form_id}/formitem/${formItem.id}`,
      formItem
    );
    console.warn(data);
  };

  render() {
    const {
      formItem,
      formItemTypes,
      selectedType,
      selectedStatus
    } = this.state;

    return (
      <>
        <Layout style={{ padding: 20, marginTop: 5, flex: 1 }}>
          <Input
            placeholder="Name"
            label="Name"
            value={formItem.name}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/icon-messaging.png')}
              />
            )}
            onChangeText={value =>
              this.setState({ formItem: { ...formItem, name: value } })
            }
          />
          <Input
            placeholder="Label"
            label="Label"
            value={formItem.label}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/bulb.png')}
              />
            )}
            onChangeText={value =>
              this.setState({ formItem: { ...formItem, label: value } })
            }
          />
          <Input
            placeholder="Placeholder"
            label="Placeholder"
            value={formItem.placeholder}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/bulb.png')}
              />
            )}
            onChangeText={value =>
              this.setState({ formItem: { ...formItem, placeholder: value } })
            }
          />
          <Dropdown
            label="Input Type"
            value={selectedType}
            data={formItemTypes.map(inputType => ({ value: inputType.name }))}
            onChangeText={(value, index, data) => {
              this.setState({ selectedType: value });
            }}
          />
          <Dropdown
            label="Enabled"
            value={selectedStatus}
            data={['Enabled', 'Disabled'].map(status => ({ value: status }))}
            onChangeText={(value, index, data) => {
              this.setState({ selectedStatus: value });
            }}
          />

          {this.renderOptions()}
          <CustomButton onPress={this.onSubmit} title="UPDATE" />
        </Layout>
      </>
    );
  }
}

export const FormsItemUpdateScreen = withNavigation(FormItemUpdateScreenView);
