import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { isTypeAliasDeclaration } from "typescript";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core"

const LoginScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const navigation = useNavigation();

        const handleSignUp = () => {
                auth
                        .createUserWithEmailAndPassword(email, password)
                        .then(userCredentials => {
                                const user = userCredentials.user;
                                console.log("Registered with:", user.email);
                                setEmail('');
                                setPassword('');

                        })
                        .catch(error => alert(error.message));

        }

        const handleLogin = () => {
                auth
                        .signInWithEmailAndPassword(email, password)
                        .then(userCredentials => {
                                const user = userCredentials.user;
                                // setLoggedIn(true);
                                console.log("Logged in with:", user.email);
                        })
                        .catch(error => alert(error.message))
        }

        return (

                <KeyboardAvoidingView
                        style={styles.container}
                >
                        <View style={styles.inputContainer}>
                                <TextInput
                                        placeholder="Email"
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        style={styles.input}
                                />
                                <TextInput
                                        placeholder="Password"
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                        style={styles.input}
                                        secureTextEntry
                                />
                        </View>

                        <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                        onPress={handleLogin}
                                        style={styles.button}
                                >
                                        <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        onPress={handleSignUp}
                                        style={[styles.button, styles.buttonOutline]}>
                                        <Text style={styles.buttonOutlineText}>Register</Text>
                                </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView >

        )
}

export default LoginScreen

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
                marginTop: 5
        },
        buttonContainer: {
                width: "80%",
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40
        },
        button: {
                backgroundColor: '#0782F9',
                width: "100%",
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
        buttonOutlineText: {
                color: "0782F9",
                fontWeight: '700',
                fontSize: 16
        },
        container2: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        button2: {
                backgroundColor: '#0782F9',
                width: "60%",
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 40
        },
        buttonText2: {
                color: "white",
                fontWeight: '700',
                fontSize: 16
        }
})