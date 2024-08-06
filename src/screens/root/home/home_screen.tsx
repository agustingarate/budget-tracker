import { View, Text, StyleSheet, ScrollView } from "react-native";
import Balance from "../../../components/balance/balance";
import PlanCard from "../../../components/plan/plan_card";
import { PlanCardEnum } from "../../../data/enums";
import Metrics from "../../../theme/metrics";
import { useState } from "react";
import AddBalance from "../../../components/balance/add_balance";

function HomeScreen() {
  // const [balance, setBalance] = useState<number>(1340);
  const [modalProperties, setModalProperties] = useState<{
    visible: boolean;
    mode: "add" | "remove" | null;
  }>({
    visible: false,
    mode: null,
  });

  // function onRemoveIncome(amount: number) {
  //   setBalance((oldBalance) => oldBalance - amount);
  // }
  // function onAddIncome(amount: number) {
  //   setBalance((oldBalance) => oldBalance + amount);
  // }

  function onPressModifyBudget(mode: "add" | "remove") {
    switch (mode) {
      case "add":
        setModalProperties({
          visible: true,
          mode: "add",
        });
        break;

      case "remove":
        setModalProperties({
          visible: true,
          mode: "remove",
        });
        break;
    }
  }

  function onCloseModalHandler() {
    setModalProperties({
      visible: false,
      mode: null,
    });
  }
  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.screen}>
          <Balance onPressModifyBudget={onPressModifyBudget} />
          <PlanCard />

          <View style={styles.secondaryContainer}>
            <View style={styles.secondaryCard}>
              <PlanCard type={PlanCardEnum.secondary} />
            </View>

            <View style={styles.secondaryCard}>
              <PlanCard type={PlanCardEnum.secondary} />
            </View>
          </View>
        </View>
      </ScrollView>
      <AddBalance
        visible={modalProperties.visible}
        mode={modalProperties.mode ?? "add"}
        onDismiss={onCloseModalHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {},
  screen: {
    padding: 20,
    paddingTop: 50,
    height: Metrics.SCREEN_HEIGHT,
    justifyContent: "space-between",
  },
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryCard: {
    flex: 0.48,
  },
});

export default HomeScreen;
function setState<T>(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
