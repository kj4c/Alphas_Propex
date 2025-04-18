import { useState } from "react";
import axios from "axios";
import RunButton from "../components/Buttons";
import BasicInput from "../components/Inputs";
import Panel from "@/components/Blocks";
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
      <div className="page mx-auto w-full max-w-[95vw] px-6 py-10 flex flex-col gap-6">
        <Panel
            title="Suburb Median Prices"
            description={"Heatmap of the median prices of properties in each Sydney Suburb"}
        >
            {
                loading && <p>Loading...</p>
            }
            {
                !ret ? (
                    <>
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
                    className="w-[80%] h-fit overflow-auto border rounded-lg shadow p-10 bg-[#1e1a36]"
                    dangerouslySetInnerHTML={{__html: ret}}
                    />
                )
            }
        </Panel>
      </div>
    )
}

export default SuburbPriceMap