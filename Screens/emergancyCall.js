import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Linking,
  StyleSheet,
  Text,
} from "react-native";
import * as Location from "expo-location";

export default function AddressPage() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const response = await Location.reverseGeocodeAsync(location.coords);
      setAddress(`${response[0].city}, ${response[0].country}`); // Displaying city and country
    })();
  }, []);

  const handleCall = () => {
    const phoneNumber = "+905526300460"; // Replace with the actual phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Location:{" "}
        {location
          ? `${location.coords.latitude}, ${location.coords.longitude}`
          : "Fetching..."}
      </Text>
      <Text style={styles.title}>Your Address: {address}</Text>
      <Button title="Call" onPress={handleCall} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgb(32, 32, 36)",
  },
  title: {
    fontSize: 20,
    color: "turquoise",
    marginBottom: 30,
    textAlign: "center",
  },
});
