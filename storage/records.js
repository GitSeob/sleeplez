//reducer에서 사용
import { AsyncStorage } from "react-native";
export const RECORD_KEY = "records";

async function write(key, item) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("AsyncStorage error: ", error.message);
  }
}

export const writeRecords = records => {
  return write(RECORD_KEY, records);
};
