import React from "react";
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { StyleSheet, Alert } from "react-native"
import { color } from 'react-native-reanimated';

export function CategoryCard(props) {
    const { nombre, img, onPress } = props

    return (
        <Card
            style={styles.card}
            onPress={onPress}
            mode='outlined' >
            <Card.Title titleStyle={styles.title} title={nombre} />
            <Card.Cover style={styles.cover} source={{ uri: img }} />
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,

    },
    cover: {
        width: 160,
        height: 200,
        borderBottomEndRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#21005D",
        marginBottom: "5%",
        textAlign: "center",
        fontWeight: "200",

    }
})
export default CategoryCard