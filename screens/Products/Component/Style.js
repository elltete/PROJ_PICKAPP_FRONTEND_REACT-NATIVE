import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 25,
    color: "#292f33",
    marginBottom: "5%",
    marginTop: "5%"
  },
  lightTitle: {
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 25,
    color: "#86394F",
    marginBottom: "5%",
    marginTop: "5%",
    textAlign: "center"
  },
  description: {
    fontSize: 18,
    color: "gray",
    textAlign: "center"

  },
  buttonStyle: {
    width: "90%",

  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  flatListStyle: {
    margin: '2%'
  }
})

export default styles