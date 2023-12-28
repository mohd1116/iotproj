// CommonHeader.js
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const CommonHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "rgb(32, 32, 36)", // Dark background color for the header
  },
  image: {
    width: 120, // Adjust width as needed
    height: 120, // Adjust height as needed
    resizeMode: "contain", // Adjust the resizeMode as needed
  },
});

export default CommonHeader;
