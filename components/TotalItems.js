import { useContext } from 'react'
import { BuyContext } from '../context/BuyContext';
import { StyleSheet, Text } from "react-native";
const TotalItems = () => {
  const context = useContext(BuyContext);
  return (
    <>
      <Text style={styles.title}>
        Total: ${context.buys.reduce((a, b) => a + (b["precio"] || 0), 0)}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 25,
    color: "#ED4202"
  },
});


export default TotalItems