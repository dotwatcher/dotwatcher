import { useEffect } from "react";

const useOnClickOutside = (ref, handler = () => {}) => {
	useEffect(() => {
		const listener = event => {
			// Do nothing if clicking ref's element or descendent elements
			// @ts-ignore
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}

			handler(event);
		};

		const keyupListener = event => {
			if (event && event.key === "Escape") {
				if (!ref.current) {
					return;
				}

				handler(event);
			}
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		document.addEventListener("keyup", keyupListener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
			document.removeEventListener("keyup", keyupListener);
		};
	}, [ref, handler]);
};

export default useOnClickOutside;
