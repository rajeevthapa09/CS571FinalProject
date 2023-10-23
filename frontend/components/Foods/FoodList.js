// import { getFoodList } from "../../utils/network";
// import { useEffect, useState } from 'react';
// import { SafeAreaView, FlatList, Pressable, Text, View, TextInput } from 'react-native';
// import styles from '../../styles/myStyles';
// import Food from './Food';
// import { useNavigation } from '@react-navigation/native';

// export default function FoodList() {
//     const [searchText, setSearchText] = useState('');
//     const [foods, setFood] = useState([]);
//     const [refresh, setRefresh] = useState(false); //handle Food list refresh by this state change
//     const navigation = useNavigation();

//     const onRefresh = () => {
//         setRefresh(!refresh)
//     }
// const userEmail= "rahel@gggg";
//     useEffect(() => {
//         try {
//             async function getData() {
//                 const ret = await getFoodList(userEmail);
//                 if (ret && ret.success) {
//                     setFood(ret.data);
//                 }
//             }
//             getData()

//         } catch (error) {

//         }
//     }, [])

//     const handleAddFood = () => {
//         navigation.navigate('addfood', { onRefresh })
//     }

//     const filteredData = [...foods].filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
//     let myfoodlist = []

//     if (searchText !== "") {
//         myfoodlist = filteredData;
//     } else {
//         myfoodlist = foods;
//     }

//     return (
//         <SafeAreaView
//             style={styles.root}>
//             <View style={{ flex: 0.2 }}>
//                 <Text style={styles.title}>Menu</Text>
//             </View >
//             <View style={{ flex: 0.8 }}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Live Search'
//                     onChangeText={(text) => setSearchText(text)}
//                     value={searchText}>
//                 </TextInput>
//                 <Pressable style={styles.submitButton} >
//                     <Text style={styles.submitButtonText} onPress={handleAddFood} >Add Food</Text>
//                 </Pressable>
//                 <FlatList
//                     data={myfoodlist}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item, index }) => (<Food food={{ ...item, index }} onRefresh={onRefresh} />
//                     )}
//                 />
//             </View>
//         </SafeAreaView>

//     )
// }


import { getFoodList } from "../../utils/network";
import { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import styles from "../../styles/myStyles";
import Food from "./Food";
import GlobalContext from "../../utils/context";
import { useNavigation } from "@react-navigation/native";

export default function FoodList() {
  const { state, setState } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function getData() {
      try {
        const ret = await getFoodList(state.userInfo.email, state.token);
        if (ret && ret.success) {
          setState({ ...state, foods: ret.data });
        }
      } catch (error) {
        setState({ ...state, foods: [] });
      }
    }
    getData();
  }, []);

  const handleAddFood = () => {
    navigation.navigate("addfood", { onRefresh });
  };

  // const filteredData = [...state.foods].filter((item) =>
  //   item.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  // let myfoodlist = [];

  // if (searchText !== "") {
  //   myfoodlist = filteredData;
  // } else {
  //   myfoodlist = state.foods;
  // }

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ flex: 0.2 }}>
        <Text style={styles.title}>Menu</Text>
      </View>
      <View style={{ flex: 0.8 }}>
        <TextInput
          style={styles.input}
          placeholder="Live Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText} onPress={handleAddFood}>
            Add Food
          </Text>
        </Pressable>
        <FlatList
          data={state.foods}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <Food food={{ ...item, index }} onRefresh={onRefresh} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
