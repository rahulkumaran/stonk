export const toUTC = (timestamp) => {
 var currentTimeString = (new Date(timestamp)).toUTCString(); //"Wed, 28 Dec 2016 06:06:50 GMT"

 var utcTimestamp = new Date(currentTimeString).getTime(); //This will give you UTC Timestamp in JavaScript

 return utcTimestamp
}

export const presaleTimestamp = (new Date(Date.UTC(2021, 11, 10, 42, 25))) // yy mm dd hh mm ss
export const publicsaleTimestamp = (new Date(Date.UTC(2021, 11, 10, 42, 30)))
