import React from 'react';
import {StyleSheet, View, FlatList, Text, AsyncStorage, Alert} from 'react-native';
import Storage from 'react-native-storage';
import {createStackNavigator} from 'react-navigation';
import Index from './component/Index';
import Dateil from './component/Detail';
import AddCard from './component/AddCard';
import TestPage from './component/TestPage';


let data={
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};
// AsyncStorage.clear();
AsyncStorage.setItem("React",JSON.stringify(data.React));
AsyncStorage.setItem("JavaScript",JSON.stringify(data.JavaScript));



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop:20
    },
});

export default createStackNavigator({
    Index:{
        screen: Index,
        navigationOptions: ({ navigation }) => ({
            header: null,
            title: "首页"
        })
    },
    detail:{
        screen: Dateil,
        navigationOptions: ({ navigation }) => ({
            title: "卡片集"
        })
    },
    addCard:{
        screen:AddCard,
        navigationOptions: ({ navigation }) => ({
            title: "添加新问题"
        })
    },
    testPage:{
        screen:TestPage,
        navigationOptions: ({ navigation }) => ({
            title: "Quiz"
        })
    }
})
