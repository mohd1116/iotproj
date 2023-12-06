import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import CommonHeader from './CommonHeader ';

const SignUp = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!fullName || !idCard || !age || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const serverUrl = 'http://192.168.1.39:3000/signup'; // Use your server URL here

        try {
            const response = await axios.post(serverUrl, {
                fullName,
                idCard,
                age,
                email,
                password,
                confirmPass: confirmPassword,
            });

            if (response.data.success) {
                alert('Sign Up Successful!');
                navigation.navigate('FirstScreen'); // Make sure this navigation route is correctly named
            } else {
                alert(response.data.error || 'Signup failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 409) {
                        alert('ID Card or Email already exists');
                    } else {
                        alert('Signup failed: ' + error.response.status);
                    }
                } else {
                    alert('Network error or server is down');
                }
            } else {
                console.error('Error handling sign up:', error);
                alert('An error occurred during sign up.');
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <CommonHeader />
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="ID Number"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    keyboardType="numeric"
                    onChangeText={setIdCard}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    keyboardType="numeric"
                    onChangeText={setAge}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={setConfirmPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgb(32, 32, 36)',
    },
    title: {
        fontSize: 40,
        color: 'turquoise',
        marginBottom: 30,
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
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignUp;