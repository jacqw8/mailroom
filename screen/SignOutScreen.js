import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { auth } from "../firebase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const SignOutScreen = () => {

        const navigation = useNavigation();

        const handleSignOut = () => {
                auth.signOut()
                        .then(() => {
                                console.log("Signed out");
                        })
                        .catch(error => alert(error.message))
        }

        return (
                <View style={styles.container}>
                        <Text>Email: {auth.currentUser?.email}</Text>
                        <TouchableOpacity
                                style={styles.button}
                                onPress={handleSignOut}>
                                <Text style={styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                </View>
        )
}

export default SignOutScreen;

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        button: {
                backgroundColor: '#0782F9',
                width: "60%",
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 40
        },
        buttonText: {
                color: "white",
                fontWeight: '700',
                fontSize: 16
        },

})