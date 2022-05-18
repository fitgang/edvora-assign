export default function Main({ user, rides }) {

  // Calculate nearest rides
  // Calculate upcoming rides
  const numOfUpcomingRides = getNumberOfUpcomingRides(rides);
  // Calculate past rides

  return (
    <main className="main">
      <div id="controls-wrapper">
        <div id="tab-wrapper">
          <div className="tab">Nearest rides</div>
          <div className="tab">Upcoming rides ({numOfUpcomingRides})</div>
          <div className="tab">Past rides</div>
        </div>
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