import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useUser } from "./Components/UserContext";
import QuestionForm from "./Components/QuestionForm";
const QuestionScreen = ({ navigation }) => {
  const { idCard } = useUser();
  const [responses, setResponses] = useState({
    diseases: "",
    medicalConditions: "",
    pastDiseases: "",
    hypertensionDiabetes: "",
    allergiesDetails: "",
    epilepsySyncopal: "",
    chronicConditions: "",
    regularMedication: "",
    medicationSideEffects: "",
    drugAddiction: "",
    surgicalOperations: "",
    familyCongenitalDisease: "",
    smokingAlcohol: "",
    familyHeartProblems: "",
  });
  const questions = [
    { id: "diseases", question: "Do you have any diseases?" },
    {
      id: "medicalConditions",
      question: "Do you have any medical conditions?",
    },
    {
      id: "pastDiseases",
      question: "Did you suffer from any diseases in the past?",
    },
    {
      id: "hypertensionDiabetes",
      question: "What about hypertension and diabetes?",
    },
    { id: "allergiesDetails", question: "Do you have any allergies?" },
    {
      id: "epilepsySyncopal",
      question: "What about epilepsy or syncopal episodes?",
    },
    {
      id: "chronicConditions",
      question: "Do you have any chronic medical conditions?",
    },
    {
      id: "regularMedication",
      question: "Are you taking any medicine or drug regularly?",
    },
    {
      id: "medicationSideEffects",
      question:
        "Have you noticed any side effects from the medication you currently take?",
    },
    { id: "drugAddiction", question: "Are you addicted to any drugs?" },
    {
      id: "surgicalOperations",
      question: "Have you undergone any surgical operations during your life?",
    },
    {
      id: "familyCongenitalDisease",
      question:
        "Do you have someone in your family who has a congenital disease?",
    },
    { id: "smokingAlcohol", question: "Do you smoke and/or drink alcohol?" },
    {
      id: "familyHeartProblems",
      question: "Do you have someone in your family who has heart problems?",
    },
  ];

  const handleChange = (id, value) => {
    console.log(`Updating field ${id} with value: ${value}`);
    setResponses({ ...responses, [id]: value });
    console.log("Current responses:", responses);
  };

  const handleSubmit = async () => {
    const {
      diseases,
      medicalConditions,
      pastDiseases,
      hypertensionDiabetes,
      allergiesDetails,
      epilepsySyncopal,
      chronicConditions,
      regularMedication,
      medicationSideEffects,
      drugAddiction,
      surgicalOperations,
      familyCongenitalDisease,
      smokingAlcohol,
      familyHeartProblems,
    } = responses;

    // Check if all required fields are filled
    // Assuming all fields are required for this example
    const allFieldsFilled = Object.values(responses).every(
      (value) => value.trim() !== ""
    );
    if (!allFieldsFilled || !smokingAlcohol) {
      Alert.alert("Missing Information", "Please fill in all fields");
      return;
    }
    const serverUrl = "http://192.168.1.156:3000/questions"; // Replace with your server URL

    try {
      const response = await axios.post(serverUrl, {
        idCard,
        diseases,
        medicalConditions,
        pastDiseases,
        hypertensionDiabetes,
        allergiesDetails,
        epilepsySyncopal,
        chronicConditions,
        regularMedication,
        medicationSideEffects,
        drugAddiction,
        surgicalOperations,
        familyCongenitalDisease,
        smokingAlcohol,
        familyHeartProblems,
      });

      if (response.data.success) {
        Alert.alert("Form Submitted", "Now you can call your doctor :)");
        navigation.navigate("FormDataScreen"); //this should navigate to your last page AHMED
      } else {
        Alert.alert("Error", response.data.error || "Form submission failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Customize based on your backend response
          console.log("Form responses:", error.response);

          Alert.alert("Submission Error", "Error: " + error.response.status);
        } else {
          Alert.alert("Network Error", "Network error or server is down");
        }
      } else {
        console.error("Error handling form submission:", error); // MOHAMMED EXPLAIN is occured
        Alert.alert("Error", "An error occurred during form submission.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <QuestionForm
        questions={questions}
        responses={responses}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
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
    fontSize: 20,
    color: "turquoise",
    alignSelf: "flex-start", // Align the labels to the start
    marginBottom: 10,
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
    color: "white", // Set the text color to white
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
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
});

export default QuestionScreen;
