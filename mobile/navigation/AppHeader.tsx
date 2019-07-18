import React from 'react';
import { HeaderProps } from 'react-navigation';
import { View, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from 'react-navigation';


export const AppHeader = (props: HeaderProps) => {
  console.log(props.scene.descriptor.options.headerTitle);
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image
              style={{ tintColor: 'purple', height: 40, width: 40, marginHorizontal: 20, resizeMode: 'contain' }}
              source={require('../assets/icons/eva/more-vertical.png')}
            />
          </TouchableOpacity>
          {props.scene.descriptor.options.headerTitle}

        </View>
      </SafeAreaView>
    </View>

  )
}