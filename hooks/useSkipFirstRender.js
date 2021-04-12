import { useRef, useEffect } from "react";

/**
 * useEffect that doesnt run on first render
 *  */

const useSkipFirstRender = (fn, args) => {
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			console.log("running");
			return fn();
		}
	}, args);

	useEffect(() => {
		isMounted.current = true;
	}, []);
};

export default useSkipFirstRender;
