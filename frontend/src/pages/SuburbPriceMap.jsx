const SuburbPriceMap = () => {
    return (
      <div className="page">
        <h1>Median price by suburb</h1>
        <iframe
          src="./map.html"
          style={{ width: "100%", height: "60vh", border: "none" }}
          title="HTML Content"
        />
      </div>
    )
}

export default SuburbPriceMap