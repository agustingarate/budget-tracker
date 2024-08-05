import { View, Text, StyleSheet } from "react-native";
import Balance from "../../../components/home/balance";

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Balance />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    paddingTop: 50,
  },
});
export default HomeScreen;
