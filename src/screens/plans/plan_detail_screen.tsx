import { View, Text, FlatList, StyleSheet } from "react-native";
import { Transaction } from "../../data/models/budget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TransactionType } from "../../data/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBudget } from "../../store/budget_slice";

function PlanDetailScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>();

  const budgetSelector = useSelector(selectBudget);

  async function getTransactions() {
    setTransactions(budgetSelector.transactions);
  }

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <FlatList
      data={transactions}
      renderItem={({ item, index }) => (
        <TransactionItem {...item} index={index} />
      )}
      keyExtractor={(item, index) => item.id ?? index.toString()}
    />
  );
}

type TransactionItemType = {
  description: string;
  amount: number;
  type: TransactionType;
  index: number;
};

function TransactionItem({
  description,
  amount,
  type,
  index,
}: TransactionItemType) {
  const iconName =
    type == "expense" ? "trending-down-outline" : "trending-up-outline";
  const iconColor = type == "expense" ? "#ff3f3f" : "#80e63c";
  const backgroundColor = index % 2 ? "#fff" : "#eaeaea";

  return (
    <View
      style={[styles.transactionCard, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} color={iconColor} size={20} />
      </View>
      <Text style={styles.description}>{description}</Text>
      <View>
        <Text style={styles.amountText}>${amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-around",

    padding: 13,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  description: {
    marginHorizontal: 13,
    flex: 0.7,
    fontFamily: "Nunito-Light",
  },
  iconContainer: {
    backgroundColor: "#2b2b2b",
    padding: 4,
    borderRadius: 5,
  },
  amountText: {
    fontFamily: "Nunito-Bold",
  },
});

export default PlanDetailScreen;
