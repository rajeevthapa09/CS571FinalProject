import { getFoodList } from "../../utils/network";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Pressable,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Menu</Text>
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Live Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <Pressable style={styles.addButton} onPress={handleAddFood}>
          <Text style={styles.addButtonText}>Add Food</Text>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 0.8,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#5398DC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});
