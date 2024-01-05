import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const QuestionForm = ({ questions, responses, handleChange, handleSubmit }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{item.question}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(item.id, text)}
        value={responses[item.id]}
        placeholder="Type your answer here"
      />
    </View>
  );

  return (
    <View style={styles.formContainer}>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
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
    borderRadius: 9,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "white", // Set the text color to white
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuestionForm;
