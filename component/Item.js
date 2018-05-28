import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Item extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {navigate} = this.props.navigation;
        let {title, num} = this.props.data;
        return (
            <View style={{
                ...this.props.style,
            }}>
                <View style={[styles.itemConten]}>
                    <Text style={[styles.title]} onPress={() => {
                        navigate('detail', {title: title,form:"list"})
                    }}>{title}</Text>
                    <Text style={[styles.num]}>{num}个单词</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemConten: {
        paddingTop: 40,
        paddingBottom: 40,
        borderBottomColor: '#999',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    num: {
        color: '#999',
        textAlign: 'center',
        marginTop: 10
    }
});