import { useTheme } from "@/contexts/themeContext";
import DateTimePicker from "@react-native-community/datetimepicker";

function DatePicker() {
  const { currentThemeObject, isLightTheme } = useTheme();

  return (
    <DateTimePicker
      mode="date"
      display="default"
      value={new Date()}
      themeVariant={isLightTheme ? "light" : "dark"}
    />
  );
}

export default DatePicker;
