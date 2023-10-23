
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Food({ food, onRefresh }) {
  const navigation = useNavigation();

  const viewPressed = () => {
    navigation.navigate("fooddetails", { food });
  };

  const editPressed = () => {
    navigation.navigate("editfood", { food, onRefresh });
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.edges}>
        <TouchableHighlight
          onPress={viewPressed}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.edges}>
        <TouchableHighlight
          onPress={editPressed}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notes: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    marginTop: 10,
    width: 90,
    marginLeft: "75%",
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
});
