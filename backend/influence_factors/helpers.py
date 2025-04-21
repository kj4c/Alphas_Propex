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
    # Optional filter
    if filter_column and filter_value:
        df = df[df[filter_column].astype(str).str.contains(filter_value, case=False, na=False)]

    # Drop irrelevant or specified columns
    if drop_columns:
        df = df.drop(columns=drop_columns, errors="ignore")

    # Drop rows with missing values
    df = df.dropna()

    # Check if target exists
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in dataframe.")

    # Separate features and target
    X = df.drop(columns=[target_column])
    y = df[target_column]

    # Convert categorical variables to dummy/one-hot encoding
    X = pd.get_dummies(X, drop_first=True)

    # Check if we have enough data to train
    if len(X) < 2 or X.shape[1] == 0:
        return {}

    # Train the model using Linear Regression
    model = LinearRegression()
    model.fit(X, y)

    # Get feature coefficients (importance) from the model
    feature_importance = pd.DataFrame(model.coef_, X.columns, columns=['Importance'])

    return dict(
        sorted(
            feature_importance.itertuples(index=True, name=None), 
            key=lambda x: abs(x[1]),    # Sort by absolute importance
            reverse=True
        )
    )