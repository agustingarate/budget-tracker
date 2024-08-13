import { View, Text, StyleSheet, Image } from "react-native";
import { ImagesAssets } from "../../../assets/images/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BTButton, BTCircleButton } from "../globals/button";

type BalanceProps = {
  onPressModifyBudget: (mode: "add" | "remove") => void;
  onPressDetail: () => void;
  total: string;
};

function BalanceComponent({
  onPressModifyBudget,
  onPressDetail,
  total,
}: BalanceProps) {
  function onPressModifyBudgetHandler(mode: "add" | "remove") {
    onPressModifyBudget(mode);
  }

  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subtitle}>
              <Text>Budget balance</Text>
            </Text>
            <Ionicons name="trending-up-outline" size={20} color={"#0acd00"} />
          </View>

          <Text style={styles.budgetText}>{"$" + total}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <BTCircleButton
            backgroundColor="#eeeeee"
            iconName="add"
            onPress={() => onPressModifyBudgetHandler("add")}
          />
          <BTCircleButton
            backgroundColor="#ffe4d6"
            iconName="remove"
            onPress={() => onPressModifyBudgetHandler("remove")}
          />
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Image style={styles.avatar} source={ImagesAssets.avatar} />

        <BTButton text="Details" onPress={onPressDetail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightColumn: {
    alignItems: "center",
  },
  leftColumn: {
    justifyContent: "space-between",
  },
  budgetText: {
    fontSize: 30,
    fontFamily: "Nunito-Bold",
  },
  subtitle: {
    fontSize: 17,
    color: "#8d8d8d",
    fontFamily: "Nunito-Light",
    paddingBottom: 5,
    paddingRight: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    marginBottom: 25,
  },
  button: {
    paddingHorizontal: 23,
    backgroundColor: "#0cdc8c",
  },
});

export default BalanceComponent;
