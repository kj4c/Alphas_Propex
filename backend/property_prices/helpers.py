# Sample filters input
# 1. Filters that are strings will be filtered for that specific type
# 2. Filters that are dictionaries (of min/max) will be filtered for that specific range

# filters = {
#     "suburb": string,
#     "date_sold": {
#       "min": date_object,
#       "max": date_object,
#     },
#     "price": {
#       "min": int,
#       "max": int,
#     }
# }
def avg_property_price(df, filters=None):
    if filters is not None:
        for key, condition in filters.items():
            if key not in df.columns: continue

            if isinstance(condition, dict):
                # Apply range filter using "min" and/or "max"
                if "min" in condition and condition["min"] is not None:
                    df = df[df[key] >= condition["min"]]
                if "max" in condition and condition["max"] is not None:
                    df = df[df[key] <= condition["max"]]
            else:
                # Apply exact match filter
                df = df[df[key] == condition]

    return float(df["price"].mean()) if not df.empty else 0