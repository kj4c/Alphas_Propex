import os
import unittest
import pandas as pd
from backend.influence_factors.helpers import find_influence_factors

class TestPropertyPrices(unittest.TestCase):
    def setUp(self):
        file_path = os.path.join(os.path.dirname(__file__), 'test_data', 'domain_properties.csv')
        self.df = pd.read_csv(file_path)
        self.df.columns = self.df.columns.str.strip()
        
    def test_house(self):
        result = find_influence_factors(df=self.df.copy(), property_type="House")

        self.assertTrue(isinstance(result, dict))

    def test_vacant_land(self):
        result = find_influence_factors(df=self.df.copy(), property_type="Vacant land")

        self.assertTrue(isinstance(result, dict))

    def test_townhouse(self):
        result = find_influence_factors(df=self.df.copy(), property_type="Townhouse")

        self.assertTrue(isinstance(result, dict))

    def test_apartment(self):
        result = find_influence_factors(df=self.df.copy(), property_type="Apartment")

        self.assertTrue(isinstance(result, dict))

    def test_flat(self):
        result = find_influence_factors(df=self.df.copy(), property_type="Flat")

        self.assertTrue(isinstance(result, dict))

    def test_semi_detached(self):
        result = find_influence_factors(df=self.df.copy(), property_type="Semi-Detached")

        self.assertTrue(isinstance(result, dict))

    def test_new_house_and_land(self):
        result = find_influence_factors(df=self.df.copy(), property_type="New House & Land")

        self.assertTrue(isinstance(result, dict))

    def test_duplex(self):
        result = find_influence_factors(df=self.df.copy(), property_type="Duplex")

        self.assertTrue(isinstance(result, dict))