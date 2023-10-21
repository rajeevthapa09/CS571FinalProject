import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
export default function SignUp() {
  const [signup, setSignup] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const navigation = useNavigation();

  const handlesignup = async () => {
    try {
      const res = await signup(signup);
      console.log(res);
      if (res && res.success) {
        navigation.navigate("login");
        alert("added succesfully");
      } else {
        alert("cannot add");
      }
    } catch (error) {
      alert(" SOMETHING IS WRONG");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Please signup </Text>
      <TextInput
        style={styles.input}
        value={signup.name}
        onChangeText={(text) => setSignup({ ...signup, name: text })}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={signup.phone}
        onChangeText={(text) => setSignup({ ...signup, phone: text })}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        value={signup.email}
        onChangeText={(text) => setSignup({ ...signup, email: text })}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        value={signup.password}
        onChangeText={(text) => setSignup({ ...signup, password: text })}
        placeholder="password"
      />
      <TextInput
        style={styles.input}
        value={signup.address}
        onChangeText={(text) => setSignup({ ...signup, address: text })}
        maxLength={10}
        placeholder="address"
      />

      <TouchableHighlight style={styles.button} onPress={handlesignup}>
        <Text style={styles.buttonText}>signup</Text>
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
