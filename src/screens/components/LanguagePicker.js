import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Dimensions, View } from 'react-native';
import dayjs from 'dayjs';
import { useTranslation } from "react-i18next";

export const LanguagePicker = () => {

    const { i18n } = useTranslation();

    return (
        <View style={styles.pickerBox}>
            <Picker
                selectedValue={i18n.language}
                onValueChange={(value, index) => {
                    dayjs.locale(value);
                    i18n.changeLanguage(value);
                }}>
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Español" value="es" />
            </Picker>
        </View>)

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    pickerBox: {

        width: width / 2,
        margin: 10,
        elevation: 4,
        backgroundColor: 'white',
        alignSelf: 'flex-end'
    }

});