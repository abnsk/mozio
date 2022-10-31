import { Fragment, useEffect } from "react";
import { useForm, useFieldArray, FieldValues, FieldError } from "react-hook-form";
import { SearchCities } from '../api/Api';
import { Select } from '../components/AsyncSelect';
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from '../components/Input';

interface IDefaultValues {
    cityIntermediate: Array<any> | null;
    passengerCount: string | number,
    tripDate: Date | string
}

type FieldArrayData = {
    data: FieldError
}


const getDate = (date: any) => {
    let _d = new Date(date);
    if (isNaN(_d.getDay()))
        _d = new Date();

    return `${_d.getFullYear()}-${_d.getMonth() + 1}-${_d.getDate()}`
}

function SearchView() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cityListParams = searchParams.get("route");
    const cityList = cityListParams?.split(",");


    console.log(
        getDate(searchParams.get("date"))
    );

    const defaultValues: IDefaultValues = {
        cityIntermediate: [{}, {}], // by default show 2 inputs for origin and destination
        passengerCount: searchParams.get("passenger") || 0,
        tripDate: getDate(searchParams.get("date"))
    };

    if (cityList && cityList?.length > 0) {
        defaultValues.cityIntermediate = cityList.map(city => { return { data: { value: city, label: city } } })
        if (cityList.length == 1) { // if there is only a origin city passed as a parameter add destination input
            defaultValues.cityIntermediate.push({});
        }
    }

    const { watch, register, handleSubmit, control, formState: { errors } } = useForm<FieldValues>({ defaultValues: defaultValues });
    const { fields, insert, remove } = useFieldArray({ control, name: "cityIntermediate" });

    const onSubmit = (data: any) => {
        const userRoute: Array<string> = data.cityIntermediate.map((city: { data: { value: string; }; }) => city.data.value);
        navigate("/result?route=" + userRoute.join(",") + "&date=" + data.tripDate + "&passengers=" + data.passengerCount);
    };


    const getTitle = (index: number, length: number) => {
        if (index == 0)
            return "City of Origin"
        else if (index == length - 1 && length > 1)
            return "City of Destination"
        else
            return `Stop #${index}`
    }

    const isDeletable = (index: number, length: number) => {
        if (index == 0 || (index == length - 1))
            return false
        else
            return true
    }

    return (
        <div className="searchForm">
            <h1>Trip Distance Calculator</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Basic Info</h2>
                <div className="tripPlanner__basics">
                    <div className='formElement'>
                        <Input
                            name="tripDate"
                            label="Date of Trip"
                            errors={errors.tripDate}
                            formProps={{
                                ...register("tripDate", {
                                    validate: (val) => {
                                        return new Date(val) > new Date()
                                    }
                                })
                            }}
                            defaultValue={watch("tripDate")}
                            type="date" />
                        <span className="errorMessage">{errors?.tripDate && "Trip date must be after today."}</span>
                    </div>
                    <div className="formElement">
                        <Input
                            name="passengerCount"
                            label="Number of Passengers"
                            errors={errors.passengerCount}
                            formProps={{ ...register("passengerCount", { min: 1, required: true }) }}
                            type="number" />
                        <span className="errorMessage">{errors?.passengerCount && "Passenger count should be at least 1."}</span>
                    </div>
                </div>

                <h2>Destinations</h2>
                <ul className="cityList">
                    {fields.map((item, index) => {
                        const fieldArrayErrorList = errors && errors.cityIntermediate && (errors.cityIntermediate as unknown as Array<FieldArrayData>)

                        return (
                            <Fragment key={item.id}>
                                <li className="formElement">
                                    <label>{getTitle(index, fields.length)}</label>
                                    <div className="formElement--select">
                                        <Select
                                            name={`cityIntermediate.${index}.data`}
                                            control={control}
                                            rules={{ required: { value: true, message: "This field is required" } }}
                                            loadOptions={SearchCities}
                                            error={!!(fieldArrayErrorList && fieldArrayErrorList[index])}
                                            errorMessage={fieldArrayErrorList && fieldArrayErrorList[index]?.data?.message}
                                        />
                                        {
                                            isDeletable(index, fields.length) &&
                                            <button type="button" onClick={() => remove(index)}>x</button>
                                        }
                                    </div>
                                </li>
                                {
                                    index == fields.length - 2 &&
                                    <button type="button" className="cityList--addMore" onClick={() => insert(fields.length - 1, {})}>+</button>
                                }
                            </Fragment>

                        )
                    })}
                </ul>

                <input disabled={Object.keys(errors).length > 0} className="btn-blue" type="submit" />

            </form>
        </div>
    )
}

export default SearchView
