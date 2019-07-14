import { createDrawerNavigator } from 'react-navigation';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { FormsScreen } from '../screens/forms/FormsScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';
import { AboutScreen } from '../screens/about/AboutScreen';
import { ContactScreen } from '../screens/contact/ContactScreen';
import { FormsItemUpdateScreen } from '../screens/forms/FormItemUpdateScreen';
import { FormUpdateScreen } from '../screens/forms/FormUpdateScreen';

export const MainDrawerNavigator = createDrawerNavigator({
  Forms: {
    screen: FormsScreen
  },
  UpdateFormItem: {
    screen: FormsItemUpdateScreen
  },
  UpdateForm: {
    screen: FormUpdateScreen
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
