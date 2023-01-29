import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core"
// import { auth } from "../firebase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import EmailScreen from './EmailScreen';
import ListScreen from './ListScreen'
import SignOutScreen from './SignOutScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

        const navigation = useNavigation();

        return (
                <Tab.Navigator>
                        <Tab.Screen name="Email" component={EmailScreen}
                                options={{
                                        tabBarIcon: ({ color, size }) => (
                                                <MaterialCommunityIcons name="fridge" color={color} size={size} />
                                        )
                                }} />
                        <Tab.Screen name="Students" component={ListScreen}
                                options={{
                                        tabBarIcon: ({ color, size }) => (
                                                <MaterialIcons name="inventory" color={color} size={size} />
                                        )
                                }} />
                        <Tab.Screen name="Sign Out" component={SignOutScreen}
                                options={{
                                        tabBarIcon: ({ color, size }) => (
                                                <MaterialIcons name="logout" color={color} size={size} />
                                        )
                                }} />
                </Tab.Navigator>

        )
}

export default HomeScreen;

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