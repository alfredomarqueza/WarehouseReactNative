/**
 * App de muestra: Almacén de productos
 * autor: @alfredomarqueza
 * 2022
 *
 */

import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext';
import { MainNavigator } from './navigators/MainNavigator';
import common_en from './translations/en/common.json';
import common_es from './translations/es/common.json';
import i18next from 'i18next';
import { initReactI18next  } from 'react-i18next';
import 'intl-pluralrules';
import 'moment/locale/es';

const App = () => {


  i18next
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      debug: true,
      resources: {
        en: {
          common: common_en,
        },
        es: {
          common: common_es,
        },
      },
    });    

  return (

    <View style={{ flex: 1 }} >      
      <CartProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </CartProvider>
    </View>


  );
};



export default App;
