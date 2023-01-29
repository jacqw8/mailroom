import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { auth, db } from "../firebase";
import firebase from 'firebase/compat/app';

const AddScreen = () => {

        const [name, setName] = useState('');


        const addStudent = () => {
                // const increment = firebase.firestore.FieldValue.increment(parseFloat(quantity));
                if (name != '') {
                        db.collection("students").doc(name).set({
                                student: name
                        }, { merge: true }).then(() => {
                                console.log("Student added:", name);
                                setName('');
                        });

                } else {
                        alert("Please enter valid inputs")
                }
        }

        const deleteStudent = () => {
                // const decrement = firebase.firestore.FieldValue.increment(-parseFloat(quantity));
                if (food != '') {
                        db.collection("students").doc(name).set({
                                student: name
                        }, { merge: true }).then(() => {
                                console.log("Student deleted:", name);
                                setName('');
                        })
                } else {
                        alert("Please enter valid inputs")
                }

        }

        return (
                <View style={styles.container}>
                        <View
                                style={styles.inputContainer}>
                                <TextInput
                                        placeholder="Student"
                                        value={name}
                                        onChangeText={text => setName(text)}
                                        style={styles.input}
                                />
                        </View>
                        <TouchableOpacity
                                style={styles.button}
                                onPress={addStudent}>
                                <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                                style={styles.button}
                                onPress={deleteStudent}>
                                <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>

                </View>
        )

}

export default AddScreen;

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        inputContainer: {
                width: '60%',
                marginBottom: 20
        },
        input: {
                backgroundColor: 'white',
                padddingHorizontal: 15,
                paddingVertical: 13,
                borderRadius: 10,
                marginTop: 5
        },
        button: {
                backgroundColor: '#0782F9',
                width: "60%",
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 5
        },
        buttonText: {
                color: "white",
                fontWeight: '700',
                fontSize: 16
        },

})