// import React, { useState, useEffect } from "react";
// import { SafeAreaView, StatusBar, Text, View, Button, Image } from "react-native";

// import TextRecognition from 'react-native-text-recognition';
// import * as ImagePicker from 'expo-image-picker';

// const App = () => {

//   const [image, setImage] = useState(null);
//   const [text, setText] = useState(null);

//   // useEffect(() => {
//   //   ImagePicker.launchImageLibraryAsync({}, setImage)
//   // }, []);

//   const pickImage = async () => {

//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const txt = await TextRecognition.recognize(result.assets[0].uri);
//       setText(txt);
//     }
//   };

//   return (
//     <View>
//       <StatusBar />
//       <View>
//         <Text>Text Recognition</Text>
//         <Text>Hello there this is hard to see</Text>
//         <Button title="Image" onPress={pickImage} />
//         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         <Text>{text}</Text>
//       </View>
//     </View>
//   )
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { auth } from "./firebase";
import { useNavigation } from "@react-navigation/core"

import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // navigation.replace("Home")
        setLoggedIn(true)

      } else {
        setLoggedIn(false)
      }
    })
    return unsubscribe;
  }, [])

  return (
    <NavigationContainer>
      {!loggedIn ?
        (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>

        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}
              options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({

})