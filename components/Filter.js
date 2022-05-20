import { useState } from "react";

export default function Filter(props) {
  const states = Object.keys(props.mapping);
  const cities = props.filter.state !== ""
    ? Object.keys(props.mapping[props.filter.state])
    : [];

    const [view, setView] = useState(false);

  return (
    <div id="filter-wrapper">

      <button id="filter-btn" onClick={() => setView(prevState => !prevState)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
        </svg>
        <span>Filters</span>
      </button>

      <div id="filter-controls-wrapper" className={view ? "" : "none"}>
        <div id="filter-heading">Filters</div>

        <div id="filters">

          <select id="states" onChange={props.handleStateChange}>
            <option value="">State</option>
            {
              states.map(state => {
                if (state === props.filter.state) return <option value={state} key={state} selected>{state}</option>;
                return <option value={state} key={state}>{state}</option>
              })
            }
          </select>

          <select id="cities" onChange={props.handleCityChange}>
            <option value="">City</option>
            {cities.map(city => <option value={city} key={city}>{city}</option>)}
          </select>
          
        </div>

      </div> 
    </div>
  )
}