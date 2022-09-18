import React from "react"
import { View, StyleSheet, Image } from "react-native"
import { Headline, Button, Modal } from 'react-native-paper';
import CategoryCard from "../../components/CategoryCard"
import Styles from "./Component/Style"
import { FlatList } from "react-native-gesture-handler";
import ProductScreen, { cards } from "./ProductScreen";

// let cards = [
//   { key: 1, nombre: "Comidas", img: 'https://img.freepik.com/foto-gratis/pizza-mozzarella-aceitunas-tabla-madera_311379-1163.jpg' },
//   { key: 2, nombre: "Bebidas", img: 'https://static.vecteezy.com/system/resources/previews/001/903/393/large_2x/assorted-iced-drinks-free-photo.jpg' },
//   { key: 3, nombre: "Postres", img: 'https://www.elmueble.com/medio/2019/12/05/cheesecacke-choco-496664_0f7b18f8_1336x2000.jpg' },
//   { key: 4, nombre: "Snacks", img: 'https://www.cheryls.com/blog/wp-content/uploads/2021/08/Sweet-and-Salty-snacks-Hero1.jpg' }

// ]

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const renderItem = ({ item }) => (
    <CategoryCard
      nombre={item.titulo}
      img={item.img}
      onPress={() => {
        navigation.navigate(item.titulo, { cat: item.nombre });
      }
      } />
  );



  return (
    <>
      <View style={Styles.container}>
        <Headline style={styles.title}>¿Qué se te antoja hoy?</Headline>
        <FlatList
          numColumns={2}
          horizontal={false}
          data={cards}
          renderItem={renderItem}
        />
      </View>
      <Button labelStyle={{fontSize:7}} onPress={setVisible}>easterEgg</Button>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Image
                source={require("../easterEgg.png")}
                style={{alignSelf:'center'}} />
      </Modal>
    </>
  )


}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 25,
    color: "#7000B6",
    marginBottom: "5%",
    marginTop: "5%",
    backgroundColor: 'orange',

  }
})