import { useContext, useState } from "react";
import { Button, Card, Headline, Paragraph, Snackbar } from 'react-native-paper';
import { StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BuyContext } from '../context/BuyContext';

const CardItem = ({ nombre, img, precio, desc, id }) => {
    const context = useContext(BuyContext);
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            margin: "2%"
        }
    })
    const [visible, setVisible] = useState(false);
    const [visibleLog, setVisibleLog] = useState(false)

    const onToggleSnackBar = () => setVisible(!visible);
    const onToggleLogSnackBar = () => setVisibleLog(!visibleLog)

    const handleAgregar = (nombre) => {
        AsyncStorage.getItem('@mail').then(mail => {
            if (mail) {
                setVisible(true)
                context.setBuys(prev => [...prev, { nombre, precio, id }])
            } else {
                setVisibleLog(true)                
                // navigation.navigate("Login");
            }
        })

    }


    return (

        <Card style={styles.container}>
            <Card.Title title={nombre} subtitle={desc} />
            <Card.Content>
                <Paragraph>${precio}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: img }} />
            <Button icon="food" mode="contained" onPress={() => handleAgregar(nombre)}>
                Agregar al carrito
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={onToggleSnackBar}
                duration = {2000}
                action={{
                    label: 'Ok',
                    color: '#6200EE',
                    onPress: () => {
                        onToggleSnackBar
                    },
                }}
                style={{ marginBottom: 90, backgroundColor: '#1FDF64', opacity: 0.9 }}
            >
                <Headline style={{ fontWeight: '100', fontSize: 17 }}>¡Agregado al carrito!</Headline>
            </Snackbar>
            <Snackbar
            visible={visibleLog}
            onDismiss={onToggleLogSnackBar}
            action={{
                label: 'Iniciar sesión',
                color: 'white',
                onPress: () => {
                    navigation.navigate("Login")
                },
            }}
            style={{ marginBottom: 90, backgroundColor: '#E6322D', opacity: 0.9 }}
        >
            <Headline style={{ fontWeight: '100', fontSize: 17 }}>¡Inciá sesión para empezar tu compra!</Headline>
        </Snackbar>
        </Card>

    )
}

export default CardItem