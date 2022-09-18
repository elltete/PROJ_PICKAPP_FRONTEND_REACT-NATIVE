import { useContext, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { BuyContext } from "../context/BuyContext";
import Input from "../components/Input";
import { HOST_API } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TotalItems from "../components/TotalItems";
import { Button } from "react-native-paper";
import { Headline, Snackbar, Divider } from "react-native-paper";

export default function RealizarPago({ navigation }) {
  const [numCard, setNumCard] = useState("");
  const [venCard, setVenCard] = useState("");
  const [codCard, setCodCard] = useState("");
  const [tipePay, setTipePay] = useState("tarjeta");
  const [error, setError] = useState("");
  const context = useContext(BuyContext);
  const goToCompraRealizada = async () => {
    if ((venCard && numCard && codCard) || tipePay === "efectivo") {
      realizarPago();
    } else {
      setError("Complete todos los campos");
    }
  };

  const realizarPago = async () => {
    let idUser = await AsyncStorage.getItem("@idUser");
    fetch(HOST_API + "/api/sales", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        idUser: idUser,
        productos: context.buys,
        medioDePago: tipePay,
        numeroTarjeta: numCard,
        fechaVen: venCard,
        ping: codCard,
        montoTotal: context.buys.reduce((a, b) => a + (b["precio"] || 0), 0),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.acknowledged) {
          context.setBuys([]);
          navigation.navigate("CompraRealizada");
        } else {
          setError("No se pudo Realizar el pago");
        }
      })
      .catch((error) => {
        setError("No se pudo Realizar el pago");
      });
  };

  const handleCash = () => {
    setError("")
    setTipePay("efectivo");
  };

  const handleCard = () => {
    setError("")
    setTipePay("tarjeta");
  };

  const onToggleSnackBar = () => setError("");

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: '30%' }}>
          <Headline style={styles.title}>¡Último paso!</Headline>
          <Text style={styles.subTitle}>¿Cómo querés pagar?</Text>
        </View>
        <View style={styles.containerInputs}>
          <View style={styles.containerMenu}>

            <Button
              mode="contained"
              color={tipePay === "tarjeta" ? "#fff" : "#FF470C"}
              icon="cash"
              onPress={() => handleCash()}
            >
              Efectivo
            </Button>
            <Button
              icon="card"
              color={tipePay === "efectivo" ? "#fff" : "#FF470C"}
              mode="contained"
              onPress={() => handleCard()}
            >
              Tarjeta
            </Button>
          </View>
          {tipePay === "tarjeta" && (
            <View>
              <Input
                placeholder="Numero de Tarjeta"
                value={numCard}
                onChangeText={(text) => setNumCard(text)}
                keyboardType="numeric"
              />
              <Input
                placeholder="Fecha de venciminto"
                value={venCard}
                onChangeText={(text) => setVenCard(text)}
                keyboardType="numeric"
              />
              <Input
                placeholder="Código de seguridad"
                value={codCard}
                onChangeText={(text) => setCodCard(text)}
                keyboardType="numeric"
              />
            </View>
          )}

          <View style={styles.total}>
            <Divider />
            <TotalItems />
            <Divider />
          </View>
        </View>
      </ScrollView>
      <View style={{ marginBottom: '15%' }}>
        <Button style={{ marginBottom: '5%' }} mode='contained' onPress={() => goToCompraRealizada()}>Pagar</Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}> Volver</Button>
      </View>
      <Snackbar
        visible={error}
        onDismiss={onToggleSnackBar}
        action={{
          label: "X",
          color: "white",
        }}
        style={{ backgroundColor: "#E6322D" }}
      >
        <Headline style={{ color: 'white', fontWeight: "100", fontSize: 17 }}>{error}</Headline>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: '#F2F3F8'
  },
  title: {
    letterSpacing: 2,
    fontSize: 30,
    color: "black",
    textAlign: 'center',
    paddingHorizontal: 50,
    borderRadius: 5
  },
  subTitle: {
    letterSpacing: 2,
    fontSize: 20,
    color: "black",
    textAlign: 'center',
    paddingHorizontal: 50,
    borderRadius: 5
  },
  description: {
    fontSize: 18,
    color: "gray",
  },
  containerInputs: {
    margin: 10,
    alignItems: 'center'
  },
  containerMenu: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 40,
    alignItems: 'center',

  },
  total: {
    margin: 10
  }
});
