import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Layout from "./layout";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const navigation = useNavigation();

  const handleEmail = (text) => {
    setLogin({ ...login, email: text });
  };

  const handlePassword = (text) => {
    setLogin({ ...login, password: text });
  };

  const handleLoginButton = () => {
    navigation.navigate("home");
  };
  const handleSignUpButton = () => {
    navigation.navigate("sign-up");
  };

  return (
    <View style={styles.container}>
      <Text>Please Login </Text>
      <TextInput
        style={styles.input}
        value={login.password}
        onChangeText={handleEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={login.password}
        onChangeText={handlePassword}
        maxLength={10}
        placeholder="password"
      />
      <TouchableHighlight style={styles.button} onPress={handleLoginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={handleSignUpButton}>
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
