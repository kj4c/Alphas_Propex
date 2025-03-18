# import unittest
# import pandas as pd 
# import json
# from unittest.mock import patch
# from backend.property_affordability_index.handler import lambda_handler
# from backend.property_affordability_index.helpers import find_property_price_index

# # import boto3
# # def to_dataframe(id):
# #     response = fetch_data(id)
    
# #     if response["statusCode"] != 200:
# #         raise ValueError(f"Failed to fetch data: {response['body']}")
    
# #     events = response["body"].get("events", [])

# #     flattened_events = []
# #     for event in events:
# #         flattened_event = {
# #             "date_sold": pd.to_datetime(event["time_object"]
# #             ["timestamp"], format='%d/%m/%y')
# #         }

# #         flattened_event.update(event["attribute"])

# #         flattened_events.append(flattened_event)

# #     df = pd.DataFrame(flattened_events)
# #     df.columns = df.columns.str.strip()

# #     return df

# # BUCKET_NAME = "alpha-raw-data-bucket"
# # s3 = boto3.client('s3')

# # def fetch_data(id):
# #     try:
# #         response = s3.get_object(
# #             Bucket=BUCKET_NAME,
# #             Key=f"{id}.json"
# #         )
# #         data = response['Body'].read().decode('utf-8').strip()

# #         parsed_data = json.loads(data)

# #         return {
# #             "statusCode": 200,
# #             "body": parsed_data
# #         }

# #     except s3.exceptions.NoSuchKey:
# #         return {
# #             "statusCode": 404,
# #             "body": {"error": "Data not found"}
# #         }
# #     except Exception as e:
# #         return {
# #             "statusCode": 500,
# #             "body": {"error": str(e)}
# #         }


# # def lambda_handler(event, context):
# #     """
# #     Lambda function entry point.
# #     @event:
# #     @context:
# #     @return:
# #     """

# #     try:
# #         body = event.get("body")
# #         if not body:
# #             raise ValueError("Missing 'body' in event")

# #         if isinstance(body, str):
# #             data = json.loads(body)
# #             if isinstance(data, str):
# #                 data = json.loads(data)
# #         elif isinstance(body, dict):
# #             data = body
# #         else:
# #             raise ValueError("Unrecognized body format")
        
# #         print("DEBUG Raw body:", body)
# #         print("DEBUG Parsed data:", data)
# #         print("DEBUG Type of data:", type(data))

# #         if "id" not in data:
# #             raise ValueError("Missing 'id' in body")
        
# #         property_price_index = find_property_price_index(data['id']).to_json(orient='records')
# #         return {
# #             "statusCode": 200,
# #             "body": property_price_index
# #         }
# #     except Exception as e:
# #         return {
# #             "statusCode": 400,
# #             "body": json.dumps({"error": str(e)})
# #         }


# # def find_property_price_index(data_id):
# #     data = to_dataframe(data_id)
# #     # Affordability Index = (Suburb Median Income * 100)/ (Price Per SQM)
# #     # where Price Per SQM = (Median Property Price/ Median Property Size)

# #     # We calculated the price affordability index by fisrt considering the price per square meter

# #     # calculate the median property price of each suburb
# #     median_price = data.groupby('suburb')['price'].median()
# #     # calculate the median property size of each sububurb
# #     median_prop_size = data.groupby('suburb')['property_size'].median()
# #     # merging both dataframes to calculate price per sqm
# #     res = pd.merge(median_price, median_prop_size, on='suburb')
# #     res['price_per_sqm'] = res['price'] / res['property_size']

# #     # calculate median income
# #     median_income = data[['suburb', 'suburb_median_income']].groupby('suburb')['suburb_median_income'].first()
# #     res = pd.merge(res, median_income, on='suburb')

# #     # calculating raw affordability index
# #     res['affordability_index'] = (res['suburb_median_income'] * 100) / res['price_per_sqm']

# #     # Afeter calculating the affordability index for each suburb, we can normalise data by
# #     # Normalised Score = ((Raw Index - Min Index)/ (Max Idex - Min Index)) * 100
# #     min_afford_index = res['affordability_index'].min()
# #     max_afford_index = res['affordability_index'].max()
# #     diff = max_afford_index - min_afford_index

# #     res['norm_affordability_index'] =((res['affordability_index'] - min_afford_index)/(diff)) * 100
# #     res = res.reset_index()
# #     res = res[['suburb', 'norm_affordability_index']]

# #     return res.sort_values('norm_affordability_index', ascending=False)


# # Verifies that the lambda function correctly processes input and calls 
# # find_property_price_index
# class TestLambdaHandler(unittest.TestCase) :
#     @patch('helpers.find_property_price_index')
#     def test_lambda_handler_sucess(self, mock_find_property_price_index):
#         mock_find_property_price_index.return_value = pd.DataFrame({
#             'suburb' : ['Bondi', 'Newtown'],
#             'norm_affordability_index': [85.0, 60.5]
#         })
        
#         event = {
#             "body": json.dumps({"id": "test_data_id"})
#         }
#         response = lambda_handler(event, None)
        
#         self.assertEqual(response["statusCode"], 200)
#         self.assertIn("Bondi", response["body"])
#         self.assertIn("Newtown", response["body"])
        
#     def test_lambda_handler_missing_body(self):
#         event = {}
#         response = lambda_handler(event, None)
#         self.assertEqual(response['statusCode'], 400)
#         self.assertIn("Missing 'body' in event", response['body'])
    
#     def test_lambda_handler_invalid_json(self):
#         event = {"body": 1}
#         response = lambda_handler(event, None)
#         self.assertEqual(response["statusCode"], 400)
#         self.assertIn("Unrecognized body format", response["body"])

#     def test_lambda_handler_missing_id(self):
#         event = {"body": json.dumps({})}
#         response = lambda_handler(event, None)
#         self.assertEqual(response['statusCdoe'], 400)
#         self.assertIn("Missing 'id' in body")
        

# # Ensures that the affordability index is calculated correctly nased on median price,
# # size and income, and price per sqm 
# class TestFindPropertyPriceIndex(unittest.TestCase):
#     @patch('helpers.to_dataframe')
#     def test_find_property_price_index(self, mock_to_dataframe):
#         mock_to_dataframe.return_value = pd.DataFrame({
#             'suburb': ['Bondi', 'Bondi', 'Newtown', 'Newtown'],
#             'price': [1000000, 1200000, 950000, 1500000],
#             'property_size': [150, 200, 120, 250],
#             'suburb_median_income': [75000, 75000, 65000, 65000]
#         })
        
#         result = find_property_price_index("test_data_id")
#         self.assertEqual(len(result), 2)
#         self.assertIn('suburb', result.columns)
#         self.assertIn('norm_affordability_index', result.columns)
        
#         # Check that the affordability index is computed correctly 
#         self.assertTrue(result['norm_affordability_index'].between(0, 100).all())
        
#         @patch('helpers.to_dataframe')
#         def test_find_property_price_index_empty_data(self, mock_to_dataframe):
#             mock_to_dataframe.return_value = pd.DataFrame(columns=['suburb', 'price', 'property_size', 'suburb_median_income'])
        
#             result = find_property_price_index("test_data_id")
#             self.assertEqual(len(result), 0)  # Should return an empty DataFrame

import sys
sys.path.append('../..')
import unittest
import io
import pandas as pd
from backend.property_prices.helpers import avg_property_price

class TestPropertyPrices(unittest.TestCase):
    def setUp(self):
        # Sample data for testing
        self.test_data = """
            price,date_sold,suburb,num_bath,num_bed,num_parking,property_size,type
            1000000,15/01/2023,Bondi,2,3,1,150,House
            800000,20/02/2023,Surry Hills,1,2,0,85,Apartment
            1200000,10/03/2023,Bondi,3,4,2,200,House
            950000,05/04/2023,Newtown,2,3,1,120,Townhouse
            1500000,12/05/2023,Paddington,3,5,2,250,House
            750000,18/06/2023,Surry Hills,1,1,0,60,Apartment
        """

        self.df = pd.read_csv(io.StringIO(self.test_data))
        self.df.columns = self.df.columns.str.strip()
        self.df["date_sold"] = pd.to_datetime(self.df["date_sold"], format='%d/%m/%Y')
        
    def test_no_filters(self):
        # Call function with no filters
        result = avg_property_price(self.df.copy(), None)
        
        # Expected average calculation
        expected_avg = float(1000000 + 800000 + 1200000 + 950000 + 1500000 + 750000) / 6
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_price_range_filter(self):
        # Filter by price range
        filters = {
            "price_range": {"min_price": 1000000, "max_price": 1500000},
            "date_range": None,
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering
        expected_avg = float(1000000 + 1200000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_suburb_filter(self):
        # Filter by suburb
        filters = {
            "price_range": None,
            "date_range": None,
            "suburb": "Bondi",
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering - matching the original function's behavior
        expected_avg = float(1000000 + 1200000) / 2
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_property_features_filter(self):
        # Filter by property features
        filters = {
            "price_range": None,
            "date_range": None,
            "suburb": None,
            "property_features": {"num_bath": 2, "num_bed": 3, "num_parking": 1},
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        expected_avg = float(1000000 + 1200000 + 950000 + 1500000) / 4
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_property_type_filter(self):
        # Filter by property type
        filters = {
            "price_range": None,
            "date_range": None,
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": "House"
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering
        expected_avg = float(1000000 + 1200000 + 1500000) / 3
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_multiple_filters(self):
        # Apply multiple filters
        filters = {
            "price_range": {"min_price": 900000, "max_price": None},
            "date_range": None,
            "suburb": None,
            "property_features": {"num_bath": 2, "num_bed": None, "num_parking": None},
            "property_size": None,
            "property_type": "House"
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering
        expected_avg = float(1000000 + 1200000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_empty_result(self):
        # Apply filters that should return empty result
        filters = {
            "price_range": {"min_price": 2000000, "max_price": None},
            "date_range": None,
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        result = avg_property_price(self.df.copy(), filters)

        self.assertEqual(result, 0)
        
    def test_date_range_filter(self):
        # Filter by date range
        filters = {
            "price_range": None,
            "date_range": {"date_sold_after": "2023/03/01", "date_sold_before": "2023/05/31"},
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering - matching the original function's behavior
        expected_avg = float(1200000 + 950000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)