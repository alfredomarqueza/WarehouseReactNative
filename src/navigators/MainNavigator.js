import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { AddProductScreen } from '../screens/AddProductScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { CartScreen } from '../screens/CartScreen';
import { ConnectScreen } from '../screens/ConnectScreen';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

export function MainNavigator() {

  const [t] = useTranslation('common');

  return (

    <Stack.Navigator initialRouteName="ConnectScreen">
      <Stack.Screen name="ConnectScreen" options={{ title: 'Conectar a API', }} component={ConnectScreen} />
      <Stack.Screen name="MainScreen" options={{
        title: t('productWarehouse'),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} component={MainScreen} />
      <Stack.Screen name="AddProductScreen" options={{
        title: t('addProduct'),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
        component={AddProductScreen} />
      <Stack.Screen name="ProductListScreen" options={{
        title: t('productList'),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} component={ProductListScreen} />
      <Stack.Screen name="ProductScreen" options={{
        title: t('product'),
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }} component={ProductScreen} />
      <Stack.Screen name="CartScreen" options={{
        title: t('shoppingCart'),
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }} component={CartScreen} />
    </Stack.Navigator>

  );
}