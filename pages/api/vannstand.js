// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const NVE_API_KEY = process.env.NVE_API_KEY;
const base = "https://hydapi.nve.no";
const path = "/api/v1/Observations?";
const stationId = "2.101.0";
const parameter = "1000";
const resolutionTime = "hour";
const daySpan = 7;
const offsetHours = 2;

export default async function handler(req, res) {
    let fromDate;
    if (req.query.fromDate) {
        fromDate = new Date(parseInt(req.query.fromDate));
    } else {
        fromDate = new Date(new Date().setDate(new Date().getDate() - daySpan));
    }

    // offset for zulu time
    fromDate = new Date(fromDate.setHours(fromDate.getHours() - offsetHours));
    //console.log("###### ", fromDate);

    const year = fromDate.getFullYear();

    let month = fromDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    let day = fromDate.getDate();
    day = day < 10 ? "0" + day : day;

    let hour = fromDate.getHours();
    hour = hour < 10 ? "0" + hour : hour;

    /**
        ReferenceTime; Describes the time interval to get returned observations from. The interval has a start time and a end time.
        ReferenceTime is implemented using the ISO-8601 standard and with some extensions.
        The "/" is used as a separator between the start time and end time. Example "2010-02-02/2012-03-03".
        If left side of "/" is left undefined, it will be handled as an open start returning all observations prior to the end time
        If right side of "/" is left undefined, it will be handled as an open end returning all observations from the start time and forward
        The observations includes the start and end times. All times is given in UTC-0
    */

    // const referenceTime = `${year}-${month}-${day}T${hour}:00/P${daySpan}D`;
    const referenceTime = `${year}-${month}-${day}T${hour}:00/`;
    //const referenceTime = `${year}-${month}-${day}T00:00/`;

    const EndPoint = `${base}${path}StationId=${stationId}&Parameter=${parameter}&ResolutionTime=${resolutionTime}&ReferenceTime=${referenceTime}`;

    const vannstandData = await getData(EndPoint, {}).then((data) => {
        return data;
    });

    res.status(200).send({ vannstandData });
}

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
