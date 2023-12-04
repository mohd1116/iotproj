import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [idCard, setIdCard] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!idCard || !password) {
            alert('Please enter your email and password');
            return;
        }
    
        const serverUrl = 'http://192.168.1.156:3000/login'; // Use your server URL here
    
        try {
            const response = await axios.post(serverUrl, {
                idCard,
                password,
            });
    
            if (response.data.success) {
                alert('Login Successful!');
                navigation.navigate('QuestionScreen'); // Make sure this navigation route is correctly named
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
                <Text style={styles.buttonText}>LOGIN</Text>
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
        color: 'rgb(138, 43, 226)',
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
        backgroundColor: 'rgb(138, 43, 226)',
        borderRadius: 8,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;



// const [idCard, setIdCard] = useState('');
//     const [password, setPassword] = useState('');
//     const serverIP = 'http://192.168.56.1:3000'; // Update this IP address
//     const handleLogin = async () => {
//     try {
//         const response = await fetch(`${serverIP}/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 idCard,
//                 password,
//             }),
//         });

//         const data = await response.json();
//         console.log('Login Response:', data);

//         // Handle success or show an error message to the user
//         if (data.success) {
//             navigation.navigate('HomeLoged', { user: data.user });
//         } else {
//             // Handle error
//             console.error(data.error);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };