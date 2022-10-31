import AsyncSelect from 'react-select/async';
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { SearchCities } from "../api/Api";
import { CitySelectData } from "../api/Types";
import { StylesConfig } from 'react-select/dist/declarations/src'; "react-select";

type SelectProps = {
  loadOptions: any,
  error?: boolean | null,
  errorMessage?: string | null
}

// Have some of most used cities hardcoded in files.
// this would've prevent sending us an extra request on first load.
const DefaultCityList = [
  { value: 'Paris', label: 'Paris' },
  { value: 'Marseille', label: 'Marseille' },
  { value: 'Lyon', label: 'Lyon' }
];

export function Select(props: SelectProps & UseControllerProps) {
  const [errorPopup, setErrorPopup] = useState<string>("");
  const { field } = useController(props);

  const loadOptions = (inputValue: string, callback: (options: Array<CitySelectData>) => void) => {
    SearchCities(inputValue).then(res => {
      callback(res)
    }).catch(err => {
      // in a production environment this would use something similar to toastr.
      setErrorPopup(err);
      callback([]);
      setTimeout(() => {
        setErrorPopup("");
      }, 2000);
    });
  };

  return (
    <>
      <AsyncSelect
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        loadOptions={loadOptions}
        defaultOptions={DefaultCityList} // maintain option list after first load
        className={props.error ? "react-select-container react-select__error" : "react-select-container"}
        classNamePrefix="react-select"
      />
      {errorPopup && <div className="error-toast"><div className="error-toast-text">{errorPopup}</div></div>}
    </>
  );
}

