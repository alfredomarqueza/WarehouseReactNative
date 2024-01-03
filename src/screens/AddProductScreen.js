import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { publishProduct } from '../services/ProductDataAccess';
import { Picker } from '@react-native-picker/picker';
import { Text, TextInput, Button } from 'react-native-paper';
import { ProductTypeEnum } from '../enums/ProductTypeEnum';
import { ShoeTypeEnum } from '../enums/ShoeTypeEnum';
import { TvTypeEnum } from '../enums/TvTypeEnum';
import LottieView from 'lottie-react-native';
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from 'react-i18next';

export const AddProductScreen = ({ navigation }) => {

    const [t] = useTranslation('common');

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            SKU: '',
            brand: '',
            price: '',
            productType: '',
            meta1: '',
            meta2: '',
        }
    });

    const [productType, setProductType] = useState('');

    const onSubmit = async (data) => {

        data.price = parseFloat(data.price);

        console.log(data)
        setPublishing(true);
        await publishProduct(data);
        setTimeout(() => {

            navigation.replace('ProductListScreen', { isClientView: false });

        }, 2000);
    };

    const [publishing, setPublishing] = useState(false);

    if (publishing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{t('publishing')}</Text>
                <LottieView style={{ height: 200, width: 200 }} source={require('../assets/animations/box.json')} autoPlay />
            </View>
        )
    }

    return (

        <ScrollView >

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.textbox}
                        label={t('productName')}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={errors.name}
                        value={value}
                    />
                )}
                name="name"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.textbox}
                        label="SKU"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={errors.SKU}
                        value={value}
                    />
                )}
                name="SKU"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.textbox}
                        label={t('brand')}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={errors.brand}
                        value={value}
                    />
                )}
                name="brand"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.textbox}
                        label={t('price')}
                        onBlur={onBlur}
                        onChangeText={(value) => { onChange(value.replace(/[^0-9\\.]+/g, '')) }}
                        error={errors.price}
                        value={value}
                        keyboardType='numeric'
                    />
                )}
                name="price"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[{
                        borderRadius: 4,
                        elevation: 2,
                        borderWidth: errors.productType ? 1 : 0,
                        borderColor: errors.productType ? 'red' : 'gray',
                    }, styles.textbox]}>
                        <Picker
                            selectedValue={value}
                            onValueChange={(value, index) => { onChange(value); setProductType(value) }}>
                            <Picker.Item style={{ color: 'gray' }} label={t('selectProduct')} value="" />
                            {Object.values(ProductTypeEnum).map((item, index) => (
                                <Picker.Item key={index} label={t(item)} value={item} />
                            ))}
                        </Picker>
                    </View>
                )}
                name="productType"
            />

            {productType === ProductTypeEnum.TV && <>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[{
                            borderRadius: 4,
                            elevation: 2,
                        }, styles.textbox]}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}>
                                <Picker.Item style={{ color: 'gray' }} label={t('selectScreen')} value="" />
                                {Object.values(TvTypeEnum).map((item, index) => (
                                    <Picker.Item key={index} label={item} value={item} />
                                ))}
                            </Picker>
                        </View>
                    )}
                    name="meta1"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.textbox}
                            label={t('screenSize')}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={errors.meta2}
                            value={value}
                            keyboardType='numeric'
                        />
                    )}
                    name="meta2"
                />
            </>}

            {productType === ProductTypeEnum.Shoe && <>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[{
                            borderRadius: 4,
                            elevation: 2,
                        }, styles.textbox]}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}>
                                <Picker.Item style={{ color: 'gray' }} label={t('selectMaterial')} value="" />
                                {Object.values(ShoeTypeEnum).map((item, index) => (
                                    <Picker.Item key={index} label={t(item)} value={item} />
                                ))}
                            </Picker>
                        </View>
                    )}
                    name="meta1"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.textbox}
                            label={t('numberSize')}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={errors.meta2}
                            value={value}
                            keyboardType='numeric'
                        />
                    )}
                    name="meta2"
                />
            </>}

            {productType === ProductTypeEnum.Laptop && <>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[{
                            borderRadius: 4,
                            elevation: 2,
                        }, styles.textbox]}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}>
                                <Picker.Item style={{ color: 'gray' }} label={t('selectCPU')} value="" />
                                <Picker.Item label="Intel" value="Intel" />
                                <Picker.Item label="AMD" value="AMD" />
                            </Picker>
                        </View>
                    )}
                    name="meta1"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.textbox}
                            label={t('ramMemory')}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={errors.meta2}
                            value={value}
                        />
                    )}
                    name="meta2"
                />
            </>}

            <Button style={styles.textbox} mode="contained" icon="publish" onPress={handleSubmit(onSubmit, (errors) => { console.log(errors) })} >{t('publish')}</Button>

            <View style={{ height: 500 }}></View>

        </ScrollView >

    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    textbox: {

        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    }



});
