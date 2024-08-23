import { View, Text, StyleSheet, ScrollView } from "react-native";
import PlanCard from "../../../components/plan/plan_card";
import { PlanCardEnum } from "../../../data/enums";
import Metrics from "../../../theme/metrics";
import { useEffect, useState } from "react";
import AddBalance from "../../../components/balance/add_balance";
import { Button } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeTabScreenProps } from "../../../navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/session_slice";
import { getBalance } from "../../../services/balance";
import Balance from "../../../data/models/budget";
import BalanceComponent from "../../../components/balance/balance";
import { useIsFocused, useLinkTo } from "@react-navigation/native";
import { updateBudget } from "../../../store/budget_slice";
import { getAllPlans } from "../../../services/plans";
import { Plan } from "../../../data/models/plan";

function HomeScreen({ navigation }: HomeTabScreenProps<"Home">) {
  const [balance, setBalance] = useState<Balance>();
  const [plans, setPlans] = useState<Plan[]>();

  const linkTo = useLinkTo();

  const [modalProperties, setModalProperties] = useState<{
    visible: boolean;
    mode: "add" | "remove" | null;
  }>({
    visible: false,
    mode: null,
  });

  const dispatch = useDispatch();

  const userSelect = useSelector(selectUser);

  const isFocused = useIsFocused();
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
    if (isFocused && uid) {
      handleBalance();
    }
  }, []);

  useEffect(() => {
    if (isFocused && uid) {
      handlePlans();
    }
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
    linkTo("/addPlan");
  }

  function onPressBudgetDetails() {
    // navigation.navigate("PlanDetailScreen");
    linkTo("/budgetDetails");
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
