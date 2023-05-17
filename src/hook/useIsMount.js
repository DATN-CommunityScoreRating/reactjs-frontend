import {useEffect, useRef} from "react";

export const useIsMount = () => {
    const isMount = useRef(true);
    useEffect(() => {
        isMount.current = false
    }, [])

    return isMount.current;
}