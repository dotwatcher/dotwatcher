const sanitize = (str = "") => (str ? str.replace("’", "'") : "");

export default sanitize;
