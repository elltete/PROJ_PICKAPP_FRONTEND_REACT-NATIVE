import React, { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './AppNavigator';
import { BuyContext } from "./context/BuyContext";

export default function App() {
  
  const [buys, setBuys] = useState([]);
  return (

    <PaperProvider>
      <BuyContext.Provider
        value={{
          buys,
          setBuys
        }}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </BuyContext.Provider>
    </PaperProvider>
  );
}


