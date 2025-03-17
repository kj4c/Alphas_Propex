import sys
import unittest
import io
import pandas as pd
from backend.investment_potential.helpers import investment_potential

class TestInvestmentPotential(unittest.TestCase):
    def setUp(self):

        # dataframe for testing investment potential
    
        self.test_data = """
            price,property_inflation_index,suburb_median_income,km_from_cbd,suburb
            530000,150.9,29432,47.05,Kincumber
            525000,140.2,24752,78.54,Halekulani
            480000,160.5,31668,63.59,Chittaway Bay
            750000,135.7,35000,22.7,Parramatta
            680000,142.3,27000,35.0,Chatswood
        """
        self.df = pd.read_csv(io.StringIO(self.test_data))
    
    def test_basic_functionality(self):

        # test if the function works lol
        
        result = investment_potential(self.df.copy())
        self.assertIsInstance(result, pd.DataFrame)
        self.assertIn("suburb", result)
        self.assertIn("investment_score", result)
        self.assertGreater(len(result), 0)
    
    def test_ranking_order(self):

        # tests whether the investment potential scores are ranked correctly.

        result = investment_potential(self.df.copy())
        scores = result["investment_score"].values
        self.assertTrue(all(scores[i] >= scores[i + 1] for i in range(len(scores) - 1)))
    
    def test_handle_missing_values(self):

        # tests whether the function can handle missing values

        df_missing = self.df.copy()
        df_missing.loc[0, "property_inflation_index"] = None
        df_missing.loc[1, "suburb_median_income"] = None
        result = investment_potential(df_missing)
        self.assertIsInstance(result, pd.DataFrame)
        self.assertGreater(len(result), 0)
    
    def test_empty_dataframe(self):

        # tests the function behavior when given an empty df

        df_empty = pd.DataFrame(columns=self.df.columns)
        result = investment_potential(df_empty)
        self.assertEqual(len(result), 0)
    
    def test_handle_zero_km_from_cbd(self):

        # tests how the function handles cases where km_from_cbd is 0

        df_zero_km = self.df.copy()
        df_zero_km.loc[0, "km_from_cbd"] = 0
        result = investment_potential(df_zero_km)
        self.assertIsInstance(result, pd.DataFrame)
        self.assertGreater(len(result), 0)
    
    def test_normalization_effect(self):

        # tests whether the function normalizes the scores correctly

        result = investment_potential(self.df.copy())
        self.assertFalse(any(result["investment_score"] == 100))
        self.assertFalse(any(result["investment_score"] == 0))
    
    def test_tiebreaker_handling(self):

        # tests how the function handles cases where multiple suburbs have the same score.

        df_tie = self.df.copy()
        df_tie.loc[:, "property_inflation_index"] = 150
        df_tie.loc[:, "suburb_median_income"] = 30000
        result = investment_potential(df_tie)
        self.assertEqual(len(result), len(df_tie))
        scores = result["investment_score"].values
        self.assertTrue(all(scores[i] >= scores[i + 1] for i in range(len(scores) - 1)))