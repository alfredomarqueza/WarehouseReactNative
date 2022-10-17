import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Text, Badge } from 'react-native-paper';
import { CartContext } from '../context/CartContext';
import { LanguagePicker } from './components/LanguagePicker';
import { useTranslation } from 'react-i18next';

export const MainScreen = ({ navigation }) => {

    const { productsOnCart } = useContext(CartContext);
    const [t] = useTranslation('common');

    return (
        <View>
            <LanguagePicker />
            <Text style={{ textAlign: 'center' }}>Admin</Text>
            <View style={{ flexDirection: 'row', margin: 10 }} >
                <View style={styles.tile}>
                    <TouchableRipple style={{ flex: 1 }} onPress={() => { navigation.navigate('AddProductScreen') }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>{t('addProduct')}</Text>
                            <Feather name="box" size={40} color='#777' />
                        </View>

                    </TouchableRipple>
                </View>

                <View style={styles.tile}>
                    <TouchableRipple style={{ flex: 1 }} onPress={() => { navigation.navigate('ProductListScreen', { isClientView: false }) }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>{t('productList')}</Text>
                            <FontAwesome5 name="list" size={40} color='#777' />
                        </View>

                    </TouchableRipple>
                </View>

            </View >
            <Text style={{ textAlign: 'center' }}>{t('client')}</Text>
            <View style={{ flexDirection: 'row', margin: 10 }} >

                <View style={styles.tile}>
                    <TouchableRipple style={{ flex: 1 }} onPress={() => { navigation.navigate('ProductListScreen', { isClientView: true }) }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>{t('productList')}</Text>
                            <FontAwesome5 name="boxes" size={40} color='#777' />

                        </View>

                    </TouchableRipple>
                </View>
                <View style={styles.tile}>
                    <TouchableRipple style={{ flex: 1 }} onPress={() => { navigation.navigate('CartScreen') }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>{t('shoppingCart')}</Text>
                            <Feather name="shopping-cart" size={40} color='#777' />
                            {productsOnCart.length > 0 && <Badge style={{ position: 'absolute', top: 30, right: 30 }}>{productsOnCart.length}</Badge>}
                        </View>

                    </TouchableRipple>
                </View>

            </View >
        </View>

    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    tile: {
        flex: 1,
        margin: 10,
        elevation: 4,
        height: height / 4,
        backgroundColor: 'white'
    }


});
