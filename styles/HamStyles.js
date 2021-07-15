import React from "react";
import { StyleSheet, View } from "react-native";

const hamStyle = {height:5, width:44, backgroundColor:'#2f3640', borderRadius:10,marginBottom:6}

const styles = StyleSheet.create({
    ham:{
        height:44,
    },
    hamChild:hamStyle,
    lasthamChild:{
      ...hamStyle,
        marginBottom:0
    }
})


export const Ham = () => (
    <View style={styles.ham}>
        {['',''].map((ham,i) => (
            <View key={i} style={styles.hamChild}/>
        ))}
        <View style={styles.lasthamChild}/>
    </View>
)