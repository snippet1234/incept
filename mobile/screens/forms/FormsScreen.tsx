import React, { Component } from 'react';
import { ListRenderItemInfo, Image, WebView } from 'react-native';
import {
  Button,
  ButtonProps,
  Layout,
  List,
  ListItem,
  StyleType,
  Text
} from 'react-native-ui-kitten';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { API_URLS } from '../../constants/network';
import { Networker } from '../../util/networker';
import { PALETTE } from '../../constants/colors';
import { View, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

interface FormsScreenViewState extends NavigationScreenProps {
  forms: LeadForm[];
}

class FormsScreenView extends Component<FormsScreenViewState> {
  state = {
    forms: []
  };

  async componentDidMount() {
    const { data } = await Networker.get<LeadForm[]>(API_URLS.FORM);
    if (data && data.length) {
      this.setState({ forms: data });
    }
  }

  private onItemPress = (index: number) => {
    // Handle item press
    this.props.navigation.navigate('ShowForm', {
      form: this.state.forms[index]
    });
  };

  private renderItem = (
    info: ListRenderItemInfo<LeadForm>
  ): React.ReactElement => {
    const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
      return (
        <>
          <Button
            size="small"
            appearance="ghost"
            status="warning"
            style={style}
            onPress={() => this.onItemPress(0)}
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
        title={`${info.item.name}`}
        description={`${info.item.items.length} fields | ${info.item.status}`}
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
    const { forms } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Layout style={{ padding: 20, marginTop: 25, flex: 1 }}>
          {!forms.length && (
            <View
              style={{ alignContent: 'center', margin: 20, marginTop: '20%' }}
            >
              <Image
                style={{ tintColor: 'whitesmoke' }}
                source={require('../../assets/icons/eva/shopping-cart.png')}
              />
              <Text>
                Your forms will appear here. Please upgrade to a paid plan
              </Text>
            </View>
          )}
          <List
            style={{ backgroundColor: 'white' }}
            data={forms}
            renderItem={this.renderItem}
          />
          <Text category="h3" style={{ marginTop: 140, color: PALETTE.green, textAlign: 'right' }}>Please update the form to continue</Text>

        </Layout>
      </ScrollView>
    );
  }
}

export const FormsScreen = withNavigation(FormsScreenView);
