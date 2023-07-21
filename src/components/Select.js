import { useMemo, useState } from "react";
import useApi from "../hooks/useApi";

function Select({
  nameOfFetchData,
  name,
  multiple,
  handleChange,
  withLabel,
  withBreaks,
  optionValueIsName,
}) {
  const [data, setData] = useState([]);
  const { data: fetchedData } = useApi("GET", nameOfFetchData);
  useMemo(() => setData(fetchedData), [fetchedData]);

  if (data) {
    return (
      <>
        {withLabel && (
          <label htmlFor={name} className="text">
            {name}:
          </label>
        )}
        {withBreaks && <br />}
        <select
          id={name}
          name={name}
          multiple={multiple}
          onChange={(e) => handleChange(e, name.charAt(0))}
        >
          {!multiple && (
            <option key={0} value={optionValueIsName ? "" : 0}>
              all {name}
            </option>
          )}
          {data.map((one) => {
            const { id, name } = one;
            return (
              <option key={id} value={optionValueIsName ? name : id}>
                {name}
              </option>
            );
          })}
        </select>
      </>
    );
  }
}

export default Select;
