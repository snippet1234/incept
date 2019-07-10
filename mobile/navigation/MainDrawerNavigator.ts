import { createDrawerNavigator } from 'react-navigation';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { FormsScreen } from '../screens/forms/FormsScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';
import { AboutScreen } from '../screens/about/AboutScreen';
import { ContactScreen } from '../screens/contact/ContactScreen';

export const MainDrawerNavigator = createDrawerNavigator({
  Profile: {
    screen: ProfileScreen
  },
  Forms: {
    screen: FormsScreen
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
