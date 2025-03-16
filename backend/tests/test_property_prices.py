import sys
sys.path.append('../..')
import unittest
import io
import pandas as pd
from backend.property_prices.helpers import avg_property_price

class TestPropertyPrices(unittest.TestCase):
    def setUp(self):
        # Sample data for testing
        self.test_data = """
            price,date_sold,suburb,num_bath,num_bed,num_parking,property_size,type
            1000000,15/01/2023,Bondi,2,3,1,150,House
            800000,20/02/2023,Surry Hills,1,2,0,85,Apartment
            1200000,10/03/2023,Bondi,3,4,2,200,House
            950000,05/04/2023,Newtown,2,3,1,120,Townhouse
            1500000,12/05/2023,Paddington,3,5,2,250,House
            750000,18/06/2023,Surry Hills,1,1,0,60,Apartment
        """

        self.df = pd.read_csv(io.StringIO(self.test_data))
        self.df.columns = self.df.columns.str.strip()
        self.df["date_sold"] = pd.to_datetime(self.df["date_sold"], format='%d/%m/%Y')
        
    def test_no_filters(self):
        # Call function with no filters
        result = avg_property_price(self.df.copy(), None)
        
        # Expected average calculation
        expected_avg = float(1000000 + 800000 + 1200000 + 950000 + 1500000 + 750000) / 6
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_price_range_filter(self):
        # Filter by price range
        filters = {
            "price_range": {"min_price": 1000000, "max_price": 1500000},
            "date_range": None,
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering
        expected_avg = float(1000000 + 1200000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_suburb_filter(self):
        # Filter by suburb
        filters = {
            "price_range": None,
            "date_range": None,
            "suburb": "Bondi",
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering - matching the original function's behavior
        expected_avg = float(1000000 + 1200000) / 2
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_property_features_filter(self):
        # Filter by property features
        filters = {
            "price_range": None,
            "date_range": None,
            "suburb": None,
            "property_features": {"num_bath": 2, "num_bed": 3, "num_parking": 1},
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        expected_avg = float(1000000 + 1200000 + 950000 + 1500000) / 4
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_property_type_filter(self):
        # Filter by property type
        filters = {
            "price_range": None,
            "date_range": None,
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": "House"
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering
        expected_avg = float(1000000 + 1200000 + 1500000) / 3
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_multiple_filters(self):
        # Apply multiple filters
        filters = {
            "price_range": {"min_price": 900000, "max_price": None},
            "date_range": None,
            "suburb": None,
            "property_features": {"num_bath": 2, "num_bed": None, "num_parking": None},
            "property_size": None,
            "property_type": "House"
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering
        expected_avg = float(1000000 + 1200000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_empty_result(self):
        # Apply filters that should return empty result
        filters = {
            "price_range": {"min_price": 2000000, "max_price": None},
            "date_range": None,
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        result = avg_property_price(self.df.copy(), filters)

        self.assertEqual(result, 0)
        
    def test_date_range_filter(self):
        # Filter by date range
        filters = {
            "price_range": None,
            "date_range": {"date_sold_after": "2023/03/01", "date_sold_before": "2023/05/31"},
            "suburb": None,
            "property_features": None,
            "property_size": None,
            "property_type": None
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering - matching the original function's behavior
        expected_avg = float(1200000 + 950000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)