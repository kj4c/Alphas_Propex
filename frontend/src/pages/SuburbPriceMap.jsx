import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
const SuburbPriceMap = () => {
    const [loading, setLoading] = useState(false);
    const [ret, setRet] = useState(null);
    const [id, setId] = useState(null)
    const fetchData = async () => {
        if (id == null) {
            alert("missing id")
            return
        }
        setLoading(true)
        const requestBody = {
            id: id,
            function_name: "suburb_price_map",
        };

        const response = await axios.post(
            "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/suburb_price_map",
            requestBody,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        setLoading(false)
        console.log(response)
        setRet(response.data)
    }

    return (
      <div className="page">
        <h1>Median price by suburb</h1>
        {
            loading && <p>Loading...</p>
        }
        {
            !ret ? (
                <>
                    <p>Id:</p>
                    <BasicInput type="text" name="id" placeholder="Id" onChange={e => {
                        if (e.target.value !== "") {
                            setId(e.target.value)
                        } else {
                            setId(null)
                        }
                    }}/>
                    <RunButton onClick={fetchData} text={"Submit"}></RunButton>
                </>
            ): (
                <div
                dangerouslySetInnerHTML={{__html: ret}}
                />
            )
        }
        
      </div>
    )
}

export default SuburbPriceMap