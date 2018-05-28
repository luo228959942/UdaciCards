import React from 'react';
import {View, Text, StyleSheet, TextInput, Button, AsyncStorage, Alert} from 'react-native';

export default class AddCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data:{},
            question:"",
            answer:""
        };
    }

    componentDidMount(){
        // console.log("componentDidMount");
        let _that = this;
        AsyncStorage.getItem(this.props.navigation.state.params.title,(err,obj)=>{
            if (err) {
                Alert.alert('提示', "数据获取错误")
                //TODO:存储取数据出错 ，给用户提示错误信息。
            }
            // console.log("aa");
            // console.log(obj);
            _that.setState({
                data:JSON.parse(obj)
            })
        });

    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.addContext}>
                <View style={{flexDirection: 'row', paddingLeft: 30, paddingRight: 30}}>
                    <TextInput
                        style={styles.deckName}
                        placeholder="question"
                        onChangeText={(text) => this.setState({question:text})}
                    />
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 30, paddingRight: 30}}>
                    <TextInput
                        style={styles.deckName}
                        value={this.state.test}
                        placeholder="Answer"
                        onChangeText={(text) => this.setState({answer:text})}
                    />
                </View>
                <Button
                    onPress={() => {
                        if(this.state.question&&this.state.answer){
                            this.state.data.questions.push({
                                question: this.state.question,
                                answer: this.state.answer
                            });
                            // console.log(this.state.data);
                            let _that = this;
                            AsyncStorage.setItem(this.props.navigation.state.params.title, JSON.stringify(this.state.data), () => {
                                navigate('detail',{title:this.props.navigation.state.params.title,form:"addCard"})
                            });
                        }else {
                            Alert.alert("提示","请输入新的问题和答案")
                        }
                    }}
                    title="添加"
                    color="#841584"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    addContext: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 30
    },
    deckName: {
        flex: 1,
        height: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 50,
        borderRadius: 5
    }
});