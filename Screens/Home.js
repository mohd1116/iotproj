import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("emergancyCall");
  };
  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to IOT Medical App</Text>
      <Text style={styles.description}>
        Access healthcare from the comfort of your home. Connect with doctors
        online for personalized consultations and medical advice.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(32, 32, 36)", // Deep dark background with a touch of purple
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "turquoise", // Purple text color
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  image: {
    width: "100%", // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: "contain", // or 'cover', depending on your needs
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "turquoise", // Purple button color
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
