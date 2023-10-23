import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Layout";
import GlobalContext from "../../utils/context";
import { getProfile, updateProfiles } from "../../utils/network";

export default function Profile() {
  const { state, setState } = useContext(GlobalContext);
  const [updateFile, setUpdateFile] = useState({
    name: state.userInfo.name,
    phone: state.userInfo.phone,
    email: state.userInfo.email,
    password: "",
    address: state.userInfo.address,
  });

  console.log("updatefile", updateFile);
  const navigation = useNavigation();

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await getProfile(state.token);
  //       if (res && res.success) {
  //         setState({ ...state, profile: res.data });
  //         setUpdateFile(res.data);
  //       }
  //     } catch (error) {
  //       alert("error");
  //     }
  //   }
  //   getData();
  // }, [updateFile]);
  console.log(state);
  console.log(updateFile);

  const logoutBtn = async () => {
    await AsyncStorage.removeItem("token");
    alert("success");
    setState({ ...state, token: null });
  };

  const updatebtn = () => {
    // navigation.navigate("update", { updateFile });
    (async () => {
      try {
        const res = await updateProfiles(state.token, updateFile);
        // console.log(updateData);
        console.log(res, "res");
  
        if (res && res.success) {
          console.log("i am in")
          // const updatted = res.data;
          // if (updateData.password !== "") {
          //   updatted.password = updateData.password;
          // }
          const updatted = res.data;
          if (updateFile.password !== "") {
            updatted.password = updateFile.password;
          }
          setState({ ...state, profile: updatted, userInfo:{...updateFile} });
        //   if (updateData.password > 0) {
        //     navigation.goBack();
        //   }
        // } else {
        //   alert("enter password");
        }
      } catch (error) {
        // alert("error");
        console.log(error);
      }
    })()
  };

  return (
    <View style={styles.container}>
      <Text>update </Text>
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
        editable = {false}
        maxLength={10}
        placeholder="email"
      />

      <TextInput
        style={styles.input}
        value={updateFile.password}
        onChangeText={(text) =>
          setUpdateFile({ ...updateFile, password: text })
        }
        maxLength={10}
        placeholder="Change Password"
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
