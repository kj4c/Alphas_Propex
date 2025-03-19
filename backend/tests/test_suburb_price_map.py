import sys
import unittest
import io
import pandas as pd
from backend.suburb_price_map.helpers import suburb_price_map

class TestInvestmentPotential(unittest.TestCase):
    def setUp(self):

        # dataframe for testing investment potential
        test_data = """
            price,suburb,suburb_lat,suburb_lng
            530000,Kincumber,-33.47252,151.40208
            525000,Halekulani,-33.21772,151.55237
            480000,Chittaway Bay,-33.32678,151.44557
            750000,Parramatta,-34.05375,150.83957
            680000,Chatswood,-33.45608,151.43598
        """
        self.df = pd.read_csv(io.StringIO(test_data))
        self.df.columns = self.df.columns.str.strip()
    
    def test_return_type(self):
        result = suburb_price_map(self.df)
        self.assertIsInstance(result, str)
        self.assertIn('<div', result.lower())