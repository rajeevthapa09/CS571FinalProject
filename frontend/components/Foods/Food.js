import React, { useContext, useState } from "react";
import {
    Alert,
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { deleteFood } from "../../utils/network";
import GlobalContext from "../../utils/context";

const Food = ({ food, onRefresh }) => {
    const { _id, name, origin, price, date, image } = food;
    const { state, setState } = useContext(GlobalContext);

    const navigation = useNavigation();

    const handleEdit = () => {
        navigation.navigate("editfood", { food, onRefresh });
    };

    const handleDelete = async () => {
        await deleteFood(state.userInfo.email, _id.toString(), state.token);
        onRefresh();
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", width: 115 }}>
                        <View style={[styles.infoRow, {marginBottom: 10}]}>
                            <Text style={[styles.label, {marginRight: 5}]}>Name:</Text>
                            <Text style={styles.text}>{name}</Text>
                        </View>
                        <View style={[styles.infoRow, {marginBottom: 10}]}>
                        <Text style={[styles.label, {marginRight: 5}]}>Origin:</Text>
                            <Text style={styles.text}>{origin}</Text>
                        </View>
                        <View style={[styles.infoRow, {marginBottom: 10}]}>
                        <Text style={[styles.label, {marginRight: 5}]}>Price:</Text>
                            <Text style={styles.text}>{price}</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: 35}}>
                        <Image
                            source={{ uri: `${image}` }}
                            style={{ width: 120, height: 90 }}
                        />
                    </View>

                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.text}>{date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Image:</Text>
                    <Text style={styles.text}>{image}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    onPress={handleEdit}
                    style={styles.button}
                    underlayColor="#5398DC"
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={handleDelete}
                    style={styles.button}
                    underlayColor="#FF5733"
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    info: {
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        flex: 3,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#5398DC",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
    },
});

export default Food;
