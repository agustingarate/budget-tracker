import { View, Text } from "react-native";
import { RootStackScreenProps } from "../../navigation/types";
import { useLayoutEffect, useState } from "react";
import { Plan } from "../../data/models/plan";
import { getPlan } from "../../services/plans";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/session_slice";

function PlanDetailScreen({ route }: RootStackScreenProps<"PlanDetail">) {
  const id = route.params.id;
  const [plan, setPlan] = useState<Plan>();
  const userSelector = useSelector(selectUser);
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
