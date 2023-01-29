import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { auth, db } from "../firebase";
import firebase from 'firebase/compat/app';

const ListScreen = () => {

        const [names, setNames] = useState([]);
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');


        const addStudent = () => {
                // const increment = firebase.firestore.FieldValue.increment(parseFloat(quantity));
                if (name != '') {
                        db.collection("students").doc(name).set({
                                student: name,
                                email: email
                        }, { merge: true }).then(() => {
                                console.log("Student added:", name);
                                setName('');
                                setEmail('');
                        });

                } else {
                        alert("Please enter valid inputs")
                }
        }

        const deleteStudent = () => {
                // const decrement = firebase.firestore.FieldValue.increment(-parseFloat(quantity));
                if (name != '') {
                        db.collection("students").doc(name).delete({
                                student: name
                        }, { merge: true }).then(() => {
                                console.log("Student deleted:", name);
                                setName('');
                                setEmail('');
                        })
                } else {
                        alert("Please enter valid inputs")
                }

        }

        useEffect(() => {
                // console.log(names);
                getStudents();
        }, []);

        let getStudents = async () => {
                const students = db.collection("students");
                students.onSnapshot((querySnapshot) => {
                        const saveStudents = [];
                        querySnapshot.forEach((doc) => {
                                saveStudents.push(doc.data());
                        })
                        setNames(saveStudents);
                });
        }

        return (
                <View style={styles.container}>
                        <ScrollView style={styles.student}>
                                {names.map((name) => (
                                        <TouchableOpacity key={name.student} style={styles.item}>
                                                <Text style={styles.itemText}>{name.student}</Text>
                                                <Text style={styles.email}>{name.email}</Text>
                                        </TouchableOpacity>
                                ))}
                        </ScrollView>
                        <View
                                style={styles.inputContainer}>
                                <TextInput
                                        placeholder="Student"
                                        value={name}
                                        onChangeText={text => setName(text)}
                                        style={styles.input}
                                />
                                <TextInput
                                        placeholder="Email"
                                        value={email}
                                        onChangeText={num => setEmail(num.toLowerCase())}
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

export default ListScreen;

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        inputContainer: {
                width: '60%',
                marginBottom: 5
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
                marginTop: 5,
        },
        buttonText: {
                color: "white",
                fontWeight: '700',
                fontSize: 16
        },
        item: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 30,
                margin: 2,
                borderRadius: 5,
                backgroundColor: '#0782F9',
                flexDirection: 'row',
        },
        itemText: {
                color: "white",
                fontWeight: '700',
                fontSize: 16
        },
        add: {
                color: "white",
                fontWeight: '700',
                fontSize: 16
        },
        student: {
                width: "100%"
        },
        email: {
                color: "white",
                fontWeight: '700',
                fontSize: 12,
        },

})
