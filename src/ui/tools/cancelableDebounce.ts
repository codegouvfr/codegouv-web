import { useState, useEffect } from "react";

type Props = {
    value: string | string [] | number | number []
    delay: number
}

export const useDebounce = (props: Props) => {
    const { value, delay } = props
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timeoutID);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
