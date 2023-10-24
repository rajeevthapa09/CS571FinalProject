import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Layout";
import GlobalContext from "../../utils/context";
import { getProfile, updateProfiles } from "../../utils/network";

export default function Profile() {
  const { state, setState } = useContext(GlobalContext);
  const usrPwd = useRef(null);
  const [updateFile, setUpdateFile] = useState({
    name: state.userInfo.name,
    phone: state.userInfo.phone,
    email: state.userInfo.email,
    password: "",
    address: state.userInfo.address,
  });

  console.log("updatefile", updateFile);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      try {
        const savedUser = await AsyncStorage.getItem("userInfo");
        const currentUser = JSON.parse(savedUser);
        console.log("currentUser", currentUser);
        setUpdateFile({
          name: currentUser.name,
          phone: currentUser.phone,
          email: currentUser.email,
          password: "",
          address: currentUser.address,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  console.log(state);
  console.log(updateFile);

  const logoutBtn = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    alert("Successfully Logged Out");
    setState({ ...state, token: null, userInfo: {} });
  };

  const updatebtn = () => {
    (async () => {
      try {
        const res = await updateProfiles(state.token, updateFile);
        console.log(res, "res");

        if (res && res.success) {
          setState({
            ...state,
            profile: { ...updateFile },
            userInfo: { ...updateFile },
          });
          alert("Successfully Updated");
          try {
            await AsyncStorage.setItem(
              "userInfo",
              JSON.stringify({
                name: updateFile.name,
                phone: updateFile.phone,
                email: updateFile.email,
                address: updateFile.address,
              })
            );
          } catch (error) {
            console.log(error);
          }
          setUpdateFile({ ...updateFile, password: "" });
        }
      } catch (error) {
        // alert("error");
        console.log(error);
      }
    })();
  };

  return (
    <View style={[styles.container,{backgroundColor: "white"}]}>
      <Text
        style={{
          color: "black",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Update Profile
      </Text>
      <TextInput
        style={styles.input}
        value={updateFile.name}
        onChangeText={(text) => setUpdateFile({ ...updateFile, name: text })}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={updateFile.phone}
        onChangeText={(text) => setUpdateFile({ ...updateFile, phone: text })}
        maxLength={10}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        value={updateFile.email}
        onChangeText={(text) => setUpdateFile({ ...updateFile, email: text })}
        editable={false}
        maxLength={10}
        placeholder="email"
      />

      <TextInput
        style={styles.input}
        value={updateFile.password}
        ref={usrPwd}
        onChangeText={(text) =>
          setUpdateFile({ ...updateFile, password: text })
        }
        maxLength={10}
        placeholder="Change Password"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        value={updateFile.address}
        onChangeText={(text) => setUpdateFile({ ...updateFile, address: text })}
        multiline={true}
        numberOfLines={4}
        placeholder="address"
      />

      <TouchableHighlight style={styles.button} onPress={logoutBtn}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={updatebtn}>
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
