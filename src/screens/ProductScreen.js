import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { ProductTypeEnum } from '../enums/ProductTypeEnum';
import { getMarkup } from '../utils/ProductMarkups';
import { TvTypeEnum } from '../enums/TvTypeEnum';
import dayjs from 'dayjs';
import { formatCurrency } from "react-native-format-currency";
import { CartContext } from '../context/CartContext';
import { useTranslation } from "react-i18next";

export const ProductScreen = ({ navigation, route }) => {

    const { addProductToCart } = useContext(CartContext);

    const [t] = useTranslation('common');

    const {
        _id,
        isClientView,
        name,
        SKU,
        brand,
        price,
        productType,
        creationDate,
        meta1,
        meta2,
    } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.productTile}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}> {name}</Text>
                <Text>{t('availableSince')}: {dayjs(creationDate).format("DD/MMMM/YYYY")}</Text>
                <Text>{t('productType')}: {productType}</Text>
                <Text>SKU: {SKU}</Text>
                <Text>{t('brand')}: {brand}</Text>
                {productType === ProductTypeEnum.TV && <>
                    <Text>{t('screenType')}: {meta1}</Text>
                    <Text>{t('screenSize')}: {meta2}"</Text>
                </>}

                {productType === ProductTypeEnum.Shoe && <>
                    <Text>{t('material')}: {t(meta1)}</Text>
                    <Text>{t('numberSize')}: {meta2}</Text>
                </>}

                {productType === ProductTypeEnum.Laptop && <>
                    <Text>{t('CPU')}: {meta1}</Text>
                    <Text>{t('ramMemory')}: {meta2} Gb</Text>
                </>}

                {!isClientView &&
                    <Text>{t('price')}: {formatCurrency({ amount: price, code: 'MXN' })[0]}</Text>
                }
                <Text>{t('salePrice')}: <Text style={{ fontWeight: 'bold' }}> {formatCurrency({ amount: price + getMarkup(price, productType), code: 'MXN' })[0]}</Text></Text>
                {isClientView &&
                    <Button style={{ marginTop: 20 }} icon="cart" mode="contained" onPress={() => {
                        addProductToCart({ name, price: price + getMarkup(price, productType), id: _id });
                        navigation.popToTop()
                    }}>{t('addToCart')}</Button>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    productTile: {
        elevation: 4,
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10
    }

});