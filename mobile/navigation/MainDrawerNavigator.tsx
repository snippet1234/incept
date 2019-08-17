import React from 'react';
import {
  createDrawerNavigator,
  HeaderProps,
  DrawerActions,
  DrawerItems
} from 'react-navigation';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { FormsScreen } from '../screens/forms/FormsScreen';
import { AboutScreen } from '../screens/about/AboutScreen';
import { ContactScreen } from '../screens/contact/ContactScreen';
import { FormsItemUpdateScreen } from '../screens/forms/FormItemUpdateScreen';
import { FormUpdateScreen } from '../screens/forms/FormUpdateScreen';
import { ProductList } from '../screens/subscription/ProductList';
import { Cards } from '../screens/subscription/Cards';
import { createStackNavigator } from 'react-navigation';
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Button, Text, Avatar } from '@kitten/ui';
import { PALETTE } from '../constants/Colors';
import { logOut } from '../util/auth';
import { ShowFormScreen } from '../screens/forms/ShowFormScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';

const AppHeader = (props: HeaderProps) => {
  return (
    <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row-reverse',
            backgroundColor: '#fff',
            justifyContent: 'space-between'
          }}
        >
          {/* <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              marginTop: 40,
              marginLeft: 20
            }}
          >
            <Avatar
              shape="round"
              size="small"
              source={require('../assets/icons/eva/arrow-ios-back.png')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          >
            <Image
              style={{
                tintColor: PALETTE.primary,
                height: 40,
                width: 40,
                marginHorizontal: 20,
                resizeMode: 'contain',
                marginTop: 5
              }}
              source={require('../assets/icons/menu1.png')}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 15, marginTop: 5 }} category="h4">
            {props.scene.descriptor.options.headerTitle}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const MenuContent = props => (
  <ScrollView>
    <Text>Some Content</Text>
  </ScrollView>
);
const headerStyle = {
  borderBottomWidth: 0,
  shadowOpacity: 0,
  elevation: 0
};

const getScreenNavigationOptions = (title: string) => ({
  defaultNavigationOptions: {
    headerTitle: title,
    headerStyle: {
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0
    },
    header: AppHeader
  }
});
const DrawerNavigator = createDrawerNavigator(
  {
    Subscription: {
      screen: createStackNavigator(
        {
          screen: SubscriptionScreen
        },
        getScreenNavigationOptions('Subscriptions')
      )
    },

    Forms: {
      screen: createStackNavigator(
        {
          Forms: { screen: FormsScreen },
          UpdateForm: {
            screen: FormUpdateScreen,
            navigationOptions: { headerTitle: 'Update Form' }
          },
          ShowForm: {
            screen: ShowFormScreen,
            navigationOptions: { headerTitle: 'Show Form' }
          },
          UpdateFormItem: {
            screen: FormsItemUpdateScreen,
            navigationOptions: { headerTitle: 'Update Form Item' }
          }
        },
        getScreenNavigationOptions('Manage Forms')
      )
    },
    Profile: {
      screen: createStackNavigator(
        {
          screen: ProfileScreen
        },
        getScreenNavigationOptions('Profile')
      )
    },
    Cards: createStackNavigator(
      {
        screen: Cards
      },
      getScreenNavigationOptions('Manage Cards')
    ),
    About: {
      screen: createStackNavigator(
        {
          screen: AboutScreen
        },
        getScreenNavigationOptions('About Us')
      )
    },
    Contact: {
      screen: createStackNavigator(
        {
          screen: ContactScreen
        },
        getScreenNavigationOptions('Contact')
      )
    }
  },
  {
    initialRouteName: '',
    // contentComponent: MenuContent,
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <DrawerItems {...props} />
          <Text
            onPress={async () => await logOut(props.navigation)}
            style={{ color: PALETTE.errorBackground, padding: 20 }}
          >
            Logout
          </Text>
        </SafeAreaView>
      </View>
    ),
    navigationOptions: {
      headerMode: 'screen',
      header: null
    }
  }
);

export const MainDrawerNavigator = createStackNavigator({
  drawer: { screen: DrawerNavigator }
});
