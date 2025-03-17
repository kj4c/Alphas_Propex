import unittest
import io
import pandas as pd
from backend.top_school_area.helpers import top_school_area

class TestTopSchoolArea(unittest.TestCase):
    def setUp(self):
        self.test_data = """
            suburb_lat,suburb_lng,price,suburb_median_income
            -34.003705,151.221169,700000,36764
            -34.003707,151.221168,810000,36764
            -34.003705,151.221169,700000,28888
            -33.962827,151.109808,670000,40000
            -33.972517,151.099252,100000,40000
            -33.820422,151.211542,900000,70000
        """
        self.df = pd.read_csv(io.StringIO(self.test_data))

    
    def test_top_school(self):
        res = top_school_area(self.df, "Secondary School", "South Eastern Sydney", 10)
        self.assertGreater(len(res), 0)
        self.assertIn("school", res)
        self.assertIn("num_properties", res)
        self.assertIn("avg_property_price", res)
        self.assertIn("avg_suburb_median_income", res)
    
    def test_top_school_error(self):
        res = top_school_area(self.df, "ERROR", "South Eastern Sydney", 10)
        self.assertEqual(res, "error: Invalid School Type")
        res = top_school_area(self.df, "Secondary School", "South Eastern", 10)
        self.assertEqual(res, "error: Invalid district")

