import queryString from "query-string";
import find from "lodash/find";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import axios from "axios";

export const currentDate = () => new Date();

export const isLandingPage = ({ pageType }) => pageType === "landingPage";

export const getAvailableCities = (chosenCountry, countries, cities) => {
	if (chosenCountry === "") {
		return;
	}

	const chosenCountryObj = countries.find(c => c.key === chosenCountry);
	return cities.filter(c => chosenCountryObj.cities.includes(c.key));
};

export const getAvailableClubhouses = (chosenCity, cities, clubhouses) => {
	if (chosenCity === "") {
		return;
	}

	const chosenCityObj = cities.find(c => c.key === chosenCity);
	return clubhouses.filter(c => chosenCityObj.clubhouses.includes(c.name));
};

export const updateQueryStringfromFilters = obj => {
	const currentSearchObj = queryString.parse(window.location.search);
	const updatedSearchObj = { ...currentSearchObj, ...obj };
	const updatedSearchString = queryString.stringify(updatedSearchObj);
	history.replaceState("", "", `?${updatedSearchString}`);
};

export const setFiltersFromQueryString = state => {
	const currentFilters = queryString.parse(window.location.search);

	const chosenCountryObj =
		currentFilters.country &&
		handleChosenCountry(state, currentFilters.country);

	const chosenCityObj =
		currentFilters.city && handleChosenCity(state, currentFilters.city);

	const chosenClubhouseObj =
		currentFilters.clubhouse &&
		handleChosenClubhouse(state, currentFilters.clubhouse);

	const clubhouseEvents = currentFilters["clubhouse-events"] && {
		clubhouseEvents: currentFilters["clubhouse-events"] === "show"
	};

	const clubhouseRides = currentFilters["clubhouse-rides"] && {
		clubhouseRides: currentFilters["clubhouse-rides"] === "show"
	};

	const rccEvents = currentFilters["rcc-events"] && {
		rccEvents: currentFilters["rcc-events"] === "show"
	};

	const rccRides = currentFilters["rcc-rides"] && {
		rccRides: currentFilters["rcc-rides"] === "show"
	};

	const stateObj = {
		...chosenCountryObj,
		...chosenCityObj,
		...chosenClubhouseObj,
		...clubhouseEvents,
		...clubhouseRides,
		...rccEvents,
		...rccRides
	};

	return stateObj;
};

const checkboxSetFormValue = field => (field ? "show" : "hide");

// Selectors
export const handleChosenCountry = ({ countries, cities }, value) => {
	updateQueryStringfromFilters({
		country: value,
		city: undefined,
		clubhouse: undefined,
		"event-id": undefined
	});
	const countryObj = find(countries, ["key", value]);

	return {
		chosenCountry: countryObj.key,
		chosenCity: "",
		chosenClubhouse: "",
		availableCities: getAvailableCities(countryObj.key, countries, cities)
	};
};

export const handleChosenCity = ({ cities, clubhouses }, value) => {
	updateQueryStringfromFilters({
		city: value,
		clubhouse: undefined,
		"event-id": undefined
	});
	const cityObj = find(cities, ["key", value]);

	return {
		chosenCountry: cityObj.country,
		chosenCity: cityObj.key,
		chosenClubhouse: "",
		availableClubhouses: getAvailableClubhouses(cityObj.key, cities, clubhouses)
	};
};

export const handleChosenClubhouse = (
	{ countries, cities, clubhouses },
	value
) => {
	updateQueryStringfromFilters({ clubhouse: value, "event-id": undefined });
	const clubhouseObj = find(clubhouses, ["name", value]);

	return {
		chosenClubhouse: clubhouseObj.name,
		chosenCity: clubhouseObj.city,
		chosenCountry: clubhouseObj.country,
		availableCities: getAvailableCities(
			clubhouseObj.country,
			countries,
			cities
		),
		availableClubhouses: getAvailableClubhouses(
			clubhouseObj.city,
			cities,
			clubhouses
		)
	};
};

export const handleFetchEvents = ({
	currentDate,
	chosenCountry = "all",
	chosenCity = "all",
	chosenClubhouse = "all",
	clubhouseRides,
	clubhouseEvents,
	rccRides,
	rccEvents,
	searchEndpoint
}) => {
	return axios.get(searchEndpoint, {
		params: {
			country: chosenCountry,
			city: chosenCity,
			clubhouse: chosenClubhouse,
			start: startOfMonth(currentDate),
			end: endOfMonth(currentDate),
			"clubhouse-rides": checkboxSetFormValue(clubhouseRides),
			"clubhouse-events": checkboxSetFormValue(clubhouseEvents),
			"rcc-rides": checkboxSetFormValue(rccRides),
			"rcc-events": checkboxSetFormValue(rccEvents)
		}
	});
};
