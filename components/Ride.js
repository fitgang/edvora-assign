import Image from 'next/image'

export default function Ride(props) {
  const rideObj = props.rideObj;
  return (
    <div className='ride'>

      <Image src={rideObj.map_url} alt={`ride ${rideObj.id}`} width="300px" height="200px" className='rideImage' />

      <div className="details-container">

        <div>
          <span className="property">Ride Id : </span>
          <span>{rideObj.id}</span>
        </div>

        <div>
          <span className="property">Origin Station : </span>
          <span>{rideObj.origin_station_code}</span>
        </div>

        <div>
          <span className="property">Station Path : </span>
          <span>[{rideObj.station_path.map(path => ` ${path},`)}]</span>
        </div>

        <div>
          <span className="property">Date : </span>
          <span>{rideObj.date}</span>
        </div>

        <div>
          <span className="property">Distance : </span>
          <span>{rideObj.distance}</span>
        </div>

      </div>

      <div className="region-container">
        <div className="region">{rideObj.city}</div>
        <div className="region">{rideObj.state}</div>
      </div>

    </div>
  )
}