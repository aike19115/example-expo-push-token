import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ExpoNotifications from "expo-notifications";
import appConfig from "./app.json";

export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    ExpoNotifications.getExpoPushTokenAsync({
      projectId: appConfig.expo.extra.eas.projectId,
    })
      .then((response) => setExpoPushToken(response.data))
      .catch((error) => setErrorMessage(String(error)));
  }, []);

  if (errorMessage) {
    return <Text style={styles.errorText}>{errorMessage}</Text>;
  }

  const text = expoPushToken || "Loading ...";

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    margin: "auto",
  },
});
