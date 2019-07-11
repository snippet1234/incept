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
import { PALLETE } from '../../constants/Colors';

class FormUpdateScreenView extends Component<NavigationScreenProps> {
  private data: { name: string }[] = [
    { name: 'Lorem Opt' },
    { name: 'Lorem Opt' },
    { name: 'Lorem Opt' },
    { name: 'Lorem Opt' },
    { name: 'Lorem Opt' },
    { name: 'Lorem Opt' },
    { name: 'Lorem Opt' }
  ];
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
    return (
      <>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={{
            marginTop: 40,
            marginLeft: 20
          }}
        >
          <Avatar
            shape="round"
            size="small"
            source={require('../../assets/icons/eva/arrow-ios-back.png')}
          />
        </TouchableOpacity>

        <Layout style={{ padding: 20, marginTop: 5, flex: 1 }}>
          <Text category="h4" style={{ marginBottom: 15 }}>
            Update Form Item
          </Text>
          <Input
            placeholder="Name"
            label="Name"
            value={null}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/icon-messaging.png')}
              />
            )}
            onChangeText={value => console.warn}
          />
          <Input
            placeholder="Label"
            label="Label"
            value={null}
            icon={() => (
              <Avatar
                shape="round"
                size="small"
                source={require('../../assets/icons/eva/bulb.png')}
              />
            )}
            onChangeText={value => console.warn}
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
            onChangeText={value => console.warn}
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
            {this.data.map((item, index) => (
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
            onPress={() => console.warn}
            style={{
              width: '100%',
              marginTop: 15,
              borderColor: 'transparent',
              backgroundColor: PALLETE.primary
            }}
          >
            UPDATE
          </Button>
        </Layout>
      </>
    );
  }
}

export const FormsUpdateScreen = withNavigation(FormUpdateScreenView);
