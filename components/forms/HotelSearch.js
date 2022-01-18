import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SearchIcon from "../../public/images/icons/search.svg";

import Card from "../blocks/Card";
import Heading from "../typography/Heading";

export default function HotelSearch(props) {
  const [results, setResults] = useState(null);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(function () {
    const searchResultContainer = document.querySelector(".search__results");
    const searchField = document.querySelector("#search");

    // Get search phrase
    searchField.addEventListener("input", (e) => {
      const searchPhrase = searchField.value;
      const searchPattern = new RegExp(searchPhrase, "i");
      // Filter search results
      if (searchPhrase) {
        const filterResult = props.allHotels.filter((items) =>
          searchPattern.test(items.title)
        );
        // Update results

        setResults(filterResult);

        // Update result message
        if (filterResult && filterResult.length === 1) {
          setResultMessage(`Showing ${filterResult.length} result`);
        } else if (filterResult && filterResult.length > 0) {
          setResultMessage(`Showing ${filterResult.length} results`);
        } else {
          setResultMessage(`No results to show. Try another search`);
        }

        searchResultContainer.style.maxHeight = "500px";
      } else {
        // Clear results with delay
        setTimeout(() => {
          setResults(null);
        }, 600);
        setResultMessage("");
        searchResultContainer.style.maxHeight = "0px";
      }
    });

    // Prevent page reload on enter
    searchField.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        e.preventDefault();
        return false;
      }
    });
  }, []);

  return (
    <div>
      <form className="form search">
        <div className="form__group">
          <div className="form__field">
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Start typing..."
            />
          </div>
          <div className="search__icon">
            {/* <label htmlFor="search" name="search">
              
            </label> */}
            {/* Search icon */}
            <svg
              version="1.1"
              viewBox="0 0 46.553307 46.200966"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(-29.461,-26.738)">
                <path d="m69.902 72.704-10.935-10.935c-2.997 1.961-6.579 3.111-10.444 3.111-10.539 0-19.062-8.542-19.062-19.081 0-10.519 8.522-19.061 19.062-19.061 10.521 0 19.06 8.542 19.06 19.061 0 3.679-1.036 7.107-2.828 10.011l11.013 11.011c0.583 0.567 0.094 1.981-1.076 3.148l-1.64 1.644c-1.17 1.167-2.584 1.656-3.15 1.091zm-8.653-26.905c0-7.033-5.695-12.727-12.727-12.727-7.033 0-12.745 5.694-12.745 12.727s5.712 12.745 12.745 12.745c7.032 0 12.727-5.711 12.727-12.745z" />
              </g>
            </svg>
          </div>

          <div className="search__results">
            <div className="search__results-wrapper">
              {results ? (
                <p className="search__result-message">{resultMessage}</p>
              ) : (
                ""
              )}
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
        </div>
      </form>
    </div>
  );
}

HotelSearch.propTypes = {
  allHotels: PropTypes.array.isRequired,
};
