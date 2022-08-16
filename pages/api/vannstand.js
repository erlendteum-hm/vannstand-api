// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const NVE_API_KEY = process.env.NVE_API_KEY;
const base = "https://hydapi.nve.no";
const path = "/api/v1/Observations?";
const stationId = "2.101.0";
const parameter = "1000";
const resolutionTime = "hour";
const daySpan = 7;

export default async function handler(req, res) {
    let fromDate;
    if (req.query.fromDate) {
        fromDate = new Date(parseInt(req.query.fromDate));
    } else {
        fromDate = new Date();
    }
    const year = fromDate.getFullYear();
    let month = fromDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = fromDate.getDate();
    day = day < 10 ? "0" + day : day;
    const referenceTime = `${year}-${month}-${day}T00:00/P${daySpan}D`;

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
