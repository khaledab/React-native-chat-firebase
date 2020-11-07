import React from "react";
import {Button, TextInput, View, StyleSheet,FlatList} from "react-native";
import {Text} from "react-native-web";


const UsersScreen = ({messages}) => {
    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={messages}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                    return (
                        <Text>{item.user.name}</Text>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        height : 50,
        width : '100%',
        borderWidth : 1,
        padding : 15,
        borderColor : 'grey',
        marginBottom : 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding : 30,
    }
})


export default UsersScreen ;
