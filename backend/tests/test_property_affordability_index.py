# import unittest
# import pandas as pd 
# import json
# from backend.property_affordability_index.handler import lambda_handler
# from backend.property_affordability_index.helpers import find_property_price_index

import sys 
sys.path.append('../..')
import unittest
import pandas as pd
from backend.property_prices.helpers import avg_property_price
from backend.property_affordability_index.helpers import find_property_price_index
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
class TestFindPropertyPriceIndex(unittest.TestCase):
    def test_find_property_price_index(self):
        self.return_value = pd.DataFrame({
            'suburb': ['Bondi', 'Bondi', 'Newtown', 'Newtown'],
            'price': [1000000, 1200000, 950000, 1500000],
            'property_size': [150, 200, 120, 250],
            'suburb_median_income': [75000, 75000, 65000, 65000]
        })
        
        result = find_property_price_index("test_data_id")
        self.assertEqual(len(result), 2)
        self.assertIn('suburb', result.columns)
        self.assertIn('norm_affordability_index', result.columns)
        
        # Check that the affordability index is computed correctly 
        self.assertTrue(result['norm_affordability_index'].between(0, 100).all())
        
        def test_find_property_price_index_empty_data(self):
            self.return_value = pd.DataFrame(columns=['suburb', 'price', 'property_size', 'suburb_median_income'])
            result = find_property_price_index("test_data_id")
            self.assertEqual(len(result), 0)  # Should return an empty DataFrame

