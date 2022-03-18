import { useEffect } from "react";
import { useState } from "react";
export const useDebounce = (value: string) => {
    const [debounce, setDebounce] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounce(value);
        }, 500);

        return () => clearTimeout(timeout);
    }, [value]);

    return { debounce };
};
