import re
import pandas as pd
from sklearn.linear_model import LinearRegression

def find_influence_factors(df, property_type):
    df = df[df["type"].apply(lambda x: bool(re.search(f".*{property_type}.*", x, re.IGNORECASE)))]
    df = df.drop(columns=["date_sold", "suburb", "type"])

    X, y = df.drop('price', axis=1), df['price']

    if len(df) < 2:
        return {}

    # Train the model using Linear Regression
    model = LinearRegression()
    model.fit(X, y)

    # Get feature coefficients (importance) from the model
    feature_importance = pd.DataFrame(model.coef_, X.columns, columns=['Importance'])

    return dict(
        sorted(
            feature_importance.itertuples(index=True, name=None), 
            key=lambda x: x[1], 
            reverse=True
        )
    )