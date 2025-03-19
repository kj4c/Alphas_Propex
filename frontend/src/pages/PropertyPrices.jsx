import { useEffect, useState } from "react"
import axios from 'axios'
const PropertyPrices = () => {
    const[loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [price, setPrice] = useState("")

    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [dateSoldAfter, setDateSoldAfter] = useState(null)
    const [dateSoldBefore, setDateSoldBefore] = useState(null)
    const [suburb, setSuburb] = useState(null)
    const [numBath, setNumBath] = useState(null)
    const [numBed, setNumBed] = useState(null)
    const [numParking, setNumParking] = useState(null)
    const [minSize, setMinSize] = useState(null)
    const [maxSize, setMaxSize] = useState(null)
    const [type, setType] = useState(null)


    const fetchPrice = async () => {
        const filters = {};

        if (minPrice !== null || maxPrice !== null) {
            filters.price_range = {
                min_price: minPrice,
                max_price: maxPrice,
            };
        }

        if (dateSoldAfter !== null || dateSoldBefore !== null) {
            filters.date_range = {
                date_sold_after: dateSoldAfter,
                date_sold_before: dateSoldBefore,
            };
        }

        if (suburb !== null) {
            filters.suburb = suburb;
        }

        if (numBath !== null || numBed !== null || numParking !== null) {
            filters.property_features = {
                num_bath: numBath,
                num_bed: numBed,
                num_parking: numParking,
            };
        }

        if (minSize !== null || maxSize !== null) {
            filters.property_size = {
                min_size: minSize,
                max_size: maxSize,
            };
        }

        if (type !== null) {
            filters.property_type = type;
        }
        
        
        const requestBody = {
            id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
            ...(Object.keys(filters).length > 0 && { filters }),
        };

        setLoading(true)
        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_prices",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        setLoaded(true)
        setLoading(false)
        setPrice(response.data.avg_price)
    }

    

    return (
        <div className="page">
            <h1>Property Prices</h1>
            <div className="filter-field">
                <p>Price range:</p>
                <input type="text" name="min-price" placeholder="Min price" onChange={e => {
                    if (e.target.value !== "") {
                        setMinPrice(e.target.value)
                    } else {
                        setMinPrice(null)
                    }
                }}/>
                <input type="text" name="max-price" placeholder="Max price" onChange={e => {
                    if (e.target.value !== "") {
                        setMaxPrice(e.target.value)
                    } else {
                        setMaxPrice(null)
                    }
                }}/>
            </div>
            <div className="filter-field">
                <p>Date range:</p>
                <input type="text" name="sold-after" placeholder="Date sold after" onChange={e => {
                    if (e.target.value !== "") {
                        setDateSoldAfter(e.target.value)
                    } else {
                        setDateSoldAfter(null)
                    }
                }}/>
                <input type="text" name="sold-before" placeholder="Date sold before" onChange={e => {
                    if (e.target.value !== "") {
                        setDateSoldBefore(e.target.value)
                    } else {
                        setDateSoldBefore(null)
                    }
                }}/>
            </div>
            <div className="filter-field">
                <p>Suburb:</p>
                <input type="text" name="sold-after" placeholder="Suburb" onChange={e => {
                    if (e.target.value !== "") {
                        setSuburb(e.target.value)
                    } else {
                        setSuburb(null)
                    }
                }}/>
            </div>
            <div className="filter-field">
                <p>Property feature:</p>
                <input type="text" name="num-bath" placeholder="Bathrooms" onChange={e => {
                    if (e.target.value !== "") {
                        setNumBath(e.target.value)
                    } else {
                        setNumBath(null)
                    }
                }}/>
                <input type="text" name="num-bed" placeholder="Bedrooms" onChange={e => {
                    if (e.target.value !== "") {
                        setNumBed(e.target.value)
                    } else {
                        setNumBed(null)
                    }
                }}/>
                <input type="text" name="num-parking" placeholder="Parking" onChange={e => {
                    if (e.target.value !== "") {
                        setNumParking(e.target.value)
                    } else {
                        setNumParking(null)
                    }
                }}/>
            </div>
            <div className="filter-field">
                <p>Property size:</p>
                <input type="text" name="min-size" placeholder="Min size" onChange={e => {
                    if (e.target.value !== "") {
                        setMinSize(e.target.value)
                    } else {
                        setMinSize(null)
                    }
                }}/>
                <input type="text" name="max-size" placeholder="Max size" onChange={e => {
                    if (e.target.value !== "") {
                        setMaxSize(e.target.value)
                    } else {
                        setMaxSize(null)
                    }
                }}/>
            </div>
            <button onClick={fetchPrice}>Search</button>
            {
                loading && <div className="loading">loading...</div>
            }
            {
                loaded && 
                <div className="avg-price"> 
                    Average price: {price}
                </div>
            }
        </div>
    )
}

export default PropertyPrices