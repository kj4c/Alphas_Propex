import sys
sys.path.append('../..')
import unittest
import io
import pandas as pd
from backend.price_prediction.helpers import model_prediction
from backend.classes import PropertyType

class TestPricePrediction(unittest.TestCase):
    def setUp(self):
        self.df = pd.read_csv('test_data/domain_properties.csv')
        self.df["date_sold"] = pd.to_datetime(self.df["date_sold"], format='%d/%m/%y')
        
    def test_model_return(self):
        result = model_prediction(df=self.df, property_type=PropertyType.HOUSE, suburb="North Rocks")

        self.assertIsNotNone(result)