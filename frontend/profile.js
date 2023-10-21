import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Profile() {
  const [signup, setSignup] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const navigation = useNavigation();

  const handleEmail = (text) => {
    setSignup({ ...login, email: text });
  };

  const handlePassword = (text) => {
    setSignup({ ...login, password: text });
  };

  const handleLoginButton = () => {
    navigation.navigate("home");
  };

  return (
    <View style={styles.container}>
      <Text>update </Text>
      <TextInput
        style={styles.input}
        value={signup.name}
        onChangeText={handleEmail}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={signup.phone}
        onChangeText={handlePassword}
        maxLength={10}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        value={signup.email}
        onChangeText={handlePassword}
        maxLength={10}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        value={signup.password}
        onChangeText={handlePassword}
        maxLength={10}
        placeholder="password"
      />
      <TextInput
        style={styles.input}
        value={signup.address}
        onChangeText={handlePassword}
        maxLength={10}
        placeholder="address"
      />

      <TouchableHighlight style={styles.button} onPress={handleLoginButton}>
        <Text style={styles.buttonText}>update</Text>
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
