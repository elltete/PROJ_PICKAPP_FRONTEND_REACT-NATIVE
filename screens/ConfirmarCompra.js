import { useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import ItemBuy from "../components/ItemBuy";
import TotalItems from "../components/TotalItems";
import { BuyContext } from '../context/BuyContext';
import { Divider, Button, Headline } from 'react-native-paper'

export default function ConfirmarCompra({ navigation }) {
  const context = useContext(BuyContext);
  const goToRealizarPago = () => {
    navigation.navigate("RealizarPago");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu carrito</Text>
      {context.buys.length === 0 ?
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require("../assets/emptyCart2.png")}
            style={styles.img}
          />
          <Headline style={styles.headline}>¡Nada por acá!</Headline>
          <Button mode="outlined" onPress={() => navigation.goBack()}> Seguir navegando</Button>
        </View>
        :
        <>
          <ScrollView style={styles.list}>
            {context.buys.map((product, i) => <ItemBuy product={product} key={i} />)}
          </ScrollView>
          <View style={styles.total}>
            <Divider />
            <TotalItems />
            <Divider />
          </View>
          <Button mode="contained" onPress={() => goToRealizarPago()}> Confirmar compra</Button>
          <Button mode="outlined" onPress={() => navigation.goBack()}> Seguir navegando</Button>

        </>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: 'white'
  },
  title: {
    letterSpacing: 2,
    fontSize: 30,
    color: "white",
    marginTop: '15%',
    textAlign: 'center',
    backgroundColor: '#6000EC',
    paddingHorizontal: 100,
    borderRadius: 5
  },
  list: {
    maxHeight: "40%",
    minWidth: "80%",
    backgroundColor: '#DCE5FA',
    borderRadius: 10
  },
  headline: {
    marginTop: '10%',
    marginVertical: '25%'
  },
  img: {
    marginTop: '15%'
  }
});
