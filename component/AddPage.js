import React from 'react';
import {View,Text,StyleSheet,TextInput,Button,AsyncStorage,Alert} from 'react-native';

export default class AddPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {title: ''};
    }
    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.addContext}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <View style={{flexDirection:'row',paddingLeft:50,paddingRight:50}}>
                    <TextInput
                        style={styles.deckName}
                        placeholder="deck Title"
                        onChangeText={(title) => this.setState({title})}
                    />
                </View>
                <Button
                    onPress={()=>{
                        if(this.state.title){
                            let value={
                                title:this.state.title,
                                questions:[]
                            };
                            // console.log(value);
                            AsyncStorage.setItem(this.state.title,JSON.stringify(value),()=>{
                                // console.log("setItem success!");
                                navigate('addCard', {title: this.state.title});
                            });
                        }else {
                            Alert.alert("提示","请输入单词集名称")
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
    addContext:{
        flex:1,
        alignItems:'center',
    },
    title:{
        marginBottom:50,
        fontSize:50,
        textAlign:'center',
        marginTop:30
    },
    deckName:{
        flex:1,
        height:40,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#eee',
        marginBottom:50,
        borderRadius:5
    }
});