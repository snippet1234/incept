import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import {
  Avatar,
  List,
  ListItem,
  Button,
  ButtonProps,
  StyleType,
  Text,
  Layout,
  Input
} from 'react-native-ui-kitten';
import { ListRenderItemInfo, View, TouchableOpacity } from 'react-native';
import { PALETTE } from '../../constants/colors';

interface FormItemUpdateScreenViewState {
  formItem: LeadFormItem;
}

class FormItemUpdateScreenView extends Component<NavigationScreenProps, FormItemUpdateScreenViewState> {
  state: FormItemUpdateScreenViewState = {
    formItem: this.props.navigation.state.params.formItem
  }

  private onItemPress = (index: number) => {
    // Handle item press
  };

  private renderItem = (
    info: ListRenderItemInfo<{ name: string }>
  ): React.ReactElement => {
    const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
      return (
        <>
          <Button
            size="small"
            appearance="ghost"
            status="warning"
            style={style}
          >
            UPDATE
          </Button>
          <Button size="small" appearance="ghost" status="danger" style={style}>
            X
          </Button>
        </>
      );
    };

    return (
      <ListItem
        title={info.item.name}
        description="11 fields | Live"
        onPress={this.onItemPress}
        accessory={Accessory}
        titleStyle={{ fontSize: 17 }}
        descriptionStyle={{ marginTop: 7 }}
        style={{
          paddingVertical: 10,
          borderBottomColor: '#aaf',
          borderBottomWidth: 0.3
        }}
      />
    );
  };

  render() {
    const { formItem } = this.state;

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
            onChangeText={value => this.setState({ formItem: { ...formItem, name: value } })}
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
            onChangeText={value => this.setState({ formItem: { ...formItem, label: value } })}
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
            onChangeText={value => this.setState({ formItem: { ...formItem, placeholder: value } })}
          />
          <Input
            placeholder="Type"
            label="Type"
            value={null}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/arrowhead-down.png')}
              />
            )}
            onChangeText={value => this.setState({ formItem: { ...formItem, label: value } })}
          />
          <Input
            placeholder="Enabled"
            label="Enabled"
            value={'Enabled'}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/arrowhead-down.png')}
              />
            )}
            onChangeText={value => console.warn}
          />
          <Text category="h6" style={{ marginBottom: 15, marginTop: 15 }}>
            Options
          </Text>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {[{ name: 'some option' }].map((item, index) => (
              <Button
                key={index}
                status="success"
                style={{ width: 100, margin: 5 }}
                size="tiny"
              >
                {item.name + '  X'}
              </Button>
            ))}
          </View>
          <Button
            onPress={() => this.props.navigation.goBack()}
            style={{
              width: '100%',
              marginTop: 15,
              borderColor: 'transparent',
              backgroundColor: PALETTE.primary
            }}
          >
            UPDATE
          </Button>
        </Layout>
      </>
    );
  }
}

export const FormsItemUpdateScreen = withNavigation(FormItemUpdateScreenView);
