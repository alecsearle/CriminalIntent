import { useTheme } from "@/contexts/themeContext";
import DateTimePicker from "@react-native-community/datetimepicker";

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

function DatePicker({ value, onChange }: DatePickerProps) {
  const { currentThemeObject, isLightTheme } = useTheme();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <DateTimePicker
      mode="date"
      display="default"
      value={value}
      onChange={handleDateChange}
      themeVariant={isLightTheme ? "light" : "dark"}
    />
  );
}

export default DatePicker;
