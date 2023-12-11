import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CommonHeader from './CommonHeader ';

const Login = ({ navigation }) => {
    const [idCard, setIdCard] = useState('');
    const [password, setPassword] = useState('');

    const goToSignUp = () => {
        navigation.navigate('SignUp'); // if there is no account
    };
    const goToFormDataScreen = () => {
        navigation.navigate("FormDataScreen", { idCard: idCard });
    };
    
    const handleLogin = async () => {
        if (!idCard || !password) {
            alert('Please enter your email and password');
            return;
        }
    
        const serverUrl = 'http://192.168.1.65:3000/login'; // Use your server URL here
    
        try {
            const response = await axios.post(serverUrl, {
                idCard,
                password,
            });
    
            if (response.data.success) {
                alert('Login Successful!');
                navigation.navigate('FirstScreen'); // Make sure this navigation route is correctly named
            } else {
                alert(response.data.error || 'Login failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert('Invalid email or password');
                    } else {
                        alert('Login failed: ' + error.response.status);
                    }
                } else {
                    alert('Network error or server is down');
                }
            } else {
                console.error('Error handling login:', error);
                alert('An error occurred during login.');
            }
        }
        
    };
    

    return (
        <View style={styles.container}>
            <CommonHeader />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="ID Card"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setIdCard(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToSignUp}>
                <Text style={styles.buttonText}>I don't have an account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToFormDataScreen}>
                <Text style={styles.buttonText}>test FormDataScreen </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(32, 32, 36)',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        color: 'turquoise',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 16,
        color: 'white',
    },
    button: {
        backgroundColor: 'turquoise',
        borderRadius: 8,
        paddingVertical: 10, // Adjusted padding to make the button smaller
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;
