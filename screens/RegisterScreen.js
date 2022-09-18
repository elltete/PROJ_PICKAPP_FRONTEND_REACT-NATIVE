import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import Input from "../components/Input";
import { HOST_API } from "../constants"
import { Headline, Snackbar } from 'react-native-paper';



export function RegisterForm({ navigation }) {
  const [mensaje, setMensaje] = useState(false);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitePassword, setRepitePassword] = useState("");

  const isIncompleteData = !email || !password;
  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value)
    } catch (e) {
      // saving error
    }
  }
  const onSubmit = () => {
    if (email !== "" && password !== "" && repitePassword !== "") {
      if (repitePassword === password) {
        fetch(HOST_API + "/api/users/register",
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
            console.log(json)
            storeData("@token", json.token)
            storeData("@idUser", json.user._id)
            storeData("@mail", json.user.email)
            
            navigation.navigate("HomeNavigation", json.user.email);

          })
          .catch((error) => {
            console.error(error);
          })
        ;
      } else {
        setMensaje("Las contraseñas no coinciden");
        setVisible(true);

      }

    } else {
      setMensaje("Todos los campos son obligatorios");
      setVisible(true);

    }
  };

  return (
    <View style={styles.container}>

      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType={"email-address"}
        autoCapitalize='none'
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        isPassword
      />
      <Input
        placeholder="Repita Contraseña"
        value={repitePassword}
        onChangeText={(text) => setRepitePassword(text)}
        isPassword
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={isIncompleteData}
      >
        Registrarme
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onToggleSnackBar}
        action={{
          label: 'X',
          color: 'white',

        }}
        style={{ marginBottom: 50, backgroundColor: '#E6322D', opacity: 0.9 }}
      >
        <Headline style={{ fontWeight: '100', fontSize: 17 }}>{mensaje}</Headline>
      </Snackbar>
    </View>
  );
}

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={{ marginTop: 15 }}>
          <Image
            style={{ alignSelf: 'center', left:15 }}
            source={require("../assets/iconRegister.png")}
          />
          <Text style={styles.title}>Registrarse</Text>
        </View>
        <View style={styles.formView}>
          <RegisterForm navigation={navigation} />
        </View>
        <Text style={{ textAlign: 'center' }}>¿Ya estás registrado?</Text>
        <Button mode="text" onPress={() => navigation.navigate('Login')}>Iniciar sesión</Button>
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
    textAlign: "center",
    color: "black",
  },
});
