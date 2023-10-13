import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";

const DEFAULT_VALUE = [
  dayjs(new Date()).set("date", 1).toDate(),
  dayjs(new Date()).add(7, "day").toDate(),
];

const DatePickerComponent = ({ onChange, value = DEFAULT_VALUE }) => {
  return (
    <>
      <DatePickerInput
        icon={<IconCalendar size="1.1rem" stroke={1.5} />}
        type="range"
        numberOfColumns={2}
        popoverProps={{
          shadow: "xl",
          withArrow: true,
          arrowPosition:'center',
          arrowSize: 12,
        }}
        // label="Select date"
        locale=""
        placeholder="Select dates"
        value={value}
        onChange={onChange}
        ml="auto"
        maw={315}
      />
    </>
  );
};

export default DatePickerComponent;
