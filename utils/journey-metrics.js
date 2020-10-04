// Date-fns V1.x is installed and doesnt export the formatSeconds function that is in V2.x

// Currently date-fns is being used on here and will need to be updated:
// - Calendar page
// - Profile Details on upcoming races
// - Profile Ride With GPS Details

export const secondsToHours = d => {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor((d % 3600) / 60);
	var s = Math.floor((d % 3600) % 60);

	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	// var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	// return hDisplay + mDisplay + sDisplay;
	return hDisplay + mDisplay;
};

/**
 *
 * @param { distance } distance in meters as exposed by RideWithGPS API
 * @param { time } time in seconds as exposed by RideWithGPS API
 * @param { returnFormat } formate to return data , either 'mps' or 'kph'
 *
 * @return { speed } speed returned as specified format
 */
export const averageSpeed = ({ distance, time, returnFormat = "mps" }) => {
	const speed = distance / time;

	if (returnFormat === "kph") {
		// kilometers per hour
		return speed * 3.6;
	}

	return speed;
};
