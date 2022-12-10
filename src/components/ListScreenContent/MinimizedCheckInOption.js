import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import { FaCalendarAlt } from "react-icons/fa";
import { GetResourceByValue, GetSettingByValue } from "../DynamicSelectors";
import { useEffect } from "react";
import store from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setGeneralDate } from "../../redux/dateSlice";

const CheckInOption = (props) => {
  const [inputValue, setInputValue] = useState("- / - / -");
  const [dateTimePickerIsOpen, setDateTimePickerIsOpen] = useState();

  const dispatch = useDispatch();
  const generalDate = useSelector((state) => {
    return state.date.generalDate;
  });

  useEffect(() => {
    const generalDate = store.getState().date.generalDate;
    if (generalDate.start == null) {
      const startDate = new Date();
      const endDate = new Date();

      endDate.setDate(endDate.getDate() + 1);
      setInputValue({ start: startDate, end: endDate });
      return;
    }
    setInputValue(generalDate);
  }, [generalDate]);
  function dateTimePickerClick() {
    setDateTimePickerIsOpen(true);
  }
  function dateTimePickerSelect(value) {
    setInputValue({ start: value[0], end: value[1] });
    setDateTimePickerIsOpen(false);
  }
  return (
    <div className="" onClick={dateTimePickerClick} htmlFor="test">
      <div className="d-flex w-100 flex-column justify-content-center pe-2">
        <DateRangePicker
          defaultOpen={dateTimePickerIsOpen}
          onChange={(value) => dateTimePickerSelect(value)}
          size="sm"
          appearance="subtle"
          cleanable={false}
          defaultValue={[new Date(), new Date()]}
          name="test"
          value={[inputValue.start, inputValue.end]}
        ></DateRangePicker>
      </div>
    </div>
  );
};

export default CheckInOption;
