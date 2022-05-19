import Image from 'next/image'

export default function Ride(props) {
  const rideObj = props.rideObj;
  return (
    <div className='ride'>

      <Image src={rideObj.map_url} alt={`ride ${rideObj.id}`} width="250px" height="150px" className='rideImage' />

      <div className="details-container">

        <div className='detail'>
          <span className="property">Ride Id : </span>
          <span className="value">{rideObj.id}</span>
        </div>

        <div className='detail'>
          <span className="property">Origin Station : </span>
          <span className="value">{rideObj.origin_station_code}</span>
        </div>

        <div className='detail'>
          <span className="property">Station Path : </span>
          <span className="value">[{rideObj.station_path.map(path => ` ${path},`)}]</span>
        </div>

        <div className='detail'>
          <span className="property">Date : </span>
          <span className="value">{rideObj.date}</span>
        </div>

        <div className='detail'>
          <span className="property">Distance : </span>
          <span className="value">{rideObj.distance}</span>
        </div>

      </div>

      <div className="region-container">
        <div className="region">{rideObj.city}</div>
        <div className="region">{rideObj.state}</div>
      </div>

    </div>
  )
}