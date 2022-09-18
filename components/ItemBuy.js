import { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { BuyContext } from '../context/BuyContext';

const ItemBuy = ({ product }) => {
  const context = useContext(BuyContext);

  const deleteItem = (arr, item) => {
    let arrResult = []
    let deleted = false
    arr.forEach(element => {
      if (element.id !== item.id || deleted) {
        arrResult.push(element)
      } else {
        deleted = true
      }
    });
    return arrResult
  }

  const handleDeleteItem = () => {
    context.setBuys(prev => deleteItem(prev, product))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {product.nombre}
      </Text>
      <Text >
        Precio: ${product.precio}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
        <AntDesign name="delete" size={24} color={'red'} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: "3%",
    margin: "2%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  title: {
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 15,
    marginBottom: "5%"
  },
  button: {
    alignItems: "flex-end",
    top: "-55%",
    paddingRight: "5%"
  }
});

export default ItemBuy