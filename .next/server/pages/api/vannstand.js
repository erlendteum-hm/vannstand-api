"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/vannstand";
exports.ids = ["pages/api/vannstand"];
exports.modules = {

/***/ "(api)/./pages/api/vannstand.js":
/*!********************************!*\
  !*** ./pages/api/vannstand.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\nconst NVE_API_KEY = process.env.NVE_API_KEY;\nconst base = \"https://hydapi.nve.no\";\nconst path = \"/api/v1/Observations?\";\nconst stationId = \"2.101.0\";\nconst parameter = \"1000\";\nconst resolutionTime = \"hour\";\nconst daySpan = 7;\nconst offsetHours = 2;\nasync function handler(req, res) {\n    let fromDate;\n    if (req.query.fromDate) {\n        fromDate = new Date(parseInt(req.query.fromDate));\n    } else {\n        fromDate = new Date(new Date().setDate(new Date().getDate() - daySpan));\n    }\n    // offset for zulu time\n    fromDate = new Date(fromDate.setHours(fromDate.getHours() - offsetHours));\n    //console.log(\"###### \", fromDate);\n    const year = fromDate.getFullYear();\n    let month = fromDate.getMonth() + 1;\n    month = month < 10 ? \"0\" + month : month;\n    let day = fromDate.getDate();\n    day = day < 10 ? \"0\" + day : day;\n    let hour = fromDate.getHours();\n    hour = hour < 10 ? \"0\" + hour : hour;\n    /**\r\n        ReferenceTime; Describes the time interval to get returned observations from. The interval has a start time and a end time.\r\n        ReferenceTime is implemented using the ISO-8601 standard and with some extensions.\r\n        The \"/\" is used as a separator between the start time and end time. Example \"2010-02-02/2012-03-03\".\r\n        If left side of \"/\" is left undefined, it will be handled as an open start returning all observations prior to the end time\r\n        If right side of \"/\" is left undefined, it will be handled as an open end returning all observations from the start time and forward\r\n        The observations includes the start and end times. All times is given in UTC-0\r\n    */ // const referenceTime = `${year}-${month}-${day}T${hour}:00/P${daySpan}D`;\n    const referenceTime = `${year}-${month}-${day}T${hour}:00/`;\n    //const referenceTime = `${year}-${month}-${day}T00:00/`;\n    const EndPoint = `${base}${path}StationId=${stationId}&Parameter=${parameter}&ResolutionTime=${resolutionTime}&ReferenceTime=${referenceTime}`;\n    const vannstandData = await getData(EndPoint, {}).then((data)=>{\n        return data;\n    });\n    res.status(200).send({\n        vannstandData\n    });\n};\nasync function getData(url = \"\", data = {}) {\n    const response = await fetch(url, {\n        method: \"GET\",\n        mode: \"no-cors\",\n        // cache: \"no-cache\", // *default, no-cache, reload, force-cache, only-if-cached\n        // credentials: \"same-origin\", // include, *same-origin, omit\n        headers: {\n            \"Content-Type\": \"text/plain;charset=UTF-8\",\n            \"x-api-key\": NVE_API_KEY\n        }\n    });\n    const measures = await response.json(); // parses JSON response into native JavaScript objects\n    return measures;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7SUFFRixNQUFNeUMsUUFBUSxHQUFHLE1BQU1MLFFBQVEsQ0FBQ00sSUFBSSxFQUFFLEVBQUU7SUFDeEMsT0FBT0QsUUFBUSxDQUFDO0NBQ25CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFubnN0YW5kLWFwaS8uL3BhZ2VzL2FwaS92YW5uc3RhbmQuanM/NjkwZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOZXh0LmpzIEFQSSByb3V0ZSBzdXBwb3J0OiBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxyXG5jb25zdCBOVkVfQVBJX0tFWSA9IHByb2Nlc3MuZW52Lk5WRV9BUElfS0VZO1xyXG5jb25zdCBiYXNlID0gXCJodHRwczovL2h5ZGFwaS5udmUubm9cIjtcclxuY29uc3QgcGF0aCA9IFwiL2FwaS92MS9PYnNlcnZhdGlvbnM/XCI7XHJcbmNvbnN0IHN0YXRpb25JZCA9IFwiMi4xMDEuMFwiO1xyXG5jb25zdCBwYXJhbWV0ZXIgPSBcIjEwMDBcIjtcclxuY29uc3QgcmVzb2x1dGlvblRpbWUgPSBcImhvdXJcIjtcclxuY29uc3QgZGF5U3BhbiA9IDc7XHJcbmNvbnN0IG9mZnNldEhvdXJzID0gMjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICAgIGxldCBmcm9tRGF0ZTtcclxuICAgIGlmIChyZXEucXVlcnkuZnJvbURhdGUpIHtcclxuICAgICAgICBmcm9tRGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHJlcS5xdWVyeS5mcm9tRGF0ZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmcm9tRGF0ZSA9IG5ldyBEYXRlKG5ldyBEYXRlKCkuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSAtIGRheVNwYW4pKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvZmZzZXQgZm9yIHp1bHUgdGltZVxyXG4gICAgZnJvbURhdGUgPSBuZXcgRGF0ZShmcm9tRGF0ZS5zZXRIb3Vycyhmcm9tRGF0ZS5nZXRIb3VycygpIC0gb2Zmc2V0SG91cnMpKTtcclxuICAgIC8vY29uc29sZS5sb2coXCIjIyMjIyMgXCIsIGZyb21EYXRlKTtcclxuXHJcbiAgICBjb25zdCB5ZWFyID0gZnJvbURhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBsZXQgbW9udGggPSBmcm9tRGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIG1vbnRoID0gbW9udGggPCAxMCA/IFwiMFwiICsgbW9udGggOiBtb250aDtcclxuXHJcbiAgICBsZXQgZGF5ID0gZnJvbURhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgZGF5ID0gZGF5IDwgMTAgPyBcIjBcIiArIGRheSA6IGRheTtcclxuXHJcbiAgICBsZXQgaG91ciA9IGZyb21EYXRlLmdldEhvdXJzKCk7XHJcbiAgICBob3VyID0gaG91ciA8IDEwID8gXCIwXCIgKyBob3VyIDogaG91cjtcclxuXHJcbiAgICAvKipcclxuICAgICAgICBSZWZlcmVuY2VUaW1lOyBEZXNjcmliZXMgdGhlIHRpbWUgaW50ZXJ2YWwgdG8gZ2V0IHJldHVybmVkIG9ic2VydmF0aW9ucyBmcm9tLiBUaGUgaW50ZXJ2YWwgaGFzIGEgc3RhcnQgdGltZSBhbmQgYSBlbmQgdGltZS5cclxuICAgICAgICBSZWZlcmVuY2VUaW1lIGlzIGltcGxlbWVudGVkIHVzaW5nIHRoZSBJU08tODYwMSBzdGFuZGFyZCBhbmQgd2l0aCBzb21lIGV4dGVuc2lvbnMuXHJcbiAgICAgICAgVGhlIFwiL1wiIGlzIHVzZWQgYXMgYSBzZXBhcmF0b3IgYmV0d2VlbiB0aGUgc3RhcnQgdGltZSBhbmQgZW5kIHRpbWUuIEV4YW1wbGUgXCIyMDEwLTAyLTAyLzIwMTItMDMtMDNcIi5cclxuICAgICAgICBJZiBsZWZ0IHNpZGUgb2YgXCIvXCIgaXMgbGVmdCB1bmRlZmluZWQsIGl0IHdpbGwgYmUgaGFuZGxlZCBhcyBhbiBvcGVuIHN0YXJ0IHJldHVybmluZyBhbGwgb2JzZXJ2YXRpb25zIHByaW9yIHRvIHRoZSBlbmQgdGltZVxyXG4gICAgICAgIElmIHJpZ2h0IHNpZGUgb2YgXCIvXCIgaXMgbGVmdCB1bmRlZmluZWQsIGl0IHdpbGwgYmUgaGFuZGxlZCBhcyBhbiBvcGVuIGVuZCByZXR1cm5pbmcgYWxsIG9ic2VydmF0aW9ucyBmcm9tIHRoZSBzdGFydCB0aW1lIGFuZCBmb3J3YXJkXHJcbiAgICAgICAgVGhlIG9ic2VydmF0aW9ucyBpbmNsdWRlcyB0aGUgc3RhcnQgYW5kIGVuZCB0aW1lcy4gQWxsIHRpbWVzIGlzIGdpdmVuIGluIFVUQy0wXHJcbiAgICAqL1xyXG5cclxuICAgIC8vIGNvbnN0IHJlZmVyZW5jZVRpbWUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1UJHtob3VyfTowMC9QJHtkYXlTcGFufURgO1xyXG4gICAgY29uc3QgcmVmZXJlbmNlVGltZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fVQke2hvdXJ9OjAwL2A7XHJcbiAgICAvL2NvbnN0IHJlZmVyZW5jZVRpbWUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1UMDA6MDAvYDtcclxuXHJcbiAgICBjb25zdCBFbmRQb2ludCA9IGAke2Jhc2V9JHtwYXRofVN0YXRpb25JZD0ke3N0YXRpb25JZH0mUGFyYW1ldGVyPSR7cGFyYW1ldGVyfSZSZXNvbHV0aW9uVGltZT0ke3Jlc29sdXRpb25UaW1lfSZSZWZlcmVuY2VUaW1lPSR7cmVmZXJlbmNlVGltZX1gO1xyXG5cclxuICAgIGNvbnN0IHZhbm5zdGFuZERhdGEgPSBhd2FpdCBnZXREYXRhKEVuZFBvaW50LCB7fSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyB2YW5uc3RhbmREYXRhIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXREYXRhKHVybCA9IFwiXCIsIGRhdGEgPSB7fSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXHJcbiAgICAgICAgbW9kZTogXCJuby1jb3JzXCIsIC8vIG5vLWNvcnMsICpjb3JzLCBzYW1lLW9yaWdpblxyXG4gICAgICAgIC8vIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcclxuICAgICAgICAvLyBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCAqc2FtZS1vcmlnaW4sIG9taXRcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIsXHJcbiAgICAgICAgICAgIFwieC1hcGkta2V5XCI6IE5WRV9BUElfS0VZLFxyXG4gICAgICAgICAgICAvLyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAvLyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxyXG4gICAgICAgIC8vIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsIC8vIG5vLXJlZmVycmVyLCAqbm8tcmVmZXJyZXItd2hlbi1kb3duZ3JhZGUsIG9yaWdpbiwgb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luLCBzYW1lLW9yaWdpbiwgc3RyaWN0LW9yaWdpbiwgc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbiwgdW5zYWZlLXVybFxyXG4gICAgICAgIC8vIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBib2R5IGRhdGEgdHlwZSBtdXN0IG1hdGNoIFwiQ29udGVudC1UeXBlXCIgaGVhZGVyXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBtZWFzdXJlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8gcGFyc2VzIEpTT04gcmVzcG9uc2UgaW50byBuYXRpdmUgSmF2YVNjcmlwdCBvYmplY3RzXHJcbiAgICByZXR1cm4gbWVhc3VyZXM7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5WRV9BUElfS0VZIiwicHJvY2VzcyIsImVudiIsImJhc2UiLCJwYXRoIiwic3RhdGlvbklkIiwicGFyYW1ldGVyIiwicmVzb2x1dGlvblRpbWUiLCJkYXlTcGFuIiwib2Zmc2V0SG91cnMiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiZnJvbURhdGUiLCJxdWVyeSIsIkRhdGUiLCJwYXJzZUludCIsInNldERhdGUiLCJnZXREYXRlIiwic2V0SG91cnMiLCJnZXRIb3VycyIsInllYXIiLCJnZXRGdWxsWWVhciIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJob3VyIiwicmVmZXJlbmNlVGltZSIsIkVuZFBvaW50IiwidmFubnN0YW5kRGF0YSIsImdldERhdGEiLCJ0aGVuIiwiZGF0YSIsInN0YXR1cyIsInNlbmQiLCJ1cmwiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwibW9kZSIsImhlYWRlcnMiLCJtZWFzdXJlcyIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/vannstand.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/vannstand.js"));
module.exports = __webpack_exports__;

})();