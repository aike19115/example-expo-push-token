import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as ExpoNotifications from "expo-notifications";
import appConfig from "./app.json";

async function getExpoPushToken(
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setExpoPushToken: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);
  setErrorMessage("");
  try {
    const response = await ExpoNotifications.getExpoPushTokenAsync({
      projectId: appConfig.expo.extra.eas.projectId,
    });
    setExpoPushToken(response.data);
  } catch (error) {
    setErrorMessage(String(error));
  }
  setIsLoading(false);
}

export default function App() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const onPressReload = React.useCallback(() => {
    setExpoPushToken("");
    getExpoPushToken(setErrorMessage, setExpoPushToken, setIsLoading);
  }, []);

  React.useEffect(() => {
    getExpoPushToken(setErrorMessage, setExpoPushToken, setIsLoading);
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : isLoading ? (
        <Text>loading...</Text>
      ) : (
        <Text>{expoPushToken || "empty..."}</Text>
      )}
      <Button disabled={isLoading} onPress={onPressReload} title="reload" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },
});
