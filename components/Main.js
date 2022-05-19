import { useState } from "react";
import Filter from "../components/Filter"
import Ride from "../components/Ride"

export default function Main({ user, allRides }) {

  const [state, changeState] = useState(""),
    [city, setCity] = useState(""),
    [tab, setTab] = useState("N"),
    [rides, setRides] = useState(arrangeRides(allRides, user));

  const numOfUpcomingRides = getNumberOfUpcomingRides(rides),
    numOfPastRides = rides.length - numOfUpcomingRides;

  const mapping = getMap(allRides);

  let ridesToShow = [];
  switch (tab) {
    case "U": ridesToShow = getUpcomingRides(rides); break;
    case "P": ridesToShow = getPastRides(rides); break;
    default: ridesToShow = rides
  }

  return (
    <main className="main">

      <div id="controls-wrapper">
        <div id="tab-wrapper">
          <div className={"tab" + tab === "N" ? "show" : ""} onClick={() => handleTabChange("N")}>Nearest rides</div>
          <div className={"tab" + tab === "U" ? "show" : ""} onClick={() => handleTabChange("U")}>Upcoming rides ({numOfUpcomingRides})</div>
          <div className={"tab" + tab === "P" ? "show" : ""} onClick={() => handleTabChange("P")}>Past rides ({numOfPastRides})</div>
        </div>
        <Filter mapping={mapping} filter={{ state: state, city: city }} handleStateChange={handleStateChange} handleCityChange={handleCityChange} />
      </div>

      <div id="rides-container">
        {ridesToShow.map((ride, i) => <Ride rideObj={ride} key={`${ride.id}${ride.city}${i}`} />)}
      </div>

    </main>
  )

  function getUpcomingRides(ridesArr) {
    const currentTime = Date.now();
    let upcomingRides = [];

    for (const rideObj of ridesArr) {
      // Calculate total number of milliseconds in the date given
      const time = parseDate(rideObj);
      if (time >= currentTime) upcomingRides.push(rideObj);
    }

    return upcomingRides
  }

  function getPastRides(ridesArr) {
    const currentTime = Date.now();
    let pastRides = [];

    for (const rideObj of ridesArr) {
      // Calculate total number of milliseconds in the date given
      const time = parseDate(rideObj);
      if (time < currentTime) pastRides.push(rideObj);
    }

    return pastRides
  }

  function handleStateChange(e) {
    const newState = e.target.value;
    changeState(newState);
    setCity("")
    setRides( arrangeRides( filterAllRides(allRides, { state: newState, city: "" }), user ) )
  }

  function handleCityChange(e) {
    const newCity = e.target.value;
    setCity(newCity);
    setRides( arrangeRides( filterAllRides(allRides, { state: state, city: newCity }), user ) )
  }

  function handleTabChange(tab) {
    setTab(tab);
  }

  function filterAllRides(allRides, filter) {
    let rides = [...allRides];
    if (filter.state !== "") rides = rides.filter(rideObj => rideObj.state === filter.state);
    if (filter.city !== "") rides = rides.filter(rideObj => rideObj.city === filter.city);
    return rides
  }

  function arrangeRides(ridesArr, user) {
    // Arranging the order of rides in ridesArr according to distance from lowest to highest
    ridesArr.forEach(rideObj => rideObj.distance = getDistance(rideObj, user));
    ridesArr = mergeSort(ridesArr, 0, ridesArr.length - 1);
    return ridesArr;

    function mergeSort(ridesArr, left, right) {
      if (left === right) return [ridesArr[left]];
      if (left > right) return [];

      const mid = (left + right) >> 1;
      const leftArr = mergeSort(ridesArr, left, mid),
        rightArr = mergeSort(ridesArr, mid + 1, right);

      let mergedArr = Array(leftArr.length + rightArr.length).fill(null);

      for (let i = 0, j = 0, k = 0, m = leftArr.length - 1, n = rightArr.length - 1; k < mergedArr.length; k++) {

        if (i > m) {
          mergedArr[k] = rightArr[j];
          j++;
          continue
        }

        if (j > n || leftArr[i].distance < rightArr[j].distance) {
          mergedArr[k] = leftArr[i];
          i++;
          continue
        }

        mergedArr[k] = rightArr[j];
        j++;
      }

      return mergedArr
    }

    function getDistance(rideObj, user) {

      const stations = rideObj.station_path;
      let distance = 0;

      for (let l = 0, r = stations.length - 1; l <= r;) {

        const m = (l + r) >> 1;

        if (stations[m] === user.station_code) return 0;

        if (stations[m] > user.station_code) {
          distance = stations[m] - user.station_code;
          l = m + 1
        }

        else {
          r = m - 1
        }
      }

      return distance
    }
  }

  function getNumberOfUpcomingRides(ridesArr) {
    const currentTime = Date.now();
    let count = 0;
  
    for (const rideObj of ridesArr) {
  
      // Calculate total number of milliseconds in the date given
      const time = parseDate(rideObj);
      if (time > currentTime) count++;
    }
  
    return count
  }

  function parseDate(rideObj) {
    let time = Date.parse(rideObj.date.substring(0, 10)) + Number(rideObj.date.substring(11, 13)) * 60 * 60 * 1000 + Number(rideObj.date.substring(14, 16)) * 60 * 1000;
    if (rideObj.date.includes("PM")) time += 12 * 60 * 60 * 1000;
    return time
  }

  function getMap(ridesArr) {
    let stateAndCityMap = {};
  
    for (const rideObj of ridesArr) {
  
      if (!stateAndCityMap.hasOwnProperty(rideObj.state)) {
        stateAndCityMap[rideObj.state] = { [rideObj.city]: rideObj.id }
      }
  
      else if (!stateAndCityMap[rideObj.state].hasOwnProperty(rideObj.city)) {
        stateAndCityMap[rideObj.state][rideObj.city] = rideObj.id
      }
  
      else if (!Array.isArray(stateAndCityMap[rideObj.state][rideObj.city])) {
        stateAndCityMap[rideObj.state][rideObj.city] = [stateAndCityMap[rideObj.state][rideObj.city], rideObj.id]
      }
  
      else {
        stateAndCityMap[rideObj.state][rideObj.city].push(rideObj.id)
      }
    }
  
    return stateAndCityMap
  }
}