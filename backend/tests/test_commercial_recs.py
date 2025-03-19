import io
import sys
import json
import pandas as pd
import unittest
from unittest.mock import patch
from backend.commercial_recs.handler import lambda_handler
from backend.commercial_recs.helpers import find_commerical_recs
import os

# Add parent directory to sys.path so imports work
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)
    
class TestCommercialRecs(unittest.TestCase):

    def setUp(self):

        # datafram for testing commericial reccomendations
        self.test_data = """
        suburb,suburb_median_income,suburb_sqkm,suburb_population
        Bensville,36764,4.925,2545
        Narara,34632,8.242,7934
        Putney,44876,1.508,4107
        Hornsby,38792,8.386,22168
        Killara,49452,4.632,10574
        Glenfield,37024,6.995,9633
        Punchbowl,22048,4.323,20236
        Eastwood,39876,7.342,16489
        Ingleburn,33124,12.454,15039
        Penrith,32240,12.202,13295
        """

        self.df = pd.read_csv(io.StringIO(self.test_data))

    
    
    def test_basic_functionality(self):

        # test if the function works lol

        result = find_commerical_recs(self.df.copy())
        self.assertIsInstance(result, pd.DataFrame)
        self.assertIn("suburb", result)
        self.assertIn("suburb_median_income", result)
        self.assertIn("population_density", result)
        self.assertGreater(len(result), 0)

    def test_ranking_order(self):
    
        # tests whether the commercial recommendations are ranked correctly.

        result = find_commerical_recs(self.df.copy())
        scores = result["suburb_median_income"].values
        self.assertTrue(all(scores[i] >= scores[i + 1] for i in range(len(scores) - 1)))
    
    def test_handle_missing_values(self):

        # tests whether the function can handle missing values

        df_missing = self.df.copy()
        df_missing.loc[0, "suburb_median_income"] = None
        result = find_commerical_recs(df_missing)
        self.assertIsInstance(result, pd.DataFrame)
        self.assertGreater(len(result), 0)

    def test_empty_dataframe(self):
        
        # tests the function behavior when given an empty df

        df_empty = pd.DataFrame(columns=self.df.columns)
        result = find_commerical_recs(df_empty)
        self.assertEqual(len(result), 0)

    def test_handle_zero_sqkm(self):

        # tests how the function handles cases where suburb_sqkm is 0

        df_zero_sqkm = self.df.copy()
        df_zero_sqkm.loc[0, "suburb_sqkm"] = 0
        result = find_commerical_recs(df_zero_sqkm)
        self.assertIsInstance(result, pd.DataFrame)
        self.assertGreater(len(result), 0)

    def test_normalization_effect(self):
        
        # tests whether the function normalizes the scores correctly

        result = find_commerical_recs(self.df.copy())
        self.assertFalse(any(result["suburb_median_income"] == 100))
        self.assertFalse(any(result["suburb_median_income"] == 0))
    
    def test_tiebreaker_handling(self):

        # tests how the function handles cases where two suburbs have the same score

        df_tiebreaker = self.df.copy()
        df_tiebreaker.loc[0, "suburb_median_income"] = 100
        df_tiebreaker.loc[1, "suburb_median_income"] = 100
        result = find_commerical_recs(df_tiebreaker)
        self.assertIsInstance(result, pd.DataFrame)
        self.assertGreater(len(result), 0)
    
    def test_missing_columns(self):

        # tests how the function handles cases where columns are missing
        df_missing = self.df.drop(columns=["suburb_median_income"])
        with self.assertRaises(ValueError) as e:
            find_commerical_recs(df_missing)
        
        self.assertEqual(str(e.exception), "Missing required columns")

class TestLambda(unittest.TestCase):

    # Simulate what AWS passes in a real event
    event = {
        "body": json.dumps({ "id": "76d3b838-5880-4320-b42f-8bd8273ab6a0" }),  # 👈 this simulates what API Gateway sends
    }

    # Simulate a Lambda context object (optional if you don't use it)
    context = {}

    # Run the lambda locally
    response = lambda_handler(event, context)

    # Pretty print the result
    print(json.dumps(response, indent=2))


if __name__ == "__main__":
    unittest.main()

