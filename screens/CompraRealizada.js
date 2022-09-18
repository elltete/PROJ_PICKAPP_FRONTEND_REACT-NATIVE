import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Headline } from 'react-native-paper'

export default function CompraRealizada({navigation}) {
  const goToHome = () => {
    navigation.navigate("HomeNavigation", 'Home');
  };  
  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Compra realizada</Headline>
      <Text >¡Muchas gracias!</Text>
      <Text >En breve el comercio se contactará con vos.</Text>
      <Text style={{fontSize:7}}>(mentira)</Text>

      <Image 
        source={{uri: 'https://c.tenor.com/Irg9yU74Zo8AAAAC/woohoo-yeah.gif'}}
        style={{width: 300, height:300, borderRadius:100, marginTop:'10%' }} 
    />
      <Button style={{marginVertical:'20%'}} mode='contained'  onPress={() => goToHome()} >Volver al inicio</Button>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:'white'
  },
  title: {
    letterSpacing: 2,
    fontSize: 30,
    color: "black",
    textAlign: 'center',
    borderRadius: 5,
    marginTop:'25%',
    marginBottom:'10%'
  },
  description: {
         fontSize: 18,
         color: "gray",
       }
});
