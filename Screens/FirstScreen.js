import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Alert } from 'react-native';
import axios from 'axios';

const FirstScreen = ({ navigation }) => { 
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const heightItems = Array.from({ length: 121 }, (v, k) => ({ label: `${100 + k} cm`, value: 100 + k }));
  const weightItems = Array.from({ length: 161 }, (v, k) => ({ label: `${40 + k} kg`, value: 40 + k }));
  const maritalStatusItems = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Widowed', value: 'Widowed' },
  ];
  const ageItems = Array.from({ length: 81 }, (v, k) => ({ label: `${18 + k} years`, value: 18 + k }));

  

  const hundleFirstScreen = async () => {
    if (!name || !surname || !age || !height || !weight || !maritalStatus) {
      Alert.alert("Missing Information", "Please fill in all fields before proceeding.");
      return;
    }

    const serverUrl = 'http://192.168.1.156:3000/FirstScreen'; // Use your server URL here

    try {
      const response = await axios.post(serverUrl, {
        name,
        surname,
        age,
        height,
        weight,
        maritalStatus
      });

      if (response.data.success) {
        Alert.alert('Validation Successful!');
        navigation.navigate('QuestionScreen'); // Replace 'QuestionScreen' with your actual screen name
      } else {
        Alert.alert('Validation Error', response.data.error || 'Data validation failed');
      }

      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          Alert.alert('Validation Error', 'Error: ' + error.response.status);
        } else {
          Alert.alert('Network Error', 'Network error or server is down');
        }
      } else {
        console.error('Error handling data validation:', error);
        Alert.alert('Error', 'An error occurred during data validation.');
      }
    }
  
  };
  
  return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
    
          <Text style={styles.label}>Surname:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSurname}
            value={surname}
          />
    
          <Text style={styles.label}>Age:</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Select your age...', value: null }}
            items={ageItems}
            onValueChange={setAge}
            value={age}
            useNativeAndroidPickerStyle={false}
          />
    
          <Text style={styles.label}>Height (cm):</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Select your height...', value: null }}
            items={heightItems}
            onValueChange={setHeight}
            value={height}
            useNativeAndroidPickerStyle={false}
          />
    
          <Text style={styles.label}>Weight (kg):</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Select your weight...', value: null }}
            items={weightItems}
            onValueChange={setWeight}
            value={weight}
            useNativeAndroidPickerStyle={false}
          />
    
          <Text style={styles.label}>Marital Status:</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Select Marital Status', value: null }}
            items={maritalStatusItems}
            onValueChange={setMaritalStatus}
            value={maritalStatus}
            useNativeAndroidPickerStyle={false}
          />
    
          <TouchableOpacity style={styles.button} onPress={hundleFirstScreen}>
            <Text style={styles.buttonText}>NextPage</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Adjusted for scrollable content
    alignItems: 'center', // Center items horizontally
    padding: 20,
    backgroundColor: 'rgb(32, 32, 36)',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    color: 'rgb(138, 43, 226)',
    alignSelf: 'flex-start', // Align the labels to the start
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    backgroundColor: 'rgb(138, 43, 226)',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputAndroid: {
    fontSize: 16,
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default FirstScreen;
