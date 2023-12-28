/* eslint-disable no-alert */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import CommonHeader from "./Components/CommonHeader ";
import { useUser } from "./Components/UserContext";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const { idCard, setIdCard } = useUser(); //to save it globaly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (
      !name ||
      !surname ||
      !idCard ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const serverUrl = "http://10.0.2.2:3000/signup"; // Use your server URL here

    try {
      const response = await axios.post(serverUrl, {
        idCard,
        name,
        surname,
        email,
        password,
        confirmPass: confirmPassword,
      });

      if (response.data.success) {
        Alert.alert("Welcom to EmeCV", "Sign Up Successful!");
        navigation.navigate("FirstScreen"); // Make sure this navigation route is correctly named
      } else {
        alert(response.data.error || "Signup failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            alert("ID Card or Email already exists");
          } else {
            alert("Signup failed: " + error.response.status);
          }
        } else {
          alert("Network error or server is down");
        }
      } else {
        console.error("Error handling sign up:", error);
        alert("An error occurred during sign up.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <CommonHeader />
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={setName}
        />
        <TextInput
          placeholder="Surname"
          style={styles.input}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={setSurname}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgb(32, 32, 36)",
  },
  title: {
    fontSize: 40,
    color: "turquoise",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
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
});

export default SignUp;
