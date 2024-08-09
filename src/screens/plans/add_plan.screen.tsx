import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";

function AddPlanScreen({}) {
  const items: ItemType<string>[] = [
    { label: "Vacation", value: "vacation" },
    { label: "Social", value: "social" },
    { label: "Work", value: "work" },
    { label: "Family", value: "family" },
  ];
  const [categoryPickerIsOpen, setCategoryPickerIsOpen] =
    useState<boolean>(false);
  const [categoryPickerValue, setCategoryPickerValue] =
    useState<ValueType | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<Date>(new Date());

  function handleDatePicker(show: boolean) {
    setShowDatePicker(show);
  }

  function onChangeDatePicker(event: DateTimePickerEvent, date?: Date) {
    setShowDatePicker(false);
    date && setDeadline(date);
  }

  return (
    <View style={styles.screen}>
      <View style={{ padding: 20 }}>
        <Text></Text>
        <Input inputStyle={styles.input} placeholder="Trip to Waduk Cengklik" />
        <Input inputStyle={styles.input} label="Enter amount" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Input inputStyle={styles.input} label="Enter percentage" />
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
});

export default AddPlanScreen;
