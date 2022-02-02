import React, { useRef } from "react";
import "./leftbar.css";

const Leftbar = ({ handleOrder, handleSearch }) => {
  const search = useRef();
  const order = useRef();

  const onSearch = () => {
    handleSearch(search.current.value, order.current.value);
  };

  const onOrder = () => {
    handleOrder(order.current.value, search.current.value);
  };

  const handleClear = () => {
    handleOrder("none", "");
  };

  return (
    <div className="leftContainer">
      <div className="leftContainerTitle">Filter Results</div>
      <form className="leftContainerForm">
        <div className="inputBox">
          <label htmlFor="searchInput" className="searchTitle">
            Name(contains)
          </label>
          <input
            id="searchInput"
            placeholder="Text String"
            type="text"
            className="searchBox"
            ref={search}
            onChange={onSearch}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="orderInput" className="orderTitle">
            OrderBy
          </label>
          <div className="orderContainer">
            <div className="orderArrow">&#x2191;</div>
            <select
              id="orderInput"
              onChange={onOrder}
              className="orderBox"
              ref={order}
            >
              <option value="none" selected disabled hidden>
                {" "}
              </option>
              <option className="orderOption" value="rasc">
                Rating (Ascending)
              </option>
              <option className="orderOption" value="radesc">
                Rating (Descending)
              </option>
              <option className="orderOption" value="reasc">
                Release Date(Ascending)
              </option>
              <option className="orderOption" value="redesc">
                Release Date (Descending)
              </option>
            </select>
          </div>
        </div>
      </form>
      <button className="clearButton" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default Leftbar;
