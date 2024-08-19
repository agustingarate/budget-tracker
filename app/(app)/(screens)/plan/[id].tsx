import { View, Text } from "react-native";
import { useLayoutEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useLocalSearchParams } from "expo-router";
import { Plan } from "../../../../src/data/models/plan";
import { getPlan } from "../../../../src/services/plans";
import { selectUser } from "../../../../src/store/session_slice";

function PlanDetailScreen() {
  const [plan, setPlan] = useState<Plan>();
  const userSelector = useSelector(selectUser);
  const { id } = useLocalSearchParams<{ id: string }>();
  const uid = userSelector.uid;

  async function handleGetPlan() {
    if (uid) {
      const response = await getPlan(uid, id);
      setPlan(response);
    }
  }
  useLayoutEffect(() => {
    handleGetPlan();
  }, []);

  return (
    <View>
      <Text>{plan?.title}</Text>
    </View>
  );
}

export default PlanDetailScreen;
