import Textfield from "@/components/common/Textfield";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <Textfield placeholder="Search..." backgroundColor="#1D1D27"></Textfield>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
