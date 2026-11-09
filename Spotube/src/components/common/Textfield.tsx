import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type propsType = {
  placeholder: string;
  backgroundColor?: string;
  placeholderTextColor?: string;
};

const Textfield: React.FC<propsType> = ({
  placeholder,
  backgroundColor,
  placeholderTextColor,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.inputBox, backgroundColor && { backgroundColor }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || "lightgray"}
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
