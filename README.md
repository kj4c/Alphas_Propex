# 🏠 Alphas ESG API — Propex

Welcome to the **Alphas ESG API**, a property data analysis service built as part of the **SENG3011 project**.

## 📊 Introducing Propex  
**Propex** is a powerful property analysis API that takes in event stream data (in JSON format) and provides meaningful insights to help users understand market trends, property affordability, commercial viability, and livability across suburbs.

---

## 🚀 Getting Started

### 🔧 Build the Docker Image

To get started locally, simply build the Docker image from the project root:

```bash
docker build -t alphas-esg-backend .
```

To access the container run this

```bash
docker run -it --rm alphas-esg-backend
```

---

## 📤 Uploading Your Data

You can upload your data using our `/upload_data` endpoint.  
Attach your JSON file during the request, and you'll receive a **dataset ID** in response.

## 📤 Uploading Data

To use our analysis services, you must first upload your dataset by calling the `/upload_data` endpoint and attaching your JSON file.

The uploaded data **must follow this format** where every event is an entry for a property:
```json
{
  "data_source": "real_estate_data",
  "dataset_type": "property_sales",
  "dataset_id": "http://bucket-name.s3-website-Region.amazonaws.com",
  "time_object": {
    "timestamp": "2025-03-16T19:19:02.171400",
    "timezone": "GMT+11"
  },
  "events": [
    {
      "time_object": {
        "timestamp": "13/1/16",
        "duration": 1,
        "duration_unit": "day",
        "timezone": "GMT+11"
      },
      "event_type": "property_sale",
      "attribute": {
        "price": 530000.0,
        "suburb": "Kincumber",
        "num_bath": 4,
        "num_bed": 4,
        "num_parking": 2,
        "property_size": 1351.0,
        "type": "House",
        "suburb_population": 7093,
        "suburb_median_income": 29432.0,
        "suburb_sqkm": 9.914,
        "suburb_lat": -33.47252,
        "suburb_lng": 151.40208,
        "suburb_elevation": 24.0,
        "cash_rate": 2.0,
        "property_inflation_index": 150.9,
        "km_from_cbd": 47.05
      }
    }
  ]
}
```

Use this **ID** as input for any of our analysis functions so we know which dataset you'd like us to process.
Please keep this **ID** for now as we have not set up a way to refetch your ID.

---

## 📚 Explore Our API Documentation

View the full Swagger API documentation here:  
🔗 [SwaggerHub – Propex Property Analysis](https://app.swaggerhub.com/apis/LOWKHYEJAC/PropexPropertyAnalysis/1.0.0)

---

## 🧠 Core Features

Our API offers a variety of powerful analysis endpoints, including:

- ✅ **`commercial_recs`**  
  Recommend optimal areas for businesses to set up based on commercial property trends.

- 💰 **`property_affordability_index`**  
  Analyze affordability across suburbs to find the most cost-effective areas.

- 📈 **`property_prices`**  
  Calculate average property prices based on filters such as suburb and property type.

- 🏡 **`suburb_livability_score`**  
  Score suburbs based on livability metrics like income, pricing, and access to services.

- 🗺️ **`suburb_price_map`**  
  Generate a heatmap visualizing average property prices across Sydney suburbs.

- 🏫 **`top_school_area`**  
  Given a school type, district, and radius, find the best suburbs around top schools, including property counts, average price, and income levels.

---

## 💻 Frontend Web Interface

Explore the visual frontend for our API here:  
🌐 [https://alphas-esg-api.vercel.app/](https://alphas-esg-api.vercel.app/)

---

## 💬 Questions or Feedback?

Please email: z5428854@ad.unsw.edu.au for any questions (note some features may not be working fully and we are actively trying to solve it)
