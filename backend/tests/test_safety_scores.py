import sys
sys.path.append('../..')
import os
import unittest
import pandas as pd
from backend.safety_scores.helpers import safety_scores

class TestSafetyScoresSingleSuburb(unittest.TestCase):
    def setUp(self):
        file_path = os.path.join(os.path.dirname(__file__), 'test_data', 'domain_properties.csv')
        self.df = pd.read_csv(file_path)
        self.df.columns = self.df.columns.str.strip()

    def test_returns_expected_columns(self):
        result = safety_scores(df=self.df.copy(), suburb="Fairlight")
        expected_columns = {"suburb", "safety_score", "median_price"}
        self.assertTrue(set(expected_columns).issubset(set(result.columns)))

    def test_suburb_name_matches(self):
        result = safety_scores(df=self.df.copy(), suburb="Miranda")
        self.assertTrue(result["suburb"].str.lower().eq("miranda").all())

    def test_handles_nonexistent_suburb(self):
        result = safety_scores(df=self.df.copy(), suburb="FakeSuburb")
        self.assertTrue(result.empty, "Result should be empty for nonexistent suburb")

