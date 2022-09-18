import React from "react"
import {Text} from 'react-native'
import ProductList from "./Component/ProductList"

const cards = [
    { key: 1, titulo: "Comidas", nombre: "comida", img: 'https://static6.depositphotos.com/1062035/614/i/950/depositphotos_6147091-stock-photo-duck-fillet.jpg' },
    { key: 2, titulo: "Bebidas", nombre: "bebida", img: 'https://static8.depositphotos.com/1020618/980/i/950/depositphotos_9805131-stock-photo-glass-of-cola.jpg' },
    { key: 3, titulo: "Postres", nombre: "postre", img: 'https://st.depositphotos.com/1000504/1355/i/950/depositphotos_13557456-stock-photo-strawberry-cheese-cake.jpg'},
    { key: 4, titulo: "Snacks", nombre: "snack", img: 'https://st3.depositphotos.com/10614052/33145/i/450/depositphotos_331454586-stock-photo-tasty-potato-chips-on-white.jpg'}
  ]
export default function ProductScreen(cat) {
    let category = cat.route.params.cat;
  return (
    <ProductList cat={category} />
  )
}
export {cards, ProductScreen};