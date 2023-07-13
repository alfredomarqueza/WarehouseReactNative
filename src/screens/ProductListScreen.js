import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { getMarkup } from '../utils/ProductMarkups';
import { formatCurrency } from "react-native-format-currency";
import { Modal, Portal, Text, Button, IconButton, PaperProvider, TouchableRipple } from 'react-native-paper';
import { getProducts, deleteProduct } from '../services/ProductDataAccess';
import { useTranslation } from "react-i18next";

export const ProductListScreen = ({ navigation, route }) => {

    const [t] = useTranslation('common');
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const { isClientView } = route.params;
    const [visible, setVisible] = useState(false);

    const hideModal = () => setVisible(false);

    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.sort((a, b) => { return b.creationDate - a.creationDate }))
        })
    }, [])

    const handleProductDelete = async () => {
        await deleteProduct(productIdToDelete);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts.sort((a, b) => { return b.creationDate - a.creationDate }));
        setVisible(false);
    }

    if (products.length === 0) {
        return (
            <View style={styles.container}>
                <Text>{t('noProducts')}</Text>
            </View>
        )
    }

    return (
        <PaperProvider>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View style={styles.productTile}>
                        <TouchableRipple style={{ flex: 1 }} onPress={() => { navigation.navigate('ProductScreen', { ...item, isClientView }) }}>
                            <View >
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                                <Text>
                                    SKU: {item.SKU}
                                </Text>
                                <Text>
                                    {t('brand')}: {item.brand}
                                </Text>
                                <Text>
                                    {t('price')}: {formatCurrency({ amount: isClientView ? item.price + getMarkup(item.price, item.productType) : item.price, code: 'MXN' })[0]}
                                </Text>
                            </View>
                        </TouchableRipple>

                        {!isClientView &&
                            <View style={{ alignSelf: 'center' }}>
                                <IconButton
                                    icon="delete"
                                    size={20}
                                    onPress={() => { setProductIdToDelete(item._id); setVisible(true); }}
                                />
                            </View>
                        }

                    </View>

                )}
                keyExtractor={item => item._id}
            />
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, alignItems: 'center' }}>
                    <Text style={{ margin: 20, fontSize: 20 }}>{t('removeProduct')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }}>
                        <Button icon="delete" onPress={handleProductDelete} >{t('remove')}</Button>
                        <Button icon="cancel" mode="contained" onPress={hideModal} >{t('cancel')}</Button>
                    </View>

                </Modal>
            </Portal>
        </PaperProvider>
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