// Store api-key in environment
const NVE_API_KEY = process.env.NVE_API_KEY;

// NVE-Api constants
const _base = "https://hydapi.nve.no";
const _path = "/api/v1/Observations?";
const _stationId = "2.101.0";
const _parameter = "1000";
const _resolutionTime = "hour";

// Endpoint constants
const OFFSETHOURS = -2;
const DAYSPAN = 7;
const MINDAYSPAN = 1;
const MAXDAYSPAN = 15;
const MINFULLYEAR = 2017;
const MAXFULLYEAR = new Date().getFullYear() + 1;
const TODAYDATE = new Date(
    new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)
);

// Validate date-inputs ref constants
const validateInputDate = (dateParam) => {
    const dateObject = new Date(parseInt(dateParam));
    if (dateObject.getTime()) {
        if (
            dateObject.getFullYear() > MINFULLYEAR &&
            dateObject.getFullYear() < MAXFULLYEAR
        ) {
            return true;
        }
    }
    return false;
};

// Validate daycount ref constants
const validateDayCount = (daycountParam) => {
    if (
        parseInt(daycountParam) >= MINDAYSPAN &&
        parseInt(daycountParam) <= MAXDAYSPAN
    ) {
        return true;
    }
    return false;
};

// Validate query-params
const validateParams = async (req) => {
    let fromDate, toDate, dayCount;

    if (req.query.fromdate && validateInputDate(req.query.fromdate)) {
        fromDate = new Date(parseInt(req.query.fromdate));
        fromDate = formatDate(fromDate);
    }

    if (req.query.todate && validateInputDate(req.query.todate)) {
        toDate = new Date(parseInt(req.query.todate));
        toDate = formatDate(toDate, OFFSETHOURS - 1);
    }

    if (req.query.daycount && validateDayCount(req.query.daycount)) {
        dayCount = parseInt(req.query.daycount);
    }

    return {
        fromDate,
        toDate,
        dayCount,
    };
};

// Format date to NVE-api iso
const formatDate = (date, offset = OFFSETHOURS) => {
    let dateObject = new Date(date);
    // offset for zulu time
    dateObject = new Date(dateObject.setHours(offset));

    const year = dateObject.getFullYear();

    let month = dateObject.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    let day = dateObject.getDate();
    day = day < 10 ? "0" + day : day;

    let hour = dateObject.getHours();
    hour = hour < 10 ? "0" + hour : hour;

    // return `${year}-${month}-${day}T${hour}:00`;

    return `${year}-${month}-${day}T${hour}:00`;
};

// Format NVE-api parameter referenceTime based on inputs
const formatReferenceTime = ({ fromDate, toDate, dayCount }) => {
    /**
     *  Valid parameter combinations
     *
     *  - fromDate && toDate && dayCount | use fromDate and toDate
     *  - fromDate && toDate
     *  - fromDate && dayCount
     *  - toDate && dayCount
     *  - dayCount | use Now() for toDate
     *  - fromDate OR toDate - use $DAYSPAN
     *  - no params | use Now() for toDate and $DAYSPAN for dayCount
     *
     *  */

    if (fromDate && toDate) {
        return `${fromDate}/${toDate}`;
    }

    if (fromDate && dayCount) {
        return `${fromDate}/P${dayCount}D`;
    }

    if (toDate && dayCount) {
        return `P${dayCount}D/${toDate}`;
    }

    if (dayCount) {
        let today = formatDate(TODAYDATE, OFFSETHOURS);
        return `P${dayCount}D/${today}`;
    }

    if (fromDate) {
        return `P${DAYSPAN}D/${fromDate}`;
    }

    if (toDate) {
        return `${fromDate}/P${DAYSPAN}D`;
    }

    let today = formatDate(TODAYDATE, OFFSETHOURS);
    return `P${DAYSPAN}D/${today}`;
};

// Request data from NVE
async function getData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
            "x-api-key": NVE_API_KEY,
            // Accept: "application/json",
            // "Content-Type": "application/json",
        },

        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const measures = await response.json(); // parses JSON response into native JavaScript objects
    return measures;
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
    const reqParams = await validateParams(req);

    // sjekk CacheDB for data

    const referenceTime = formatReferenceTime(reqParams);
    const EndPoint = `${_base}${_path}StationId=${_stationId}&Parameter=${_parameter}&ResolutionTime=${_resolutionTime}&ReferenceTime=${referenceTime}`;

    try {
        const vannstandData = await getData(EndPoint, {}).then((data) => {
            return data;
        });

        // Legg data i CacheDB

        res.status(200).send({ vannstandData });
    } catch {
        res.status(500).json({ error: "failed to load data" });
    }
}
