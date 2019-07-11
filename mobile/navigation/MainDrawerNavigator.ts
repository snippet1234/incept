import { createDrawerNavigator } from 'react-navigation';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { FormsScreen } from '../screens/forms/FormsScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';
import { AboutScreen } from '../screens/about/AboutScreen';
import { ContactScreen } from '../screens/contact/ContactScreen';
import { FormsUpdateScreen } from '../screens/forms/FormUpdateScreen';
import { FormItemsScreen } from '../screens/forms/FormsItemsScreen';

export const MainDrawerNavigator = createDrawerNavigator({
  UpdateFormItem: {
    screen: FormItemsScreen
  },
  UpdateForm: {
    screen: FormsUpdateScreen
  },
  Forms: {
    screen: FormsScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Subscription: {
    screen: SubscriptionScreen
  },
  About: {
    screen: AboutScreen
  },
  Contact: {
    screen: ContactScreen
  }
});
