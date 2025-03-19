import { useEffect, useState } from "react"
import axios from 'axios'
const PropertyPrices = () => {
    const[loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [price, setPrice] = useState("")

    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [dateSoldAfter, setDateSoldAfter] = useState(null)
    const [dateSoldBefore, setDateSoldeBefore] = useState(null)
    const [suburb, setSuburb] = useState(null)
    const [numBath, setNumBath] = useState(null)
    const [numBed, setNumBed] = useState(null)
    const [numParking, setNumParking] = useState(null)
    const [minSize, setMinSize] = useState(null)
    const [maxSize, setMaxSize] = useState(null)
    const [type, setType] = useState(null)


    const fetchPrice = async () => {
        setLoading(true)
        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_prices",
            {
              id: "76d3b838-5880-4320-b42f-8bd8273ab6a0",
            },
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
                    <input type="text" name="sold-before" placeholder="Date sold before:" onChange={e => {
                        if (e.target.value !== "") {
                            setDateSoldeBefore(e.target.value)
                        } else {
                            setDateSoldeBefore(null)
                        }
                }}/>
            </div>
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