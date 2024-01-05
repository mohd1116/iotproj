import React, { useState } from "react";
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
  const smokingAlcoholItems = [
    { label: "smoking", value: "smoking" },
    { label: "smoking and drinking", value: "smoking and drinking" },
    { label: "drinking", value: "drinking" },
    { label: "dont do both", value: "dont do both" },
  ];
  const handleChange = (name, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value,
    }));
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
    const serverUrl = "http://192.168.1.126:3000/questions"; 

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
        Alert.alert("Success", "Form submitted successfully");
        navigation.navigate("FormDataScreen"); 
      } else {
        Alert.alert("Error", response.data.error || "Form submission failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Customize based on your backend response
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
      <View style={styles.formContainer}>
        <Text style={styles.label}>Do you have any diseases?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., high blood pressure, diabetes"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("diseases", text)}
          value={responses.diseases}
        />

        <Text style={styles.label}>Do you have any medical conditions?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., sleep apnea, chronic kidney disease"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("medicalConditions", text)}
          value={responses.medicalConditions}
        />

        <Text style={styles.label}>
          Did you suffer from any diseases in the past?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., childhood asthma, past infections"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("pastDiseases", text)}
          value={responses.pastDiseases}
        />

        <Text style={styles.label}>What about hypertension and diabetes?</Text>
        <TextInput
          style={styles.input}
          placeholder="Specify if you have/had either"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("hypertensionDiabetes", text)}
          value={responses.hypertensionDiabetes}
        />

        <Text style={styles.label}>Do you have any allergies ?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., pollen, peanuts, penicillin"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("allergiesDetails", text)}
          value={responses.allergiesDetails}
        />

        <Text style={styles.label}>
          What about epilepsy or syncopal episodes?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Indicate any history of seizures or fainting"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("epilepsySyncopal", text)}
          value={responses.epilepsySyncopal}
        />

        <Text style={styles.label}>
          Do you have any chronic medical conditions ?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., chronic bronchitis, heart disease"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("chronicConditions", text)}
          value={responses.chronicConditions}
        />

        <Text style={styles.label}>
          Are you taking any medicine or drug regularly?
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="List any regular use (add ',' between each one)"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("regularMedication", text)}
          value={responses.regularMedication}
        />

        <Text style={styles.label}>
          Have you noticed any side effects from the medication you currently
          take?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., dizziness, stomach upset"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("medicationSideEffects", text)}
          value={responses.medicationSideEffects}
        />

        <Text style={styles.label}>Are you addicted to any drugs ?</Text>
        <TextInput
          style={styles.input}
          placeholder="(Don't worry it will save on your local storage only)"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("drugAddiction", text)}
          value={responses.drugAddiction}
        />

        <Text style={styles.label}>
          Have you undergone any surgical operations during your life ?
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="List any past surgeries"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("surgicalOperations", text)}
          value={responses.surgicalOperations}
        />

        <Text style={styles.label}>
          Do you have someone of your family who has a congenital disease ?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., family history of cystic fibrosis"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => handleChange("familyCongenitalDisease", text)}
          value={responses.familyCongenitalDisease}
        />

        <Text style={styles.label}>do you smoke and/or drinking alcohol?</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder={{ label: "Select your Status", value: null }}
          items={smokingAlcoholItems}
          onValueChange={(value) => handleChange("smokingAlcohol", value)}
          value={responses.smokingAlcohol}
          useNativeAndroidPickerStyle={false}
        />

        <Text style={styles.label}>
          Do you have someone of your family who has a congenital disease ?
        </Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          onValueChange={(value) => handleChange("familyHeartProblems", value)}
          value={responses.familyHeartProblems}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
