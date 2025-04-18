import sys
sys.path.append('../..')
import os
import unittest
import pandas as pd
from backend.influence_factors.helpers import find_influence_factors

class TestPropertyPrices(unittest.TestCase):
    def setUp(self):
        file_path = os.path.join(os.path.dirname(__file__), 'test_data', 'domain_properties.csv')
        # self.df = pd.read_csv(file_path)
        # self.df.columns = self.df.columns.str.strip()
        self.df = pd.DataFrame({
            'price': [500000, 600000, 700000],
            'num_bed': [2, 3, 4],
            'num_bath': [1, 2, 2],
            'type': ['House', 'Apartment', 'House'],
            'location': ['Parramatta', 'Blacktown', 'Chatswood']
        })
        
    def test_basic_case(self):
        result = find_influence_factors(df=self.df.copy(), target_column="price")
        self.assertIsInstance(result, dict)
        self.assertIn('num_bed', result)

    def test_filter_by_type(self):
        result = find_influence_factors(
            df=self.df.copy(), 
            target_column='price',
            filter_column='type',
            filter_value='Apartment'
        )
        self.assertTrue(all('Apartment' in row for row in self.df[self.df['type'] == 'Apartment']['type']))
        self.assertIsInstance(result, dict)

    def test_drop_columns(self):
        result = find_influence_factors(
            df=self.df.copy(), 
            target_column='price',
            drop_columns=['location']
        )
        self.assertIsInstance(result, dict)
        self.assertNotIn('Blacktown', result)

    def test_missing_values(self):
        df_with_nan = self.df.copy()
        df_with_nan.loc[0, 'bedrooms'] = None
        result = find_influence_factors(
            df=df_with_nan,
            target_column='price'
        )
        self.assertIsInstance(result, dict)

    def test_too_few_rows(self):
        short_df = self.df.head(1)
        result = find_influence_factors(
            df=short_df, 
            target_column="price"
        )
        self.assertEqual(result, {})

    def test_missing_target_column(self):
        with self.assertRaises(ValueError):
            find_influence_factors(
                df=self.df, 
                target_column='not_price'
            )

    def test_all_categorical_removed(self):
        df = pd.DataFrame({
            'price': [100000, 200000],
            'type': ['house', 'house']
        })
        result = find_influence_factors(
            df=df, 
            target_column='price'
        )
        self.assertEqual(result, {})

if __name__ == "__main__":
    unittest.main()