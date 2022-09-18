import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeNavigation from "./navigation/HomeNavigation"
import ConfirmarCompra from "./screens/ConfirmarCompra";
import RealizarPago from "./screens/RealizarPago"
import CompraRealizada from "./screens/CompraRealizada"
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeNavigation">
      <Stack.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ConfirmarCompra"
        component={ConfirmarCompra}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="RealizarPago"
        component={RealizarPago}

        options={{
          title: "",
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="CompraRealizada"
        component={CompraRealizada}
        options={{
          title: "",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />

    </Stack.Navigator>
  );
}
