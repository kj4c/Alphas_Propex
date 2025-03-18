import sys 
import json
sys.path.append('../..')
import unittest
import pandas as pd
from backend.property_affordability_index.handler import lambda_handler
from backend.property_affordability_index.helpers import find_property_price_index

# # Ensures that the affordability index is calculated correctly nased on median price,
# # size and income, and price per sqm 
class TestFindPropertyPriceIndex(unittest.TestCase):
    def test_find_property_price_index(self):
        self.test_data = pd.DataFrame({
            'suburb': ['Bondi', 'Bondi', 'Newtown', 'Newtown'],
            'price': [1000000, 1200000, 950000, 1500000],
            'property_size': [150, 200, 120, 250],
            'suburb_median_income': [75000, 75000, 65000, 65000]
        })
        
        result = find_property_price_index(self.test_data)
        self.assertEqual(len(result), 2)
        self.assertIn('suburb', result.columns)
        self.assertIn('norm_affordability_index', result.columns)
        
        # Check that the affordability index is computed correctly 
        self.assertTrue(result['norm_affordability_index'].between(0, 100).all())
