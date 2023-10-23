import { Alert, Text, Pressable, TextInput, View } from "react-native"
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/myStyles';
import { addFood } from '../../utils/network';
import GlobalContext from "../../utils/context";

export default function AddFood() {

    //const {globalstate, setGlobalState}=useContext(GlobalContext);

    const navigation = useNavigation();
    const [state, setState] = useState(
        {
            name: "",
            origin: "",
            price: "",
            quantity:"",
            date: "",
            image: ""
        }, { date: '' })

    const route = useRoute();
    const { onRefresh } = route.params;

    const handleSave = async () => {
        try {
            // Validate input variables
            if (!state.name || typeof state.name !== 'string') {
                Alert.alert('Error', 'Name must be a non-empty string');
                return;
            }

            if (!state.price || isNaN(parseFloat(state.price))) {
                Alert.alert('Error', 'Price must be a valid number');
                return;
            }

            if (!state.quantity || isNaN(parseFloat(state.quantity))) {
                Alert.alert('Error', 'Price must be a valid number');
                return;
            }
            if (!state.origin || typeof state.origin !== 'string') {
                Alert.alert('Error', 'Origin must be a non-empty string');
                return;
            }

            const ret = await addFood(state);

            onRefresh(); // reload FoodList component            
            navigation.goBack();
        } catch (error) {
            // setGlobalState({...globalstate, errorMessage:'Unable to save data'})
        }
    }

    // Function to format the current date as "mm-dd-yyyy"
    const getCurrentDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      return `${mm}-${dd}-${yyyy}`;
    };
  
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Add New Food</Text>
            {/* <Text style={styles.errorMsg}>{globalstate.errorMessage} </Text> */}
            <TextInput
                style={styles.input}
                placeholder="name"
                value={state.name}
                onChangeText={(text) => setState({ ...state, name: text })}
            ></TextInput>

<TextInput
                style={styles.input}
                placeholder="origin"
                value={state.origin}
                onChangeText={(text) => setState({ ...state, origin: text })}
            ></TextInput>
            
            <TextInput
                style={styles.input}
                placeholder="price"
                value={state.price}
                keyboardType='numeric'
                onChangeText={(text) => setState({ ...state, price: text })}
            ></TextInput>
                      <TextInput
                style={styles.input}
                placeholder="quantity"
                value={state.quantity}
                keyboardType="numeric"
                onChangeText={(text) => setState({ ...state, quantity: text })}
            ></TextInput>
{/* 
            <TextInput
                style={styles.input}
                placeholder="mm-dd-yyyy"
                keyboardType="numeric"
                value={state.date}
                onChangeText={(text) => setState({ ...state, date: text })}
            > </TextInput> */}
            <TextInput
        style={styles.input}
        placeholder={getCurrentDate()} // Set the current date as the placeholder
        keyboardType="numeric"
        value={state.date}
        onChangeText={(text) => setState({ ...state, date: text })}
      ></TextInput>

            <TextInput
                style={styles.input}
                placeholder="image"
                value={state.image}
                onChangeText={(text) => setState({ ...state, image: text })}
            ></TextInput>
            <Pressable style={styles.submitButton} >
                <Text style={styles.submitButtonText} onPress={handleSave} >Save</Text>
            </Pressable>

        </View>
    )
}

// import React, { useState, useContext, useEffect } from 'react';
// import { Alert, Text, Pressable, TextInput, View, FlatList } from 'react-native';
// import styles from '../../styles/myStyles';
// import { addFood, getFoodList } from '../../utils/network'; // Assuming you have a getFoods function to fetch saved foods
// import GlobalContext from '../../utils/context';
// import { useNavigation } from '@react-navigation/native';

// export default function AddFood() {
//   const navigation = useNavigation();
//   const [state, setState] = useState({
//     name: '',
//     origin: '',
//     price: '',
//     quantity: '',
//     date: '',
//     image: '',
//   });

// //   const [datestate, setDatestate] = useState({ date: '' });

// // // Function to format the current date as "mm-dd-yyyy"
// // const getCurrentDate = () => {
// //   const today = new Date();
// //   const dd = String(today.getDate()).padStart(2, '0');
// //   const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
// //   const yyyy = today.getFullYear();
// //   return `${mm}-${dd}-${yyyy}`;
// // };

//   const [savedFoods, setSavedFoods] = useState([]); // State to hold the list of saved foods

//   //const navigation = useNavigation();
//   const { onRefresh } = navigation.params;
  

//   const handleSave = async () => {
//     try {
//       // Validate input variables (your existing validation code)

//       const ret = await addFood(state);
//       onRefresh();
//       setSavedFoods((prevFoods) => [...prevFoods, ret]); // Add the saved food to the list

//       navigation.goBack();
//     } catch (error) {
//       // Handle error
//     }
//   };

//   useEffect(() => {
//     // Fetch the list of saved foods when the component mounts
//     getFoodList()
//       .then((foods) => {
//         setSavedFoods(foods);
//       })
//       .catch((error) => {
//         // Handle error
//       });
//   }, []);

//   return (
//     <View style={styles.root}>
//       <Text style={styles.title}>Add New Food</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="name"
//         value={state.name}
//         onChangeText={(text) => setState({ ...state, name: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="origin"
//         value={state.origin}
//         onChangeText={(text) => setState({ ...state, origin: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="price"
//         value={state.price}
//         keyboardType="numeric"
//         onChangeText={(text) => setState({ ...state, price: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="quantity"
//         value={state.quantity}
//         keyboardType="numeric"
//         onChangeText={(text) => setState({ ...state, quantity: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder={getCurrentDate()}
//         keyboardType="numeric"
//         value={state.date}
//         onChangeText={(text) => setState({ ...state, date: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="image"
//         value={state.image}
//         onChangeText={(text) => setState({ ...state, image: text })}
//       />
//       <Pressable style={styles.submitButton}>
//         <Text style={styles.submitButtonText} onPress={handleSave}>
//           Save
//         </Text>
//       </Pressable>

//       {/* Display the list of saved foods */}
//       <FlatList
//         data={savedFoods}
//         keyExtractor={(item) => item.id.toString()} // Assuming each food item has an 'id' property
//         renderItem={({ item }) => (
//           <Text>
//             Name: {item.name}, Origin: {item.origin}, Price: {item.price}
//           </Text>
//         )}
//       />
//     </View>
//   );
// }

