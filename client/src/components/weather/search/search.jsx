import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import './search.scss';
import { API_options, API_URL } from '../geoAPI';

const Search = ({onSearchChange}) => {
    const [ search, setSearch ] = useState(null);
    const loadOptions = (inputValue) => {
        return fetch(
          `${API_URL}?namePrefix=${inputValue}`,
          API_options
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.country}`,
                };
              }),
            };
          });
      };

    const handleOnChange = (data) => {
        setSearch(data);
        onSearchChange(data);
    };

    return ( 
        <div className='searchbar'>
            <AsyncPaginate
                placeholder='도시를 영어로 검색'
                debounceTimeout={1000}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
        </div>
    );
}
 
export default Search;