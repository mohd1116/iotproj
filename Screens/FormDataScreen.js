import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const FormDataScreen = ({ route }) => {
    const { idCard } = route.params;
    const idCardFromLogin = idCard ;

    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        // Fetch all user data from the server
        fetchAllUserData();
    }, []);

    const fetchAllUserData = async () => {
        try {
            const serverUrl = 'http://192.168.1.65:3000/FormDataScreen';
            const response = await fetch(serverUrl);
            const userData = await response.json();
            setAllUserData(userData);
        } catch (error) {
            console.error('Error fetching all user data:', error);
        }
    };

    const renderItem = ({ item }) => {
            
        // Check if the ID card from login matches the ID card of the current item
        if (idCardFromLogin === item.idCard) {
            return (
                <View style={styles.item}>
                    <Text style={styles.header}>User Information</Text>
                    <Text style={styles.label}>ID Card: {item.idCard}</Text>
                    <Text style={styles.label}>Email: {item.email}</Text>
                    <Text style={styles.label}>Age: {item.age}</Text>
                    <Text style={styles.label}>Height: {item.height}</Text>
                    <Text style={styles.label}>Weight: {item.weight}</Text>
                    <Text style={styles.label}>Marital Status: {item.maritalStatus}</Text>
            
                    <Text style={styles.header}>Health Information</Text>
                    <Text style={styles.label}>Diseases: {item.diseases}</Text>
                    <Text style={styles.label}>Medical Conditions: {item.medicalConditions}</Text>
                    <Text style={styles.label}>Past Diseases: {item.pastDiseases}</Text>
                    <Text style={styles.label}>Hypertension/Diabetes: {item.hypertensionDiabetes}</Text>
                    <Text style={styles.label}>Allergies: {item.allergiesDetails}</Text>
                    <Text style={styles.label}>Epilepsy/Syncopal: {item.epilepsySyncopal}</Text>
                    <Text style={styles.label}>Chronic Conditions: {item.chronicConditions}</Text>
                    <Text style={styles.label}>Regular Medication: {item.regularMedication}</Text>
                    <Text style={styles.label}>Medication Side Effects: {item.medicationSideEffects}</Text>
                    <Text style={styles.label}>Drug Addiction: {item.drugAddiction}</Text>
                    <Text style={styles.label}>Surgical Operations: {item.surgicalOperations}</Text>
                    <Text style={styles.label}>Family Congenital Disease: {item.familyCongenitalDisease}</Text>
                    <Text style={styles.label}>Smoking/Alcohol: {item.smokingAlcohol}</Text>
                    <Text style={styles.label}>Family Heart Problems: {item.familyHeartProblems}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.item}>
                    <Text style={styles.label}>You don't have permission to view this user's data.</Text>
                </View>
            );
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>All User Data</Text>
            <FlatList
                data={allUserData}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCard}
            />
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
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    item: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        color: 'turquoise',
    },
});

export default FormDataScreen;



// code 1 >
  // Extract the data from the route
  // const {
  //   diseases,
  //   medicalConditions,
  //   pastDiseases,
  //   hypertensionDiabetes,
  //   allergiesDetails,
  //   epilepsySyncopal,
  //   chronicConditions,
  //   regularMedication,
  //   medicationSideEffects,
  //   drugAddiction,
  //   surgicalOperations,
  //   familyCongenitalDisease,
  //   smokingAlcohol,
  //   familyHeartProblems,
  // } = route.params;
  
  // code 2
  /* <Text style={styles.label}>Diseases: {diseases}</Text>
      <Text style={styles.label}>Medical Conditions: {medicalConditions}</Text>
      <Text style={styles.label}>Past Diseases: {pastDiseases}</Text>
      <Text style={styles.label}>Hypertension/Diabetes: {hypertensionDiabetes}</Text>
      <Text style={styles.label}>Allergies: {allergiesDetails}</Text>
      <Text style={styles.label}>Epilepsy/Syncopal: {epilepsySyncopal}</Text>
      <Text style={styles.label}>Chronic Conditions: {chronicConditions}</Text>
      <Text style={styles.label}>Regular Medication: {regularMedication}</Text>
      <Text style={styles.label}>Medication Side Effects: {medicationSideEffects}</Text>
      <Text style={styles.label}>Drug Addiction: {drugAddiction}</Text>
      <Text style={styles.label}>Surgical Operations: {surgicalOperations}</Text>
      <Text style={styles.label}>Family Congenital Disease: {familyCongenitalDisease}</Text>
      <Text style={styles.label}>Smoking/Alcohol: {smokingAlcohol}</Text>
      <Text style={styles.label}>Family Heart Problems: {familyHeartProblems}</Text> */

