import { getFoodList } from "../../utils/network";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import styles from "../../styles/myStyles";
import Food from "./Food";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../../utils/context";

export default function FoodList() {
  const [searchText, setSearchText] = useState("");
  const { state, setState } = useContext(GlobalContext);
  const [foods, setFood] = useState([]);

  const navigation = useNavigation();

  async function getData() {
    const ret = await getFoodList(state.token);
    if (ret && ret.success) {
      setFood(ret.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleAddFood = () => {
    navigation.navigate("addfood", getData);
  };

  const filteredData = foods.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
        ></TextInput>
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText} onPress={handleAddFood}>
            Add Food
          </Text>
        </Pressable>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <Food food={item} onRefresh={getData} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
}
