import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import PlanCard from "../../../src/components/plan/plan_card";
import { PlanCardEnum } from "../../../src/data/enums";
import { Plan } from "../../../src/data/models/plan";
import { getAllPlans } from "../../../src/services/plans";
import { selectUser } from "../../../src/store/session_slice";

function PlansListScreen() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const userSelector = useSelector(selectUser);
  const uid = userSelector.uid;
  useEffect(() => {
    async function getPlans() {
      if (uid) {
        setPlans((await getAllPlans(uid))!);
      }
    }
    getPlans();
  }, []);
  return (
    <GestureHandlerRootView>
      <View>
        <FlatList
          data={plans}
          renderItem={(plan) => (
            <View style={styles.itemWrapper}>
              <PlanCard
                title={plan.item.title}
                category={plan.item.category}
                type={PlanCardEnum.list}
                currentAmount={plan.item.savings}
                total={plan.item.totalRequired}
                id={plan.item.id}
              />
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    margin: 10,
  },
});

export default PlansListScreen;
