import React from 'react';
import {View, StyleSheet, Text, Button, Alert, AsyncStorage, Animated} from 'react-native';
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helper'


export default class TeatPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            all: [],
            data: {},
            num: 0,
            index: 0,
            page: true,
            opacity: new Animated.Value(1),
            rotate: new Animated.Value(0),
            correct: 0,
            inCorrect: 0
        };
    }

    componentDidMount() {
        let _that = this;
        AsyncStorage.getItem(this.props.navigation.state.params.dataType, (err, itemData) => {
            if (err) {
                Alert.alert('提示', "数据获取错误");
            } else {
                // console.log(this.props.navigation.state.params.dataType);
                itemData = JSON.parse(itemData);
                // console.log(itemData);
                _that.setState({
                    num: itemData.questions.length,
                    all: itemData,
                    data: itemData.questions[this.state.index]
                })
            }
        });

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {

        const {navigate} = this.props.navigation;
        return (
            <View style={styles.content}>
                <View style={styles.nav}>
                    {/*<Button
                        onPress={() => {
                            this.setState({
                                index: this.state.index - 1,
                                data: this.state.all.questions[this.state.index - 1],
                                page:true
                            })
                        }}
                        disabled={this.state.index <= 0}
                        title="上一题"
                        color="#841584"/>*/}
                    <Text>{this.state.index + 1}/{this.state.num}</Text>
                    {/*<Button
                        onPress={() => {
                            this.setState({
                                index: this.state.index + 1,
                                data: this.state.all.questions[this.state.index + 1],
                                page:true
                            })
                        }}
                        disabled={this.state.index >= (this.state.num - 1)}
                        title="下一题"
                        color="#841584"/>*/}
                </View>
                <Animated.View style={{
                    marginTop: 40,
                    marginBottom: 40,
                    transform: [{
                        rotateY: this.state.rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '90deg']
                        })
                    }],
                    opacity: this.state.opacity
                }}>
                    <Text
                        style={styles.question}>{this.state.page ? this.state.data.question : this.state.data.answer}</Text>
                    <Button
                        onPress={() => {
                            if (this.state.page) {
                                Animated.parallel([
                                    Animated.sequence([
                                        Animated.timing(this.state.opacity, {
                                            toValue: 0,        //属性目标值
                                            duration: 500    //动画执行时间
                                        }),
                                        Animated.timing(this.state.opacity, {
                                            toValue: 1,        //属性目标值
                                            duration: 500    //动画执行时间
                                        })
                                    ]),
                                    Animated.sequence([
                                        Animated.timing(this.state.rotate, {
                                            toValue: 1,        //属性目标值
                                            duration: 500    //动画执行时间
                                        }),
                                        Animated.timing(this.state.rotate, {
                                            toValue: 0,        //属性目标值
                                            duration: 500    //动画执行时间
                                        })
                                    ])
                                ]).start();

                            } else {
                                Animated.parallel([
                                    Animated.sequence([
                                        Animated.timing(this.state.opacity, {
                                            toValue: 0,        //属性目标值
                                            duration: 500    //动画执行时间
                                        }),
                                        Animated.timing(this.state.opacity, {
                                            toValue: 1,        //属性目标值
                                            duration: 500    //动画执行时间
                                        })
                                    ]),
                                    Animated.sequence([
                                        Animated.timing(this.state.rotate, {
                                            toValue: 1,        //属性目标值
                                            duration: 500    //动画执行时间
                                        }),
                                        Animated.timing(this.state.rotate, {
                                            toValue: 0,        //属性目标值
                                            duration: 500    //动画执行时间
                                        })
                                    ])
                                ]).start();
                            }
                            this.timer = setTimeout(
                                () => {
                                    this.setState({
                                        page: !this.state.page
                                    })
                                },
                                500
                            );
                        }}
                        title={this.state.page ? "answer" : "question"}
                        color="#f00"/>
                </Animated.View>
                <View>
                    <Button
                        onPress={() => {
                            this.setState({
                                correct: this.state.correct + 1
                            }, () => {
                                if (this.state.index >= (this.state.num - 1)) {
                                    clearLocalNotification().then(setLocalNotification);
                                    Alert.alert(
                                        "提示",
                                        "本次测试的正确率为" + ((this.state.correct / this.state.num) * 100) + "%",
                                        [
                                            {
                                                text: '重新开始测试', onPress: () => this.setState({
                                                    index: 0,
                                                    page: true,
                                                    opacity: new Animated.Value(1),
                                                    rotate: new Animated.Value(0),
                                                    correct: 0,
                                                    inCorrect: 0,
                                                    data: this.state.all.questions[0]
                                                })
                                            },
                                            {
                                                text: '回到卡片集',
                                                onPress: () => navigate('detail', {title: this.props.navigation.state.params.dataType})
                                            }
                                        ]
                                    )

                                } else {
                                    this.setState({
                                        index: this.state.index + 1,
                                        data: this.state.all.questions[this.state.index + 1],
                                        page: true
                                    })
                                }
                            });

                        }}
                        title="Correct"
                        color="#00FF67"/>
                    <Button
                        onPress={() => {
                            this.setState({
                                inCorrect: this.state.inCorrect + 1
                            }, () => {
                                if (this.state.index >= (this.state.num - 1)) {
                                    clearLocalNotification().then(setLocalNotification);
                                    Alert.alert(
                                        "提示",
                                        "本次测试的正确率为" + ((this.state.correct / this.state.num) * 100) + "%",
                                        [
                                            {
                                                text: '重新开始测试', onPress: () => this.setState({
                                                    index: 0,
                                                    page: true,
                                                    opacity: new Animated.Value(1),
                                                    rotate: new Animated.Value(0),
                                                    correct: 0,
                                                    inCorrect: 0,
                                                    data: this.state.all.questions[0]
                                                })
                                            },
                                            {
                                                text: '回到卡片集',
                                                onPress: () => navigate('detail', {title: this.props.navigation.state.params.dataType})
                                            }
                                        ]
                                    )
                                } else {
                                    this.setState({
                                        index: this.state.index + 1,
                                        data: this.state.all.questions[this.state.index + 1],
                                        page: true
                                    })
                                }
                            });
                        }}
                        title="Incorrect"
                        color="#f00"/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    nav: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center"
    },
    question: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 40
    }
});