import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useEffect, useState } from "react";
import { Button } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import AddBalance from "../../../src/components/balance/add_balance";
import BalanceComponent from "../../../src/components/balance/balance";
import PlanCard from "../../../src/components/plan/plan_card";
import { PlanCardEnum } from "../../../src/data/enums";
import Balance from "../../../src/data/models/budget";
import { Plan } from "../../../src/data/models/plan";
import { getBalance } from "../../../src/services/balance";
import { getAllPlans } from "../../../src/services/plans";
import { updateBudget } from "../../../src/store/budget_slice";
import { selectUser } from "../../../src/store/session_slice";
import Metrics from "../../../src/theme/metrics";
import { useRouter } from "expo-router";

function HomeScreen() {
  const [balance, setBalance] = useState<Balance>();
  const [plans, setPlans] = useState<Plan[]>();

  // const { onPress, ...props } = useLinkProps();
  // const linkTo = useLinkTo(); //React navigation with web
  const router = useRouter(); //Expo router

  const [modalProperties, setModalProperties] = useState<{
    visible: boolean;
    mode: "add" | "remove" | null;
  }>({
    visible: false,
    mode: null,
  });

  const dispatch = useDispatch();

  const userSelect = useSelector(selectUser);

  // const isFocused = useIsFocused();
  const uid = userSelect.uid;

  async function handleBalance() {
    if (uid) {
      const balanceResponse = await getBalance(uid);
      setBalance(balanceResponse);
      dispatch(updateBudget({ ...balanceResponse }));
    }
  }

  async function handlePlans() {
    if (uid) {
      const response = await getAllPlans(uid);
      setPlans(response);
    }
  }

  useEffect(() => {
    handleBalance();
  }, []);

  useEffect(() => {
    handlePlans();
  }, []);

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
    // navigation.navigate("AddPlanScreen");
    // linkTo("/addPlan");
    router.push("/plan/add");
  }

  function onPressBudgetDetails() {
    // navigation.navigate("PlanDetailScreen");
    // linkTo("/budgetDetails");
    //
    router.push("/(app)/budget");
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.screen}>
          <BalanceComponent
            total={
              balance?.total != undefined ? balance?.total.toString() : "0"
            }
            onPressModifyBudget={onPressModifyBudget}
            onPressDetail={onPressBudgetDetails}
          />
          {plans != null && plans.length > 0 ? (
            <>
              <PlanCard
                id={plans[0].id}
                currentAmount={plans[0].savings}
                total={plans[0].totalRequired}
                title={plans[0].title}
                category={plans[0].category}
              />
              <View>
                <View style={styles.secondaryContainer}>
                  {plans.length >= 2 &&
                    plans.slice(1).map((plan) => {
                      return (
                        <View style={styles.secondaryCard} key={plan.id}>
                          <PlanCard
                            id={plan.id}
                            currentAmount={plan.savings}
                            total={plan.totalRequired ?? 0}
                            title={plan.title}
                            category={plan.category}
                            type={PlanCardEnum.secondary}
                          />
                        </View>
                      );
                    })}
                </View>
              </View>
            </>
          ) : (
            <View style={styles.errorContainer}>
              <Text> There is not any plan. Just add one!</Text>
            </View>
          )}
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
    justifyContent: "space-evenly",
  },
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryCard: {
    flex: 0.48,
    flexBasis: 1,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
