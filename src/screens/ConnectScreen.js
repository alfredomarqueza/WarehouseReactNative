import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';
import { isServerValid } from '../services/ProductDataAccess';
import { ConnectionString } from '../ConnectionString';

export const ConnectScreen = ({ navigation }) => {

    const [conneting, setConnecting] = useState(false);
    const [error, setError] = useState(false);
    const [url, setUrl] = useState('http://127.0.0.1:3000');

    const handleConnect = () => {
        setConnecting(true);

        ConnectionString.connectionString = url;

        isServerValid().then((result) => {
            if (result === true) {
                navigation.replace('MainScreen');
            } else {
                setError(true);
                setConnecting(false);
            }
        }).catch((error) => {
            setError(true);
            setConnecting(false);
        })
    }

    return (
        <View style={styles.container}>
            <View >

                <Text style={{ textAlign: 'center', fontSize: 30 }}>Almacén de productos</Text>
                <TextInput
                    value={url}
                    style={{ margin: 20 }}
                    label={'API URL'}
                    placeholder={'http://127.0.0.1:3000'}
                    autoFocus={true}
                    onChangeText={(value) => setUrl(value)}
                />
                <Button mode="contained" icon="publish" style={{ alignSelf: 'center' }} onPress={handleConnect}>Conectar</Button>
            </View>
            {conneting && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={{ textAlign: 'center' }}>Error al conectar</Text>}

        </View>
    )

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'stretch',
    },


});