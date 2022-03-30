import { Input, Select, DatePicker } from "antd";
import { FILTER_ENUMS, DATE_FIELDS } from "../constants";

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

const GridFilter = ({ col, onChange, value, disabledSearch }) => {
  if (FILTER_ENUMS[col.dataIndex]) {
    const options = FILTER_ENUMS[col.dataIndex].map(key => (
      <Option value={key} key={key}>
        {key}
      </Option>
    ));

    return (
      <Select
        value={value}
        onChange={value => onChange({ name: col.dataIndex, value })}
        allowClear
        style={{ width: 120 }}
      >
        {options}
      </Select>
    );
  }

  if (DATE_FIELDS[col.dataIndex]) {
    return (
      <RangePicker
        value={value}
        allowClear
        onChange={value => onChange({ name: col.dataIndex, value })}
      />
    );
  }

  const onInputChange = (name, value) => {
    if (name === "cardAccount") {
      if (value.match(/^[0-9]+$/) || !value) {
        onChange({ name, value });
      }
    } else if (name === "amount") {
      if (value.match(/^\d+\.?\,?\d*?$/g) || !value) {
        onChange({ name, value });
      }
    } else onChange({ name, value });
  };

  return (
    <Search
      value={value}
      onChange={({ target: { value } }) => onInputChange(col.dataIndex, value)}
      disabled={disabledSearch && disabledSearch[col.dataIndex]}
      allowClear
    />
  );
};

export default GridFilter;
