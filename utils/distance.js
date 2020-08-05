const distances = races => races.map(race => race.length);

export const addArray = distances =>
	distances.reduce((a, b) => {
		if (!!b) {
			return a + b;
		}

		return a;
	}, 0);

export const totalDistanceOfRaces = races => {
	const totals = distances(races);
	const total = addArray(totals);

	return total;
};

export const totalDistanceByYear = ({ races, year }) => {
	if (!year) {
		throw new Error("Please provide a year");
	}

	const racesByYear = races.filter(race => race.year === year);

	return totalDistanceOfRaces(racesByYear);
};

export const uniqueYears = races => {
	const raceYears = races.map(race => race.year);

	const uniqueYears = raceYears.filter(
		(item, index) => raceYears.indexOf(item) === index
	);

	return uniqueYears;
};

export const averageDistance = races => {
	const years = uniqueYears(races);

	const yearDistances = years.map(year => totalDistanceByYear({ races, year }));

	const total = addArray(yearDistances);

	const average = total / yearDistances.length;

	return average;
};

export const formatDistance = distance => distance + " KM";

export const format = distance => distance.toLocaleString() + "km";
