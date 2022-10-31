import React from "react";

type InputProps = {
    label: string,
    name: string,
    formProps: any,
    errors: any,
    type: string,
    defaultValue?: any
}

function Input({ label, name, formProps, type, errors, defaultValue }: InputProps) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input className={errors ? "field-error" : ""} type={type} {...formProps} defaultValue={defaultValue} />
        </>
    );
}

export default Input 