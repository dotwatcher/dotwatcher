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

export default () => {
	const racerClasses = [];
	const racerCategories = ["Both"];
	const finishlocations = [];
	const notes = [];

	formattedResults.forEach(result => {
		if (
			racerClasses.filter(racerClass => racerClass === result.class).length < 1
		) {
			racerClasses.push(result.class);
		}
		if (
			racerCategories.filter(racerCategory => racerCategory === result.category)
				.length < 1
		) {
			racerCategories.push(result.category);
		}
		if (
			finishlocations.filter(
				finishlocation => finishlocation === result.finishlocation
			).length < 1
		) {
			finishlocations.push(result.finishlocation);
		}
		if (result.notes !== "") {
			notes.push(result.notes);
		}
	});

	activeClass = activeClass || racerClasses[0];
	activeCategory = activeCategory || racerCategories[0];
	activeLocation = activeLocation || finishlocations[0];

	const hasNotes = notes.length > 0;
	const name = results[0].racename;
	const slug = race;
};
