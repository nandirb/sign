import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

export default function ResultScreen({ navigation, route }) {
  const { uri, res } = route?.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.imageWrapper} />
      <Text style={styles.description}>
        {res?.length > 0 ? res : "Try again "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  imageWrapper: {
    borderRadius: 10,
    width: Dimensions.get("screen").width - 100,
    height: Dimensions.get("screen").width - 100,
    backgroundColor: "#eee",
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  description: {
    marginTop: 50,
    fontSize: 16,
  },
});
