import React from 'react';
import {View, Text, StyleSheet, FlatList, AsyncStorage, Alert} from 'react-native';
import Item from './Item';

export default class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        let _that = this;
        AsyncStorage.getAllKeys((err, data) => {
            if (err) {
                Alert.alert('提示', "数据获取错误");
                //TODO:存储取数据出错 ，给用户提示错误信息。
            } else {
                data.map(item => {
                    let title=item;
                    AsyncStorage.getItem(item,(err,item)=>{
                        if(err){
                            Alert.alert('提示', "数据获取错误");
                        }else {
                            let list=this.state.list;
                            let data={
                                title:title,
                                num:JSON.parse(item).questions.length,
                                key:title
                            };
                            list.push(data);
                            _that.setState(list);
                        }
                    })
                });
            }
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.listContent}>
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => <Item navigation={this.props.navigation} data={item}/>}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    listContent: {
        flex: 1
    }
});