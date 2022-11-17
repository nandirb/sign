import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Alert, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Button from "../components/Button";
import { uploadReq } from "../api";
import LottieView from "lottie-react-native";

export default function UploadScreen({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [loading, onLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    if (hasCameraPermission) {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      if (newPhoto) {
        onLoading(true);
        const image = result?.assets[0];
        const res = await uploadReq(image);
        onLoading(false);
        navigation.navigate("Result", {
          isCamera: false,
          uri: `data:image/jpg;base64${newPhoto.base64}`,
          res,
        });
      }
    } else {
      Alert.alert("You should enable camera permission");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      onLoading(true);
      const image = result?.assets[0];
      const res = await uploadReq(image);
      onLoading(false);

      navigation.navigate("Result", {
        isCamera: false,
        uri: result.uri,
        res,
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Button title="Upload photo" onPress={pickImage} />
      <Button title="Take photo" onPress={takePic} isFill={true} />
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={
          loading
            ? require("../assets/loading.json")
            : require("../assets/traffic.json")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column-reverse",
    paddingBottom: 200,
  },
  modalBg: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
});
