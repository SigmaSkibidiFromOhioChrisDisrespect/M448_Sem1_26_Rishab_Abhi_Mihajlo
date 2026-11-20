import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  backgroundColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
};

const Textfield: React.FC<Props> = ({
  placeholder,
  backgroundColor,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.inputBox, backgroundColor && { backgroundColor }]}
        placeholder={placeholder}
        placeholderTextColor="black"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
    </View>
  );
};

export default Textfield;

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "white",
  },
});
