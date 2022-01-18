import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import Card from "../blocks/Card";

export default function HotelSearch(props) {
  const [results, setResults] = useState(null);

  useEffect(function () {
    const searchField = document.querySelector("#search");

    // Get search phrase
    searchField.addEventListener("input", () => {
      const searchPhrase = searchField.value;
      const searchPattern = new RegExp(searchPhrase, "i");
      // Filter search results
      if (searchPhrase) {
        const searchResult = props.allHotels.filter((results) =>
          searchPattern.test(results.title)
        );
        // Update results
        setResults(searchResult);
      } else {
        setResults(null);
      }
    });
  }, []);
  //   console.log(props);
  return (
    <div>
      <form className="form search">
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="search" name="search">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search..."
            />
          </div>
          <div className="search__results">
            {results
              ? results.map((hotel) => {
                  return (
                    <Card
                      key={hotel.id}
                      layoutWide={true}
                      slug="/"
                      title={hotel.title}
                      //   excerpt={props.allHotels[0].excerpt}
                      imageUrl={hotel.imageUrl}
                      //   facilities={props.allHotels[0].facilities}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </form>
    </div>
  );
}

HotelSearch.propTypes = {
  allHotels: PropTypes.array.isRequired,
};
