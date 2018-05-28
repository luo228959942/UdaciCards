import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ListPage from './ListPage';
import AddPage from './AddPage';
import { setLocalNotification } from '../utils/helper'

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {activeItem: true};
    }
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>
                <View style={styles.navTabs}>
                    <View style={[styles.navItem, this.state.activeItem ? styles.navActive : '']}>
                        <Text style={this.state.activeItem ? styles.activeText : ''}
                              onPress={() => this.setState({activeItem: true})}>列表</Text>
                    </View>
                    <View style={[styles.navItem, this.state.activeItem ? '' : styles.navActive]}>
                        <Text style={this.state.activeItem ? '' : styles.activeText}
                              onPress={() => this.setState({activeItem: false})}>新增</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {this.state.activeItem ? <ListPage navigation={this.props.navigation}/> : <AddPage navigation={this.props.navigation}/>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop:20
    },
    navTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItem: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    navActive: {
        borderBottomColor: '#ff0000'
    },
    activeText: {
        color: '#f00'
    },
    content:{
        paddingTop:10,
        flexDirection:'column',
        flex:1
    }
});
