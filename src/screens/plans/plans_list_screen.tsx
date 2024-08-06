import { View, Text, StyleSheet } from "react-native";
import PlanCard from "../../components/plan/plan_card";
import { PlanCardEnum } from "../../data/enums";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

function PlansListScreen() {
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 8];
  return (
    <GestureHandlerRootView>
      <View>
        <FlatList
          data={dummyData}
          renderItem={() => (
            <View style={styles.itemWrapper}>
              <PlanCard type={PlanCardEnum.list} />
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
