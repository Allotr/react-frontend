import React, { useEffect } from "react";
import { ApiCaller } from "../utils/api-caller";
import Counter from "./Counter";

function CounterParent(props: any) {
    const [value, setValue] = React.useState(props.value);
    useEffect(() => {
        // Init call
        ApiCaller.getInstance().doSubscribe<any>(newValue => {
            setValue(""); // To force change values
            setValue(newValue.data.newUpdate.result)
        });
    }, [])

    return (
        <Counter value={value}></Counter>
    );
}

export default CounterParent;