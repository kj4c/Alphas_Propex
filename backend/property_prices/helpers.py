def avg_property_price(df, filters=None):
    if filters is not None:
        # Filter by price range
        if (price_range := filters["price_range"]) is not None:
            if price_range["min_price"] is not None:
                df = df[df["price"] >= price_range["min_price"]]
            if price_range["max_price"] is not None:
                df = df[df["price"] <= price_range["max_price"]]

        # Filter by date of property sold
        if (date_range := filters["date_range"]) is not None:
            if date_range["date_sold_after"] is not None:
                df = df[df["date_sold"] >= date_range["date_sold_after"]]
            if date_range["date_sold_before"] is not None:
                df = df[df["date_sold"] <= date_range["date_sold_before"]]

        # Filter by suburb
        if (suburb := filters["suburb"]) is not None:
            df = df[df["suburb"] == suburb]

        # Filter by property features
        if (property_features := filters["property_features"]) is not None:
            if property_features["num_bath"] is not None:
                df = df[df["num_bath"] >= property_features["num_bath"]]
            if property_features["num_bed"] is not None:
                df = df[df["num_bed"] >= property_features["num_bed"]]
            if property_features["num_parking"] is not None:
                df = df[df["num_parking"] >= property_features["num_parking"]]

        # Filter by property size
        if (property_size := filters["property_size"]) is not None:
            if property_size["min_size"] is not None:
                df = df[df["property_size"] >= property_size["min_size"]]
            if property_size["max_size"] is not None:
                df = df[df["property_size"] >= property_size["max_size"]]

        # Filter by property type
        if (property_type := filters["property_type"]) is not None:
            df = df[df["type"].str.lower() == property_type.lower()]

    return float(df["price"].mean()) if not df.empty else 0