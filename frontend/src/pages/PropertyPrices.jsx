import { useEffect, useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
import Loading from "@/components/Loading";
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
        "https://7c4yt1yrr2.execute-api.us-east-1.amazonaws.com/property_prices",
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
    <div>
      <Panel
        title="Average Property Prices"
        description="Find average property prices given optional filters"
        loading={loading}
      >
        <BasicInput
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
        <p>Price range:</p>
        <BasicInput
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
        <BasicInput
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
        <p>Date range:</p>
        <BasicInput
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
        <BasicInput
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
        <p>Suburb:</p>
        <BasicInput
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
        <p>Property feature:</p>
        <BasicInput
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
        <BasicInput
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
        <BasicInput
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
        <p>Property size:</p>
        <BasicInput
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
        <BasicInput
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
        <p>Property type:</p>
        <BasicInput
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
        {loading ? (
          <Loading />
        ) : (
          <RunButton text={"Submit"} onClick={fetchPrice} />
        )}
        {loaded && (
          <div className="avg-price">
            <h2> Average price: {price}</h2>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default PropertyPrices;
