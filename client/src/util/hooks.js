import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    
    const [values, setValues] = useState(initialState);
    const onCheckChange = (event) => {
        setValues({
            ...values,
            isAdmin: event.target.checked
        });
    };
    const onChange = (event) => {
        setValues({ 
            ...values, 
            [event.target.name]: event.target.value 
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        callback();
    };

    return {
        onCheckChange,
        onChange,
        onSubmit,
        values
    }
}