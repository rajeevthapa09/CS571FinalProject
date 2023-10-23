import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Layout from "./Layout";
import GlobalContext from "../../utils/context";
import { myLogin } from "../../utils/network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/myStyles";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { state, setState } = useContext(GlobalContext);

  const navigation = useNavigation();

  const handleLoginButton = async () => {
    try {
      const ret = await myLogin(login.email, login.password);
      if (ret && ret.success) {
        setState({ ...state, token: ret.data.token, userInfo: { name: ret.data.name, phone: ret.data.phone, email: ret.data.email, address: ret.data.address } });
        console.log("userinfo", state, "ret", ret);
        try {
          await AsyncStorage.setItem("token", ret.data.token);
        } catch (error) {
          console.log(error);
        }
        try {
          await AsyncStorage.setItem("userInfo", JSON.stringify({ name: ret.data.name, phone: ret.data.phone, email: ret.data.email, address: ret.data.address }));
        } catch (error) {
          console.log(error);
        }

      } else {
        alert("Incorrect Username or Password");
      }
    } catch (error) {
      alert("error");
    }
  };
  const handleSignUpButton = () => {
    navigation.navigate("sign-up");
  };

  return (
    <View style={styles.container}>
      <Text>Please Login </Text>
      <TextInput
        style={styles.input}
        value={login.email}
        onChangeText={(text) => setLogin({ ...login, email: text })}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={login.password}
        onChangeText={(text) => setLogin({ ...login, password: text })}
        maxLength={10}
        placeholder="password"
        secureTextEntry={true}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableHighlight style={[styles.submitButton, { width: 75, marginHorizontal: 3 }]} onPress={handleLoginButton}>
          <Text style={[styles.submitButtonText, { fontSize: 14 }]}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.submitButton, { width: 85, marginHorizontal: 3 }]} onPress={handleSignUpButton}>
          <Text style={[styles.submitButtonText, { fontSize: 14 }]}>SignUp</Text>
        </TouchableHighlight>
      </View>

    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "gray",
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     borderRadius: 8,
//     padding: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
