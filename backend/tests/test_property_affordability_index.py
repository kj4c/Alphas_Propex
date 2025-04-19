import sys 
sys.path.append('../..')
import unittest
import pandas as pd
from backend.property_affordability_index.helpers import find_property_price_index

# # Ensures that the affordability index is calculated correctly nased on median price,
# # size and income, and price per sqm 
class TestFindPropertyPriceIndex(unittest.TestCase):
    def test_find_property_price_index(self):
        self.test_data = pd.DataFrame({
            'suburb': ['Bondi', 'Bondi', 'Newtown', 'Newtown'],
            'price': [1000000, 1200000, 950000, 1500000],
            'property_size': [150, 200, 120, 250],
            'suburb_median_income': [75000, 75000, 65000, 65000],
            'suburb_lat': [100, 100, 100, 100],
            'suburb_lng': [100, 100, 100, 100]
        })
        
        result = find_property_price_index(self.test_data, None)
        self.assertIsInstance(result, dict)
        self.assertIn('affordability_data', result)
        self.assertIn('map_html', result)
        
        affordability_data = result["affordability_data"]
        self.assertIsInstance(affordability_data, list)
        self.assertEqual(len(affordability_data), 4)
        self.assertIn('suburb', affordability_data[0])
        self.assertIn('norm_affordability_index', affordability_data[1])
        self.assertTrue(affordability_data['norm_affordability_index'].between(0, 100).all())
        
        map_html = result["map_html"]
        self.assertIsInstance(map_html, str)
        
        
    def test_find_property_price_index_income(self):
        self.test_data = pd.DataFrame({
            'suburb': ['Bondi', 'Bondi', 'Newtown', 'Newtown'],
            'price': [1000000, 1200000, 950000, 1500000],
            'property_size': [150, 200, 120, 250],
            'suburb_median_income': [75000, 75000, 65000, 65000]
        })
        
        user_income = 80000
        result = find_property_price_index(self.test_data, user_income)
        self.assertEqual(len(result), 2)
        self.assertIn('suburb', result.columns)
        self.assertIn('norm_affordability_index', result.columns)
        
        # Check that the affordability index is computed correctly 
        self.assertTrue(result['norm_affordability_index'].between(0, 100).all())
