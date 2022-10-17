import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from "react-native-format-currency";
import { Modal, Portal, Text, Button, IconButton, Provider, Divider } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export const CartScreen = ({ navigation }) => {

    const [t] = useTranslation('common');
    const { productsOnCart, emptyCart, removeProductFromCart } = useContext(CartContext);

    const [visible, setVisible] = useState(false);

    const hideModal = () => setVisible(false);
    const handlePurchase = () => {

        setVisible(true);
    }

    if (productsOnCart.length === 0) {
        return (
            <View style={styles.container}>
                <Text>{t('noProducts')}</Text>
            </View>
        )
    }

    const total = productsOnCart.reduce((previousValue, item) => previousValue + item.price, 0)

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1, alignSelf: 'stretch' }}
                data={productsOnCart}
                renderItem={({ item, index }) => (
                    <View style={styles.productTile}>

                        <View >
                            <Text style={{ fontWeight: 'bold' }}>
                                {item.name}
                            </Text>
                            <Text>
                                {t('price')}: {formatCurrency({ amount: item.price, code: 'MXN' })[0]}
                            </Text>
                        </View>

                        <View style={{ alignSelf: 'center' }}>
                            <IconButton
                                icon="delete"
                                size={20}
                                onPress={() => { removeProductFromCart(index); }}
                            />
                        </View>

                    </View>

                )}
                keyExtractor={(item, index) => index}
            />
            <Divider></Divider>
            <Text style={{ alignSelf: 'flex-end', marginRight: 50 }}>Total:
                <Text style={{ fontWeight: 'bold' }}>{formatCurrency({ amount: total, code: 'MXN' })[0]}</Text>
            </Text>
            <Divider></Divider>
            <Button style={{ marginTop: 50 }} icon="check" mode="contained" onPress={handlePurchase}>{t('purchase')}</Button>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, alignItems: 'center' }}>
                        <Text style={{ margin: 20, fontSize: 20, color: 'black' }}>{t('thanksForBuying')} {moment(new Date()).format('dddd DD MMMM YYYY')}</Text>
                        <LottieView style={{ height: 150, width: 150 }} source={require('../assets/animations/shipping-truck.json')} autoPlay />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }}>
                            <Button icon="check" mode="contained" onPress={() => { hideModal(); emptyCart(); }} >OK</Button>
                        </View>

                    </Modal>
                </Portal>
            </Provider>
        </View>
    )

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productTile: {
        margin: 10,
        padding: 10,
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});