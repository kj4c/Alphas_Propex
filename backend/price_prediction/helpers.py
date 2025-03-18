import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.arima.model import ARIMA
from backend.general_helpers import plot_to_base64

def apply_filters(df, property_type, suburb):
    filtered_df = df[(df['type'] == property_type) & (df['suburb'] == suburb)]

    columns_to_drop = [
        "num_bath",
        "num_bed",
        "num_parking",
        "property_size",
        "suburb_population",
        "suburb_median_income",
        "suburb_sqkm",
        "suburb_lat",
        "suburb_lng",
        "suburb_elevation",
        "cash_rate",
        "property_inflation_index",
        "km_from_cbd"
    ]

    filtered_df = filtered_df.drop(columns=columns_to_drop)
    return filtered_df

def apply_grouping(df):
    grouped_df = df.groupby(df["date_sold"].dt.to_period("M"))["price"].mean()

    return grouped_df

def model_prediction(df, property_type, suburb):
    df = apply_filters(df=df, property_type=property_type, suburb=suburb)
    df = apply_grouping(df)

    # Fit ARIMA model
    model = ARIMA(df, order=(5,1,0))  # Adjust (p,d,q) based on ACF/PACF analysis
    model_fit = model.fit()

    # Forecast future prices
    forecast_steps = 12  # Predicting for the next 12 months
    forecast = model_fit.forecast(steps=forecast_steps)

    # Ensure index is in timestamp format before plotting
    df.index = df.index.to_timestamp()

    # Plot actual vs. forecasted values
    plt.figure(figsize=(10,5))
    plt.plot(df, label="Actual Prices")
    plt.plot(pd.date_range(df.index[-1], periods=forecast_steps+1, freq='ME')[1:], forecast, label="Forecasted Prices", linestyle="dashed")
    plt.legend()

    current_figure = plt.gcf()
    return plot_to_base64(current_figure)