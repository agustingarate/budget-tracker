import { View, Text, StyleSheet } from "react-native";
import PlanCard from "../../components/plan/plan_card";
import { PlanCardEnum } from "../../data/enums";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Plan } from "../../data/models/plan";
import { getAllPlans } from "../../services/plans";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/session_slice";

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
