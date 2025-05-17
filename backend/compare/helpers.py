from sqlalchemy import text

def retrieve_data(engine, suburb):
    """
    Retrieve real estate and demographic data for a specific suburb.

    This helper function queries the database for a given suburb and returns 
    a dictionary of metrics such as postcode, state, number of properties, 
    average property size, inflation index, population, and median income.

    This function is intended to be used internally by higher-level functions 
    such as `compare`, and can be called repeatedly to build up a comparison dataset.

    Args:
        engine (sqlalchemy.Engine): A SQLAlchemy engine connected to the database.
        suburb (str): The name of the suburb to retrieve data for (case-insensitive).

    Returns:
        dict: A dictionary containing key metrics for the suburb

        Example:
        >>> retrieve_data(engine, 'Epping')
        {
            'Postcode': 2121,
            'State': 'NSW',
            'Number of Properties': 148,
            'Average Property Size': 134.2,
            'Average Inflation Index': 1.15,
            'Population': 23456,
            'Median Income': 84200.0
        }

    Raises:
        ValueError: If no data is found for the given suburb.
    """

    query = """
        SELECT 
            loc.suburb, 
            loc.postcode,
            loc.state,
            COUNT(prop.id) AS num_properties,
            AVG(prop.property_size) AS avg_property_size,
            AVG(prop.inflation_index) AS avg_inflation_index,
            loc.population,
            loc.median_income
        FROM 
            location loc
        LEFT JOIN
            property prop ON prop.location_id = loc.id
        WHERE
            loc.suburb = :suburb
        GROUP BY
            loc.suburb, loc.postcode, loc.state, loc.population, loc.median_income
        LIMIT 1
    """

    with engine.connect() as connection:
        result = connection.execute(text(query), {"suburb": suburb.lower()})
        row = result.fetchone()

        if not row:
            raise ValueError(f"No data found for suburb: {suburb}")

        return {
            'Postcode': row.postcode,
            'State': row.state,
            'Number of Properties': row.num_properties,
            'Average Property Size': float(row.avg_property_size) if row.avg_property_size is not None else None,
            'Average Inflation Index': float(row.avg_inflation_index) if row.avg_inflation_index is not None else None,
            'Population': row.population,
            'Median Income': float(row.median_income) if row.median_income is not None else None
        }

def compare(engine, suburb_list):
    """Compare key real estate and safety metrics across multiple suburbs.

    This function retrieves metrics such as average real estate price, average price per square foot,
    and crime rate for each suburb provided. It returns a side-by-side comparison where each metric
    is a dictionary mapping suburb names to their respective values. City-wide averages are also included
    under the label 'City Average' for reference.

    Args:
        engine (sqlalchemy.Engine): A SQLAlchemy engine connected to the database.
        suburb_list (list of str): A list of suburb names (case-sensitive).

    Returns:
        dict: A dictionary where each key is a metric such as average real estate price, 
            average price per sqft, etc, and the value is a dictionary of 
            suburb and their respective values.

    Raises:
        ValueError: If the input is empty or contains invalid suburb names.

    Example:
        >>> compare(['Epping', 'Haymarket', 'Surry Hills'])
        {
            'Average real estate price': {
                'Epping': 1230000,
                'Haymarket': 1000000,
                'Surry Hills': 1320000
            },
            'Average price per sqft': {
                'Epping': 750,
                'Haymarket': 700,
                'Surry Hills': 720
            },
            'Crime rate': {
                'Epping': 'low',
                'Haymarket': 'high',
                'Surry Hills': 'medium'
            },
            ...
        }
    """

    if not isinstance(suburb_list, list): raise TypeError("suburb_list must be a list of strings")
    if not suburb_list: raise ValueError("suburb_list cannot be empty")
    if any(not isinstance(suburb, str) or not suburb.strip() for suburb in suburb_list): raise ValueError("suburb_list must contain non-empty strings only")

    # normalised_suburbs = [suburb.lower() for suburb in suburb_list]

    res = {
        'Postcode': {},
        'State': {},
        'Number of Properties': {},
        'Average Property Size': {},
        'Average Inflation Index': {},
        'Population': {},
        'Median Income': {}
    }

    for suburb in suburb_list:
        try:
            data = retrieve_data(engine, suburb)
            for metric, value in data.items():
                res[metric][suburb] = value
        except ValueError as e:
            pass

    if not res['Postcode']: raise ValueError("No valid suburbs found in the input list.")

    return res