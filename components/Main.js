import { useState } from "react";
import Filter from "../components/Filter"

export default function Main({ user, rides }) {

  // Calculate nearest rides

  const numOfUpcomingRides = getNumberOfUpcomingRides(rides),
    numOfPastRides = rides.length - numOfUpcomingRides;

  const mapping = getMap(rides);

  const [filter, setFilter] = useState({state: "", city: ""});

  function handleStateChange(state) {
    setFilter({state: state, city: ""})
  }

  function handleCityChange(city) {
    setFilter(prevState => { return {...prevState, city: city} })
  }

  return (
    <main className="main">
      <div id="controls-wrapper">
        <div id="tab-wrapper">
          <div className="tab">Nearest rides</div>
          <div className="tab">Upcoming rides ({numOfUpcomingRides})</div>
          <div className="tab">Past rides ({numOfPastRides})</div>
        </div>
        <Filter mapping={mapping} filter={filter} handleStateChange={handleStateChange} handleCityChange={handleCityChange}/>
      </div>
    </main>
  )
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

    if ( !stateAndCityMap.hasOwnProperty( rideObj.state ) ) {
      stateAndCityMap[rideObj.state] = { [ rideObj.city ]: rideObj.id }
    }

    else if ( !stateAndCityMap[ rideObj.state ].hasOwnProperty(rideObj.city) ) {
      stateAndCityMap[rideObj.state][rideObj.city] = rideObj.id
    }

    else if ( !Array.isArray( stateAndCityMap[rideObj.state][rideObj.city] ) ) {
      stateAndCityMap[rideObj.state][rideObj.city] = [stateAndCityMap[rideObj.state][rideObj.city], rideObj.id]
    }

    else {
      stateAndCityMap[rideObj.state][rideObj.city].push(rideObj.id)
    }
  }

  return stateAndCityMap
}