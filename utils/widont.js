"use strict";

const widont = (string = "") => {
	return string.replace(/([^\s])\s+([^\s]+)\s*$/, "$1\u00A0$2");
};

export default widont;
