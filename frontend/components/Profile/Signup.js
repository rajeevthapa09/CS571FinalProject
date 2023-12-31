import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { mysignup } from "../../utils/network";
import GlobalContext from "../../utils/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignUp() {
  const [signup, setSignup] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const { state, setState } = useContext(GlobalContext);
  const navigation = useNavigation();
  const handlegoback = () => {
    navigation.navigate("login");
  };

  const handleTextInputChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    if (numericValue !== text) {
      window.alert("Only numbers are allowed");
    }
    setSignup({ ...signup, phone: numericValue });
  };

  const handlesignup = async () => {
    try {
      const res = await mysignup(
        signup.name,
        signup.phone,
        signup.email,
        signup.password,
        signup.address
      );

      if (res && res.success) {
        setState({
          ...state,
          profile: {
            name: signup.name,
            phone: signup.phone,
            email: signup.email,

            address: signup.address,
          },
        });
        await AsyncStorage.setItem(
          "userProfile",
          JSON.stringify({
            ...state,
            profile: {
              name: signup.name,
              phone: signup.phone,
              email: signup.email,

              address: signup.address,
            },
          })
        );

        navigation.navigate("login");
        alert("added succesfully");
      } else {
        alert("Email already exists");
      }
    } catch (error) {
      alert(" SOMETHING IS WRONG");
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: "white"}]}>
      <Text style={styles.headerText}>Please signup </Text>
      <TextInput
        style={styles.input}
        value={signup.name}
        onChangeText={(text) => setSignup({ ...signup, name: text })}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={signup.phone}
        onChangeText={handleTextInputChange}
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
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={signup.address}
        onChangeText={(text) => setSignup({ ...signup, address: text })}
        multiline={true}
        numberOfLines={4}
        placeholder="address"
      />

      <TouchableHighlight style={styles.button} onPress={handlesignup}>
        <Text style={styles.buttonText}>signup</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={handlegoback}>
        <Text style={styles.buttonText}>goBack To SignOn</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  headerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
