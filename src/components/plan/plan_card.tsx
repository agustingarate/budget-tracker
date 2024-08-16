import { View, Text, StyleSheet, Pressable } from "react-native";
import { PlanCardEnum } from "../../data/enums";
import CircularProgress from "react-native-circular-progress-indicator";
import Metrics from "../../theme/metrics";
import { LinearProgress } from "@rneui/themed/dist/LinearProgress";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

type PlanCardProps = {
  type?: PlanCardEnum | null;
  title: string;
  category: string;
  currentAmount: number;
  total: number;
  id?: string;
};

function PlanCard({
  id,
  type = PlanCardEnum.main,
  title,
  category,
  currentAmount,
  total,
}: PlanCardProps) {
  const [savingsProgress, setSavingProgress] = useState<number>();
  useEffect(() => {
    let savingsProgress =
      currentAmount <= total ? Math.round((currentAmount / total) * 100) : 100;
    setSavingProgress(savingsProgress);
  }, []);

  const linkTo = useLinkTo();

  function onTap() {
    linkTo(`/planDetails/${id}`);
  }
  function ProgressWidget() {
    switch (type!) {
      case PlanCardEnum.secondary:
        return (
          <View style={{ paddingTop: 30 }}>
            <Text>{savingsProgress}%</Text>
            <LinearProgress
              style={{ marginVertical: 10 }}
              value={savingsProgress! / 100}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>${currentAmount}</Text>
              <Text>${total}</Text>
            </View>
          </View>
        );

      default:
        return (
          <CircularProgress
            value={savingsProgress ?? 0}
            maxValue={100}
            radius={13 * Metrics.SCALE}
            valueSuffix="%"
            inActiveStrokeWidth={5}
            activeStrokeWidth={7}
            activeStrokeColor="#65cba9"
            progressValueColor="#2a2a2a"
          />
        );
    }
  }
  function Description() {
    return (
      <View
        style={[
          styles.textContainer,
          { flex: type == PlanCardEnum.main ? 0.9 : undefined },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        {currentAmount <= total ? (
          <Text style={styles.subtitle}>
            left ${currentAmount} of ${total}
          </Text>
        ) : (
          <Text>Done! You reach the goal of ${total}</Text>
        )}
      </View>
    );
  }

  function Category() {
    return (
      <Text
        style={{
          marginBottom: 5,
          textAlign: type == PlanCardEnum.main ? "left" : "right",
          color: "#4126a1",
        }}
      >
        {"#" + category}
      </Text>
    );
  }
  return (
    <Pressable onPress={onTap}>
      <View
        style={[
          styles.card,
          {
            flexDirection: type != PlanCardEnum.secondary ? "row" : "column",
            backgroundColor: "#fff",
            justifyContent:
              type == PlanCardEnum.list ? "space-evenly" : "space-between",
          },
        ]}
      >
        {type == PlanCardEnum.secondary ? <Category /> : null}

        {type == PlanCardEnum.secondary ? <Description /> : null}
        <View>
          {type != PlanCardEnum.secondary ? <Category /> : null}
          <ProgressWidget />
        </View>
        {type != PlanCardEnum.secondary ? <Description /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
  },
  textContainer: {
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito-Bold",
  },
  subtitle: {
    fontSize: 15,
    color: "#8d8d8d",
    fontFamily: "Nunito-Light",
  },
});

export default PlanCard;
