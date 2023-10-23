// import React, { useState } from 'react';
// import { Alert, View, Text, TouchableHighlight } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import styles from '../../styles/myStyles';
// import { deleteFood } from "../../utils/network";

// const Food = ({ food, onRefresh }) => {
//     const { index, _id, name, origin, price, quantity, date, image} = food;

//     const navigation = useNavigation();

//     const handleDetail = () => {
//         navigation.navigate('fooddetails', { food })
//     };

//     const handleEdit = () => {
//         navigation.navigate('editfood', { food, onRefresh })
//     }

//     const handleDelete = async () => {
  

//         await deleteFood(_id);
//         onRefresh()

//     }

//     return (
//         <View
//             style={{ backgroundColor: index % 2 === 0 ? 'green' : '#008000' }}>
//             <View style={styles.row}>

//                 <View style={styles.name}>
//                     <Text>Name: {name}</Text>
//                     <Text>Origin: {origin}</Text>
//                     <Text>Price: {price}</Text>
//                     <Text>Quantity: {quantity}</Text>
//                     <Text>Date: {date}</Text>
//                     <Text>Image: {image}</Text>

//                 </View>

//                 <View style={styles.edges}>
//                     <TouchableHighlight
//                         onPress={handleDetail}
//                         style={styles.button}
//                         underlayColor="#5398DC">
//                         <Text style={styles.buttonText}>Details</Text>
//                     </TouchableHighlight>
//                     <TouchableHighlight
//                         onPress={handleEdit}
//                         style={styles.button}
//                         underlayColor="#5398DC">
//                         <Text style={styles.buttonText}>Edit</Text>
//                     </TouchableHighlight><TouchableHighlight
//                         onPress={handleDelete}
//                         style={styles.button}
//                         underlayColor="#5398DC">
//                         <Text style={styles.buttonText}>Delete</Text>
//                     </TouchableHighlight>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default Food;


import { View, Text, StyleSheet, TouchableHighlight, FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { getFoodList } from "../../utils/network";
import { useEffect, useState } from "react";

export default function Food() {

    const [foods, setFoods] = useState([]);

    const navigation = useNavigation();
    const addFood = () => {
        navigation.navigate('addFoods', setFoods);
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getFoodList("rahel@gggg");
                setFoods((prev) => res.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <View>
            <TouchableHighlight style={styles.button} onPress={addFood}>
                <Text style={styles.buttonText}>Add Food</Text>
            </TouchableHighlight>
            <View style={styles.foods}>
                <View style={{ flex: 1.5 }}><Text>Food</Text></View>
                <View style={{ flex: 1.25 }}><Text>Dates</Text></View>
                <View style={{ flex: 1 }}><Text></Text></View>
            </View>
            <FlatList
                data={foods}
                renderItem={({ item, index }) => (<View style={styles.foods}>
                    <View style={{ flex: 1.5 }}><Text>{item.name}</Text></View>
                    <View style={{ flex: 1.25 }}><Text>{item.date}</Text></View>
                    <View style={{ flex: 1 }}>{<Display food={item} setFoods={setFoods} />}</View>
                </View>)}
                keyExtractor={item => item._id.toString()}
                scrollIndicatorInsets={{ right: 3 }}
            />

        </View>
    )
}

function Display({ food, setFoods }) {
    const navigation = useNavigation();
    const viewPressed = () => {
        navigation.navigate('notesDetails', food);
    }

    const editPressed = () => {
        navigation.navigate('editNotes', { food, setFoods });
    }
    return (
        <View style={{ flexDirection: "column" }}>
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={viewPressed}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={editPressed}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notes: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066cc',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
        marginTop: 10,
        width: 90,
        marginLeft: "75%"
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 12,
        textAlign: 'center',
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 50,
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 12,
        textAlign: 'center',
    },
})