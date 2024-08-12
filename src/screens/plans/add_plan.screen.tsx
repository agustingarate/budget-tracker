import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";
import { addPlan } from "../../services/plans";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/session_slice";
import { Plan } from "../../data/models/plan";

function AddPlanScreen({}) {
  const items: ItemType<string>[] = [
    { label: "Vacation", value: "vacation" },
    { label: "Social", value: "social" },
    { label: "Work", value: "work" },
    { label: "Family", value: "family" },
  ];

  const userSelect = useSelector(selectUser);

  const [loading, setLoading] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [categoryPickerIsOpen, setCategoryPickerIsOpen] =
    useState<boolean>(false);

  const [deadline, setDeadline] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [percentage, setPercentage] = useState<string>();
  const [categoryPickerValue, setCategoryPickerValue] =
    useState<ValueType | null>(null);

  function handleDatePicker(show: boolean) {
    setShowDatePicker(show);
  }

  function onChangeDatePicker(event: DateTimePickerEvent, date?: Date) {
    setShowDatePicker(false);
    date && setDeadline(date);
  }

  async function onAcceptHandler() {
    setLoading(true);
    const uid = userSelect.uid;
    try {
      if (uid) {
        await addPlan(
          uid,
          new Plan(
            title!,
            parseFloat(amount!),
            parseFloat(percentage!),
            categoryPickerValue?.toString()!,
            deadline,
          ),
        );
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <View style={styles.screen}>
      <View style={{ padding: 20 }}>
        <Text></Text>
        <Input
          inputStyle={styles.input}
          placeholder="Trip to Waduk Cengklik"
          onChangeText={setTitle}
        />
        <Input
          inputStyle={styles.input}
          label="Enter amount"
          onChangeText={setAmount}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Input
              inputStyle={styles.input}
              label="Enter percentage"
              onChangeText={setPercentage}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center" }}> of $3456 available</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Plan details</Text>
        <View>
          <Text style={styles.detailsSubtitle}>Category</Text>
          <DropDownPicker
            open={categoryPickerIsOpen}
            value={categoryPickerValue}
            items={items}
            setOpen={setCategoryPickerIsOpen}
            setValue={setCategoryPickerValue}
            style={{
              borderWidth: 0,
              borderRadius: 20,
            }}
          />
        </View>
        <View>
          <Text style={styles.detailsSubtitle}>Budget deadline</Text>
          <TouchableOpacity onPress={() => handleDatePicker(true)}>
            <Input
              value={deadline.toLocaleDateString()}
              editable={false}
              style={styles.input}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              containerStyle={{ paddingHorizontal: 0 }}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <RNDateTimePicker value={deadline} onChange={onChangeDatePicker} />
          )}
        </View>
        <Button
          buttonStyle={styles.button}
          titleProps={{}}
          titleStyle={{ color: "#f9fffd" }}
          radius="xl"
          title="Accept"
          loading={loading}
          onPress={onAcceptHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  detailsContainer: {
    backgroundColor: "#f3f2ee",
    padding: 20,
    minHeight: "50%",
    justifyContent: "space-evenly",
    borderTopRightRadius: 25,
    borderTopStartRadius: 25,
  },
  detailsTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
  },
  detailsSubtitle: {
    fontFamily: "Nunito-Medium",
    marginBottom: 8,
    fontSize: 15,
  },
  input: {
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 15,
  },
  button: {
    paddingHorizontal: 23,
    backgroundColor: "#141414",
  },
});

export default AddPlanScreen;
