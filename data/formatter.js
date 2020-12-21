const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);
const normalise = string => capitalise(string.toLowerCase()).replace(/_/g, " ");

const enumTransform = string => {
	switch (string) {
		case "TRADITIONAL_GEARED":
			return "Traditional/Geared";
		case "FINISHED_OVER_TIME_LIMIT":
			return "Finished (OTL)";
		default:
			return normalise(string);
	}
};

const formatter = results =>
	results.map(result => {
		result.cap = result.cap && result.cap.replace(/'/g, "");
		result.class = result.class && enumTransform(result.class);
		result.category = result.category && enumTransform(result.category);
		result.bike = result.bike && enumTransform(result.bike);
		result.result = result.result && enumTransform(result.result);
		return result;
	});

export default formatter;
