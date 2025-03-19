import sys
import unittest
import os
import pandas as pd
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.price_prediction.helpers import model_prediction
# Add parent directory to sys.path so imports work
class TestPricePrediction(unittest.TestCase):
    def setUp(self):
        self.df = pd.read_csv('test_data/domain_properties.csv')
        self.df["date_sold"] = pd.to_datetime(self.df["date_sold"], format='%d/%m/%y')
        
    def test_model_return(self):
        result = model_prediction(df=self.df, property_type="House", suburb="North Rocks")

        self.assertIsNotNone(result)