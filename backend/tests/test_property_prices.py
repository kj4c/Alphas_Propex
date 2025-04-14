import sys
sys.path.append('..')
import unittest
import io
import pandas as pd
from property_prices.helpers import avg_property_price

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
        expected_avg = self.df["price"].mean()
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_price_range_filter(self):
        # Filter by price range
        filters = {
            "price": {
                "min": 1000000, 
                "max": 1500000
            }
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
            "suburb": "Bondi",
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
            "num_bath": {
                "min": 2,
                "max": None
            },
            "num_bed": {
                "min": 3,
                "max": None
            },
            "num_parking": {
                "min": 1,
                "max": None
            }
        }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        expected_avg = float(1000000 + 1200000 + 950000 + 1500000) / 4
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)
        
    def test_property_type_filter(self):
        # Filter by property type
        filters = {
            "type": "House"
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
            "price": {
                "min": 900000, 
                "max": None
            },
            "num_bath": {
                "min": 2,
                "max": None
            },
            "type": "House"
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
            "price": {
                "min": 2000000, 
                "max": None
            }
        }
        
        result = avg_property_price(self.df.copy(), filters)

        self.assertEqual(result, 0)
        
    def test_date_range_filter(self):
        # Filter by date range
        filters = {
            "date_sold": {
                "min": "2023/03/01", 
                "max": "2023/05/31"
            }
        }

        # Example input if we switch date to DateTime Object in the future
        # filters = {
        #     "date_sold": {
        #         "min": pd.to_datetime("2023/03/01", format='%Y/%m/%d'), 
        #         "max": pd.to_datetime("2023/05/31", format='%Y/%m/%d')
        #     }
        # }
        
        # Call function with filters
        result = avg_property_price(self.df.copy(), filters)
        
        # Expected result with filtering - matching the original function's behavior
        expected_avg = float(1200000 + 950000 + 1500000) / 3
        
        # Assert that the result matches expected average
        self.assertEqual(result, expected_avg)

if __name__ == "__main__":
    unittest.main()