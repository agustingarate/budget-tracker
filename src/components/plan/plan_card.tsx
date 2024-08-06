import { View, Text, StyleSheet } from "react-native";
import { PlanCardEnum } from "../../data/enums";
import CircularProgress from "react-native-circular-progress-indicator";
import Metrics from "../../theme/metrics";
import { LinearProgress } from "@rneui/themed/dist/LinearProgress";
import { useNavigation } from "@react-navigation/native";

type PlanCardProps = {
  type?: PlanCardEnum | null;
};

function PlanCard({ type = PlanCardEnum.main }: PlanCardProps) {
  function ProgressWidget() {
    switch (type!) {
      case PlanCardEnum.secondary:
        return (
          <View style={{ paddingTop: 30 }}>
            <Text>{(992 / 2500) * 100}%</Text>
            <LinearProgress style={{ marginVertical: 10 }} value={992 / 2500} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>$992</Text>
              <Text>$2500</Text>
            </View>
          </View>
        );

      default:
        return (
          <CircularProgress
            value={(992 / 2500) * 100}
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
        <Text style={styles.title}>Budget to trip</Text>
        <Text style={styles.subtitle}>left $992 of $2500</Text>
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
        #Traveling
      </Text>
    );
  }
  return (
    <View>
      <View
        style={[
          styles.card,
          {
            flexDirection: type != PlanCardEnum.secondary ? "row" : "column",
            backgroundColor: type == PlanCardEnum.list ? "#f9ffe8" : "white",
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
    </View>
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
