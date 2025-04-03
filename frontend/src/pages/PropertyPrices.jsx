import { useEffect, useState } from "react";
import axios from "axios";
const PropertyPrices = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [price, setPrice] = useState("");
  const [id, setId] = useState(null);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [dateSoldAfter, setDateSoldAfter] = useState(null);
  const [dateSoldBefore, setDateSoldBefore] = useState(null);
  const [suburb, setSuburb] = useState(null);
  const [numBath, setNumBath] = useState(null);
  const [numBed, setNumBed] = useState(null);
  const [numParking, setNumParking] = useState(null);
  const [minSize, setMinSize] = useState(null);
  const [maxSize, setMaxSize] = useState(null);
  const [type, setType] = useState(null);

  const fetchPrice = async () => {
    if (id == null) {
      alert("missing id");
      return;
    }
    setLoaded(false);
    const filters = {
      price_range: {
        min_price: parseFloat(minPrice) || null,
        max_price: parseFloat(maxPrice) || null,
      },
      date_range: {
        date_sold_after: dateSoldAfter || null,
        date_sold_before: dateSoldBefore || null,
      },
      suburb: suburb || null,
      property_features: {
        num_bath: parseInt(numBath) || null,
        num_bed: parseInt(numBed) || null,
        num_parking: parseInt(numParking) || null,
      },
      property_size: {
        min_size: parseInt(minSize) || null,
        max_size: parseInt(maxSize) || null,
      },
      property_type: type || null,
    };

    const requestBody = {
      id: id,
      filters: filters,
      function_name: "property_prices",
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_prices",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoaded(true);
      setLoading(false);
      setPrice(response.data.avg_price);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Average Property Prices</h1>
      <p>Id:</p>
      <input
        type="text"
        name="id"
        placeholder="Id"
        onChange={(e) => {
          if (e.target.value !== "") {
            setId(e.target.value);
          } else {
            setId(null);
          }
        }}
      />
      <div className="filter-field">
        <p>Price range:</p>
        <input
          type="text"
          name="min-price"
          placeholder="Min price"
          onChange={(e) => {
            if (e.target.value !== "") {
              setMinPrice(e.target.value);
            } else {
              setMinPrice(null);
            }
          }}
        />
        <input
          type="text"
          name="max-price"
          placeholder="Max price"
          onChange={(e) => {
            if (e.target.value !== "") {
              setMaxPrice(e.target.value);
            } else {
              setMaxPrice(null);
            }
          }}
        />
      </div>
      <div className="filter-field">
        <p>Date range:</p>
        <input
          type="text"
          name="sold-after"
          placeholder="Date sold after"
          onChange={(e) => {
            if (e.target.value !== "") {
              setDateSoldAfter(e.target.value);
            } else {
              setDateSoldAfter(null);
            }
          }}
        />
        <input
          type="text"
          name="sold-before"
          placeholder="Date sold before"
          onChange={(e) => {
            if (e.target.value !== "") {
              setDateSoldBefore(e.target.value);
            } else {
              setDateSoldBefore(null);
            }
          }}
        />
      </div>
      <div className="filter-field">
        <p>Suburb:</p>
        <input
          type="text"
          name="sold-after"
          placeholder="Suburb"
          onChange={(e) => {
            if (e.target.value !== "") {
              setSuburb(e.target.value);
            } else {
              setSuburb(null);
            }
          }}
        />
      </div>
      <div className="filter-field">
        <p>Property feature:</p>
        <input
          type="text"
          name="num-bath"
          placeholder="Bathrooms"
          onChange={(e) => {
            if (e.target.value !== "") {
              setNumBath(e.target.value);
            } else {
              setNumBath(null);
            }
          }}
        />
        <input
          type="text"
          name="num-bed"
          placeholder="Bedrooms"
          onChange={(e) => {
            if (e.target.value !== "") {
              setNumBed(e.target.value);
            } else {
              setNumBed(null);
            }
          }}
        />
        <input
          type="text"
          name="num-parking"
          placeholder="Parking"
          onChange={(e) => {
            if (e.target.value !== "") {
              setNumParking(e.target.value);
            } else {
              setNumParking(null);
            }
          }}
        />
      </div>
      <div className="filter-field">
        <p>Property size:</p>
        <input
          type="text"
          name="min-size"
          placeholder="Min size"
          onChange={(e) => {
            if (e.target.value !== "") {
              setMinSize(e.target.value);
            } else {
              setMinSize(null);
            }
          }}
        />
        <input
          type="text"
          name="max-size"
          placeholder="Max size"
          onChange={(e) => {
            if (e.target.value !== "") {
              setMaxSize(e.target.value);
            } else {
              setMaxSize(null);
            }
          }}
        />
      </div>
      <div className="filter-field">
        <p>Property type:</p>
        <input
          type="text"
          name="min-size"
          placeholder="Type"
          onChange={(e) => {
            if (e.target.value !== "") {
              setType(e.target.value);
            } else {
              setType(null);
            }
          }}
        />
      </div>
      <button onClick={fetchPrice}>Search</button>
      {loading && <div className="loading">loading...</div>}
      {loaded && (
        <div className="avg-price">
          <h2> Average price: {price}</h2>
        </div>
      )}
    </div>
  );
};

export default PropertyPrices;
