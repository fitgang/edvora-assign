export default function Filter(props) {
  const states = Object.keys(props.mapping);
  const cities = props.filter.city !== ""
    ? [props.filter.city]
    : props.filter.state !== ""
      ? Object.keys(props.mapping[props.filter.state])
      : [];

  return (
    <div id="filter-wrapper">

      <button type="button">
        <svg></svg>
        <span>Filter</span>
      </button>

      <div id="filter-controls-wrapper">
        <div>Filter</div>

        <div id="filters">
          <select id="states" onChange={(e) => props.handleStateChange(e.target.value)}>
            <option value="">State</option>
            {
              states.map(state => {
                if (state === props.filter.state) return <option value={state} key={state} selected>{state}</option>;
                return <option value={state} key={state}>{state}</option>
              })
            }
          </select>

          <select id="cities" onChange={(e) => props.handleCityChange(e.target.value)}>
            <option value="">City</option>
            { cities.map(city => <option value={city} key={city}>{city}</option>) }
          </select>
        </div>

      </div>
    </div>
  )
}