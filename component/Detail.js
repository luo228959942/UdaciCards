import React from 'react';
import {View, Text, StyleSheet, Alert, Button, AsyncStorage} from 'react-native';

export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 0,
        };
    }

    componentDidMount() {
        let _that = this;
        AsyncStorage.getItem(this.props.navigation.state.params.title, (err, itemData) => {
            if (err) {
                Alert.alert('提示', "数据获取错误");
            } else {
                itemData = JSON.parse(itemData);
                _that.setState({num: itemData.questions.length})
            }
        })
    }



    render() {
        const {navigate} = this.props.navigation;
        if(this.props.navigation.state.params.form==="addCard"){
            let title=this.props.navigation.state.params.title;
            this.props.navigation.goBack=function(){
                navigate('Index')
            }
        }
        return (
            <View style={styles.detailContext}>
                <View style={styles.infoList}>
                    <Text style={styles.title}>{this.props.navigation.state.params.title}</Text>
                    <Text style={styles.num}>{this.state.num} cards</Text>
                </View>
                <View style={styles.btnList}>
                    <Button
                        onPress={() => {
                            navigate("addCard",{title:this.props.navigation.state.params.title})
                        }}
                        title="Add Card"
                        color="#841584"
                    />
                    <Button
                        onPress={() => {
                            navigate("testPage",{dataType:this.props.navigation.state.params.title})
                        }}
                        title="Start Quiz"
                        color="#841584"
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    detailContext: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    infoList: {
        paddingTop: 100,
        paddingBottom: 100,
        marginBottom:10
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    num: {
        marginTop:10,
        color: "#999",
        textAlign: 'center'
    },
    btnList: {
    }
});