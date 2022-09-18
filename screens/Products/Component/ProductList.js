import React, { useState, useEffect } from "react"
import { Text, View } from "react-native"
import CardItem from "../../../components/CardItem"
import Styles from "./Style"
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_API } from "../../../constants"
export default function ProductList({ cat }) {

  const [data, setData] = useState([])
  const renderItem = ({ item }) => (
    <CardItem
      id={item.id}
      nombre={item.nombre.charAt(0).toUpperCase() + item.nombre.slice(1)}
      img={item.imagen}
      precio={item.precio}
      desc={item.descripcion}
      key={item.id}
    />
  );

  useEffect(() => {
    AsyncStorage.getItem('@token').then(token => {
      // fetch(`${HOST_API}/api/products/Category/${cat}`,
      fetch(HOST_API + "/api/products/Category/" + cat,
        {
          headers: {
            'Authorization': token
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setData(json)
        })
        .catch((error) => {
          console.error(error);
        });
    })

  }, [])
  return (
    <View>
      {/* <Text style={Styles.lightTitle}>{(cat + "s").toUpperCase()}</Text> */}

      <FlatList
        numColumns={1}
        horizontal={false}
        data={data}
        renderItem={renderItem}
        style={Styles.flatListStyle}
      />
    </View>
  )
}