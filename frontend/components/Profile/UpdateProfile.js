import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import GlobalContext from "../../utils/context";
import { updateProfiles } from "../../utils/network";

export default function UpdateProfile({ route }) {
  const [name, setName] = useState(route.params.updateFile.name);
  const [phone, setPhone] = useState(route.params.updateFile.phone);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(route.params.updateFile.address);
  const { state, setState } = useContext(GlobalContext);
  const updateData = {
    name: name,
    phone: phone,
    password: password,
    address: address,
  };

  const navigation = useNavigation();

  const updatebtn = async () => {
    try {
      const res = await updateProfiles(state.token, updateData);
      console.log(res);
      if (res && res.success) {
        const updatted = res.data;
        setState({ ...state, profile: updatted });
        navigation.goBack();
      } else {
        alert("failed to update");
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Update your profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        maxLength={10}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        maxLength={10}
        placeholder="password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
        maxLength={10}
        placeholder="address"
      />

      <TouchableHighlight style={styles.button} onPress={updatebtn}>
        <Text style={styles.buttonText}>Update</Text>
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
