import sys
sys.path.append('../..')
import os
import unittest
import io
import pandas as pd
from backend.suburb_price_map.helpers import suburb_price_map

class TestInvestmentPotential(unittest.TestCase):
    def setUp(self):

        # dataframe for testing investment potential
        file_path = os.path.join(os.path.dirname(__file__), 'test_data', 'domain_properties.csv')
        self.df = pd.read_csv(file_path)
        self.df.columns = self.df.columns.str.strip()
    
    def test_return_type(self):
        result = suburb_price_map(self.df)
        self.assertIsInstance(result, str)
        self.assertIn('<div', result.lower())