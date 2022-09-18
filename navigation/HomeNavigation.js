import React, { useState, useEffect, useContext } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import HomeScreen from '../screens/Products/HomeScreen';
import ProductScreen from '../screens/Products/ProductScreen';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Badge, Text, Headline } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuyContext } from '../context/BuyContext';


const Drawer = createDrawerNavigator();

export default function AppNavigator({ navigation, route }) {
  const [select, setSelect] = useState(true)
  const context = useContext(BuyContext);
  const goToLogin = () => {
    setEmail("")
    navigation.navigate("Login");

  };
  const goToRegister = () => {
    setEmail("")
    navigation.navigate("RegisterScreen");

  };
  const goToConfirmarCompra = () => {
    navigation.navigate("ConfirmarCompra");
  };

  const logOff = () => {
    setEmail("")
    AsyncStorage.clear()
    context.setBuys([])
  }
  const [email, setEmail] = useState()

  const setData = () => {
    AsyncStorage.getItem('@mail').then(r => setEmail(r))
  }





  const styles = StyleSheet.create({
    container: {
      marginVertical: '2%',
      marginRight: '12%'
    },
    button: {
      // padding: 10,
      // marginBottom: 20,
    },
    img: {

    },
    textMail: {
      padding: 20,
      textAlign: 'center',
      marginRight: 10,
      color: "black"
    },
    accountButton: {
      marginBottom: 10,
      borderRadius: 90,
      marginHorizontal: 10
    },
    lightTitle: {
      fontWeight: "600",
      letterSpacing: 2,
      fontSize: 25,
      color: "#86394F",
      marginBottom: "5%",
      marginTop: "5%",
      textAlign: "center"
    }
  });


  useEffect(() => {
    setData()
  }, [email, route.params])


  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#F6F6F8',
          width: 240,
        },
        drawerActiveTintColor: '#0C405F',
        drawerType: 'back',
        headerTitle: 'Bienvenido',
        headerTitleAlign: 'center',
        drawerLabelStyle: {
          fontWeight: "100",
          fontSize: 20,
          color: "black"
        },
        headerRight: () => (

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => { goToConfirmarCompra() }}>
              <FontAwesome5 name="shopping-cart" size={24} color="black" />
              {context.buys.length > 0 &&
                <Badge style={{ fontSize: 15, position: "absolute", top: -6, right: -6 }}>{context.buys.length}</Badge>
              }
            </TouchableOpacity>

          </View>
        ),
      }}
      drawerContent={props => {
        return (
          <>
            <View style={{ position: 'relative', alignItems: 'center', paddingTop: 50 }}>
              {/* <Ionicons name="fast-food-outline" size={50} color="black" />  */}
              <Image
                source={require("../assets/icon.png")}
              />
              <Image
                source={require("../assets/pickapp2.png")}
                style={styles.img} />
              {/* <Headline style={{ fontStyle: 'italic' }}>Pick-app</Headline> */}
            </View>
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{ flex: 1 }}
            >
              <DrawerItemList {...props} />
              {
                email ?
                  <>
                    <View style={{ flex: 1 }} />
                    <View>
                      <Text style={styles.textMail}>
                        <AntDesign style={{}} name="user" size={18} />
                        {email}
                      </Text>
                      <Button style={styles.accountButton} mode='text' onPress={() => logOff()}> Cerrar sesión </Button>
                    </View>
                  </>
                  :
                  <>
                    <View style={{ flex: 1 }} />
                    <Button style={styles.accountButton} mode='outlined' onPress={() => goToLogin()}>Iniciar sesión</Button>
                    <Button style={styles.accountButton} mode='contained' onPress={() => goToRegister()}>¡Registrate acá!</Button>

                  </>
              }
            </DrawerContentScrollView>
          </>)

      }}

    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        initialParams={{ cat: "comida" }}
        name="Comidas"
        component={ProductScreen}
        options={{
          headerTitle: 'COMIDAS',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        initialParams={{ cat: "postre" }}
        name="Postres"
        component={ProductScreen}
        options={{
          headerTitle: 'POSTRES',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        initialParams={{ cat: "bebida" }}
        name="Bebidas"
        component={ProductScreen}
        options={{
          headerTitle: 'BEBIDAS',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        initialParams={{ cat: "snack" }}
        name="Snacks"
        component={ProductScreen}
        options={{
          headerTitle: 'SNACKS',
          headerTitleAlign: 'center'
        }}
      />
    </Drawer.Navigator>
  )


}
