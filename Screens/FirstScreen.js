import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Alert } from "react-native";
import axios from "axios";
import { useUser } from "./Components/UserContext";

const FirstScreen = ({ navigation }) => {
  const { idCard } = useUser();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const heightItems = Array.from({ length: 121 }, (v, k) => ({
    label: `${100 + k} cm`,
    value: 100 + k,
  }));
  const weightItems = Array.from({ length: 161 }, (v, k) => ({
    label: `${40 + k} kg`,
    value: 40 + k,
  }));
  const maritalStatusItems = [
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
    { label: "Divorced", value: "Divorced" },
    { label: "Widowed", value: "Widowed" },
  ];
  const ageItems = Array.from({ length: 81 }, (v, k) => ({
    label: `${18 + k} years`,
    value: 18 + k,
  }));

  const handleFirstScreen = async () => {
    if (!age || !height || !weight || !maritalStatus) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields before proceeding."
      );
      return;
    }
    console.log(idCard);
    const serverUrl = "http://192.168.1.156:3000/FirstScreen"; // Use your server URL here

    try {
      const response = await axios.post(serverUrl, {
        idCard,
        age,
        height,
        weight,
        maritalStatus,
      });

      if (response.data.success) {
        Alert.alert(
          "Validation Successful!",
          "Now please read the questions and answer it!."
        );
        navigation.navigate("QuestionScreen"); // Replace 'QuestionScreen' with your actual screen name
      } else {
        Alert.alert(
          "Validation Error",
          response.data.error || "Data validation failed"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          Alert.alert("Validation Error", "Error: " + error.response.status);
        } else {
          Alert.alert("Network Error", "Network error or server is down");
        }
      } else {
        console.error("Error handling data validation:", error);
        Alert.alert("Error", "An error occurred during data validation.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Age:</Text>
        <RNPickerSelect
          style={styles.pickerSelect}
          placeholder={{ label: "Select your age...", value: null }}
          items={ageItems}
          onValueChange={setAge}
          value={age}
        />

        <Text style={styles.label}>Height (cm):</Text>
        <RNPickerSelect
          style={styles.pickerSelect}
          placeholder={{ label: "Select your height...", value: null }}
          items={heightItems}
          onValueChange={setHeight}
          value={height}
        />

        <Text style={styles.label}>Weight (kg):</Text>
        <RNPickerSelect
          style={styles.pickerSelect}
          placeholder={{ label: "Select your weight...", value: null }}
          items={weightItems}
          onValueChange={setWeight}
          value={weight}
        />

        <Text style={styles.label}>Marital Status:</Text>
        <RNPickerSelect
          style={styles.pickerSelect}
          placeholder={{ label: "Select Marital Status", value: null }}
          items={maritalStatusItems}
          onValueChange={setMaritalStatus}
          value={maritalStatus}
        />

        <TouchableOpacity style={styles.button} onPress={handleFirstScreen}>
          <Text style={styles.buttonText}>NextPage</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(32, 32, 36)",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    color: "turquoise",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: "turquoise",
    borderRadius: 8,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerSelect: {
    inputIOS: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginBottom: 10,
      borderRadius: 8,
      fontSize: 16,
      color: "white",
    },
    inputAndroid: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginBottom: 10,
      borderRadius: 8,
      fontSize: 16,
      color: "white",
    },
  },
});

export default FirstScreen;
