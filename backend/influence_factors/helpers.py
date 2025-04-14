import re
import pandas as pd
from sklearn.linear_model import LinearRegression

"""
Args:
    df (pd.DataFrame): Input DataFrame.
    target_column (str): Column name of the target variable (e.g., "price").
    filter_column (str, optional): Column to apply filtering on (e.g., "type").
    filter_value (str, optional): Substring to match in filter_column (e.g., "House").
    drop_columns (list, optional): Columns to exclude from the model.

Returns:
    dict: Sorted dictionary of feature importances.
"""
def find_influence_factors(
    df: pd.DataFrame,
    target_column: str,
    filter_column: str = None,
    filter_value: str = None,
    drop_columns: list = None
):
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