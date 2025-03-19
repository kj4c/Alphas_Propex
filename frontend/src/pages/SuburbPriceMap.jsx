import React, { useEffect, useState } from "react";
const SuburbPriceMap = () => {
    const [htmlContent, setHtmlContent] = useState("");
    useEffect(() => {
        const fetchHtml = async () => {
          try {
            const response = await fetch("../components/map.html"); // Adjust the path if necessary
            const text = await response.text();
            setHtmlContent(text);
          } catch (error) {
            console.error("Error fetching the HTML file:", error);
          }
        };
    
        fetchHtml();
      }, []);
    return (
        <iframe
          src="./map.html" // Assuming it's in the public folder
          style={{ width: "100%", height: "60vh", border: "none" }}
          title="HTML Content"
        />
    )
}

export default SuburbPriceMap