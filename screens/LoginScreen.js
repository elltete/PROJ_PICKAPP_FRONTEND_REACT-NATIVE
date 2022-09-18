import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";
import Input from "../components/Input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_API } from "../constants"
import { SafeAreaView } from "react-native-safe-area-context";

export function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isIncompleteData = !email || !password;
  let loadButton = false;
  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value)
    } catch (e) {
      // saving error
    }
  }
  const onSubmit = () => {
    loadButton = true;
    if (email && password) {
      fetch(HOST_API + "/api/users/login",
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        }).then((response) => response.json())
        .then((json) => {
          storeData("@token", json.token)
          storeData("@idUser", json.user._id)
          storeData("@mail", json.user.email)

          navigation.navigate("HomeNavigation", json.user.email);

        })
        .catch((error) => {
          console.error(error);
        });
    }

  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType={"email-address"}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        isPassword
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        loading={loadButton ? true : false}
      >Iniciar sesión
      </Button>
    </View>
  );
}

export default function LoginScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={{ marginTop: 15 }}>
          <Image
            style={{ alignSelf: 'center' }}
            source={require("../assets/iconLogin.png")}
          />
          <Text style={styles.title}>Iniciar sesión</Text>
        </View>
        <View style={styles.formView}>
          <LoginForm navigation={navigation} />
        </View>
        <Text style={{ textAlign: 'center' }}>¿No estás registrado?</Text>
        <Button mode="text" onPress={() => navigation.navigate('RegisterScreen')}>¡Registrate acá!</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    marginTop: '10%'
  },
  formView: {
    marginBottom: 20,
    alignContent: "center",
  },
  title: {
    fontSize: 30,
    alignContent: "center",
    textAlign: "center",
    color: "black",
    margin: 20,
  },
});
