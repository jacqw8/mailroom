import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'react-native';
import { auth, db } from "../firebase";
import qs from 'qs';

const EmailScreen = () => {

        const [isAvailable, setIsAvailable] = useState(false);
        const [email, setEmail] = useState("");
        const [names, setNames] = useState([]);

        // useEffect(() => {
        //         async function checkAvailability() {
        //                 const isMailAvailable = await MailComposer.isAvailableAsync();
        //                 setIsAvailable(isMailAvailable);
        //         }

        //         checkAvailability();
        // }, []);

        // const sendMail = () => {
        //         MailComposer.composeAsync({
        //                 subject: "YOU HAVE MAIL",
        //                 body: "Your mail has arrived in the mailroom.",
        //                 recipients: recipients
        //         })
        // }

        useEffect(() => {
                // console.log(names);
                getStudents();
                console.log(email);
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

        async function sendEmail(to, subject, body, options = {}) {
                const { cc, bcc } = options;

                let url = `mailto:${to}`;

                // Create email link query
                const query = qs.stringify({
                        subject: "YOU HAVE MAIL",
                        body: "Your mail has arrived in the mailroom.",
                        cc: cc,
                        bcc: bcc
                });

                if (query.length) {
                        url += `?${query}`;
                }

                // check if we can use this link
                const canOpen = await Linking.canOpenURL(url);

                if (!canOpen) {
                        throw new Error('Provided URL can not be handled');
                }

                return Linking.openURL(url);
        }

        return (

                <View
                        style={styles.container}
                >
                        <Text>YOU HAVE MAIL</Text>
                        <Text>Your mail has arrived in the mailroom.</Text>
                        <ScrollView style={styles.student}>
                                {names.map((name) => (
                                        <TouchableOpacity key={name.student} style={!(name.email == email) ? styles.item : styles.pressed}
                                                onPress={() => setEmail(name.email)}>
                                                <Text style={!(name.email == email) ? styles.itemText : styles.pressedText}>{name.student}</Text>
                                                <Text style={!(name.email == email) ? styles.email : styles.pressedEmail}>{name.email}</Text>
                                        </TouchableOpacity>
                                ))}
                        </ScrollView>
                        {/* <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" /> */}
                        <TouchableOpacity title="Send" onPress={() => {
                                sendEmail(email,
                                        "YOU HAVE MAIL", "YOUR MAIL HAS ARRIVED."

                                ).then(() => {
                                        console.log("Successful!");
                                })
                        }} style={styles.button}><Text style={styles.buttonText}>Send</Text></TouchableOpacity>
                </View >

        )
}

export default EmailScreen

const styles = StyleSheet.create({
        container: {
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
        },
        inputContainer: {
                width: '80%',
        },
        input: {
                backgroundColor: 'white',
                padddingHorizontal: 15,
                paddingVertical: 13,
                borderRadius: 10,
                marginTop: 5,
                width: "50%"
        },
        buttonContainer: {
                width: "80%",
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40
        },
        button: {
                backgroundColor: '#0782F9',
                width: "50%",
                padding: 15,
                borderRadius: 10,
                alignItems: 'center'
        },
        buttonOutline: {
                backgroundColor: 'white',
                marginTop: 5,
                borderColor: '#0782F9',
                borderWidth: 2,
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
        student: {
                width: "100%"
        },
        email: {
                color: "white",
                fontWeight: '700',
                fontSize: 12,
        },
        pressed: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 30,
                margin: 2,
                borderRadius: 5,
                backgroundColor: 'pink',
                flexDirection: 'row',
        },
        pressedText: {
                color: "gray",
                fontWeight: '700',
                fontSize: 16
        },
        pressedEmail: {
                color: "gray",
                fontWeight: '700',
                fontSize: 12,
        },
})