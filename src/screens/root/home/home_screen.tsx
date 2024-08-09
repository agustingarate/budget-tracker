import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import PlanCard from "../../../components/plan/plan_card";
import { PlanCardEnum } from "../../../data/enums";
import Metrics from "../../../theme/metrics";
import { useEffect, useState } from "react";
import AddBalance from "../../../components/balance/add_balance";
import { Button } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeTabScreenProps } from "../../../navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { clearSession, selectUser } from "../../../store/session_slice";
import { getBalance } from "../../../services/balance";
import Balance from "../../../data/models/budget";
import BalanceComponent from "../../../components/balance/balance";
import { useIsFocused } from "@react-navigation/native";
import { updateBudget } from "../../../store/budget_slice";

function HomeScreen({ navigation, route }: HomeTabScreenProps<"HomeScreen">) {
  const [balance, setBalance] = useState<Balance>();
  const [modalProperties, setModalProperties] = useState<{
    visible: boolean;
    mode: "add" | "remove" | null;
  }>({
    visible: false,
    mode: null,
  });

  const dispatch = useDispatch();
  const userSelect = useSelector(selectUser);
  const budgetDispatch = useDispatch();
  const isFocused = useIsFocused();

  async function handleBalance() {
    const uid = userSelect.uid;
    if (uid) {
      const response = await getBalance(uid);
      console.log("BALANCE RESPONSE", response);
      setBalance(response);
      budgetDispatch(updateBudget({ ...response }));
    }
  }

  useEffect(() => {
    isFocused && handleBalance();
  }, [isFocused]);

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
    handleBalance();
  }

  function createNewPlanHandler() {
    navigation.navigate("AddPlanScreen");
  }
  function onCloseSession() {
    dispatch(clearSession());
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.screen}>
          <Pressable onPress={onCloseSession}>
            <Text>Close session</Text>
          </Pressable>
          <BalanceComponent
            total={
              balance?.total != undefined ? balance?.total.toString() : "0"
            }
            onPressModifyBudget={onPressModifyBudget}
          />
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
      <View style={styles.floatingActionButtonContainer}>
        <Button
          buttonStyle={styles.floatingActionButton}
          radius={90}
          onPress={createNewPlanHandler}
        >
          <Ionicons color={"#fff"} size={22} name="create-outline" />
        </Button>
      </View>

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
  floatingActionButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  floatingActionButton: {
    width: 55,
    height: 55,
    backgroundColor: "#161616",
    opacity: 0.92,
  },
});

export default HomeScreen;
