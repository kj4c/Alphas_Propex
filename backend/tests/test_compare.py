import sys
sys.path.append('../')

import unittest
from unittest.mock import MagicMock, patch
from compare.helpers import compare

class TestCompareFunction(unittest.TestCase):

    def setUp(self):
        self.mock_engine = MagicMock()

    @patch('compare.helpers.retrieve_data')
    def test_compare_valid_suburbs(self, mock_retrieve_data):
        mock_retrieve_data.side_effect = [
            {
                'Postcode': 2121,
                'State': 'NSW',
                'Number of Properties': 148,
                'Average Property Size': 134.2,
                'Average Inflation Index': 1.15,
                'Population': 23456,
                'Median Income': 84200.0
            },
            {
                'Postcode': 2010,
                'State': 'NSW',
                'Number of Properties': 100,
                'Average Property Size': 120.0,
                'Average Inflation Index': 1.10,
                'Population': 15000,
                'Median Income': 78000.0
            },
            {
                'Postcode': 2000,
                'State': 'NSW',
                'Number of Properties': 200,
                'Average Property Size': 110.5,
                'Average Inflation Index': 1.20,
                'Population': 30000,
                'Median Income': 90000.0
            }
        ]

        suburbs = ['Epping', 'Surry Hills', 'Haymarket']
        result = compare(self.mock_engine, suburbs)

        self.assertEqual(mock_retrieve_data.call_count, len(suburbs))

        expected_keys = [
            'Postcode', 'State', 'Number of Properties', 
            'Average Property Size', 'Average Inflation Index', 
            'Population', 'Median Income'
        ]
        for key in expected_keys:
            self.assertIn(key, result)
            self.assertEqual(set(result[key].keys()), set(suburbs))

        self.assertEqual(result['Postcode']['Epping'], 2121)
        self.assertEqual(result['State']['Haymarket'], 'NSW')
        self.assertAlmostEqual(result['Median Income']['Surry Hills'], 78000.0)

    @patch('compare.helpers.retrieve_data')
    def test_compare_empty_suburb_list(self, mock_retrieve_data):
        with self.assertRaises(ValueError):
            compare(self.mock_engine, [])

    @patch('compare.helpers.retrieve_data')
    def test_compare_suburb_not_found(self, mock_retrieve_data):
        def side_effect(engine, suburb):
            if suburb.lower() == 'unknown':
                raise ValueError(f"No data found for suburb: {suburb}")
            return {
                'Postcode': 1234,
                'State': 'NSW',
                'Number of Properties': 50,
                'Average Property Size': 100.0,
                'Average Inflation Index': 1.0,
                'Population': 10000,
                'Median Income': 70000.0
            }
        mock_retrieve_data.side_effect = side_effect

        suburbs = ['Epping', 'Unknown']
        result = compare(self.mock_engine, suburbs)

        self.assertIn('Epping', result['Postcode'])
        self.assertNotIn('Unknown', result['Postcode'])

    @patch('compare.helpers.retrieve_data')
    def test_compare_with_none_values(self, mock_retrieve_data):
        mock_retrieve_data.return_value = {
            'Postcode': None,
            'State': 'NSW',
            'Number of Properties': 50,
            'Average Property Size': None,
            'Average Inflation Index': 1.0,
            'Population': None,
            'Median Income': 70000.0
        }

        suburbs = ['NullSuburb']
        result = compare(self.mock_engine, suburbs)

        self.assertIsNone(result['Postcode']['NullSuburb'])
        self.assertIsNone(result['Average Property Size']['NullSuburb'])
        self.assertIsNone(result['Population']['NullSuburb'])
        self.assertEqual(result['State']['NullSuburb'], 'NSW')

    @patch('compare.helpers.retrieve_data')
    def test_compare_case_insensitivity(self, mock_retrieve_data):
        mock_retrieve_data.return_value = {
            'Postcode': 1234,
            'State': 'NSW',
            'Number of Properties': 100,
            'Average Property Size': 120.0,
            'Average Inflation Index': 1.05,
            'Population': 20000,
            'Median Income': 80000.0
        }
        suburbs = ['ePping', 'SuRry HIlls']
        result = compare(self.mock_engine, suburbs)

        for suburb in suburbs:
            # The keys in the result dict will match input suburb strings exactly
            self.assertIn(suburb, result['Postcode'])
            self.assertEqual(result['State'][suburb], 'NSW')

    @patch('compare.helpers.retrieve_data')
    def test_compare_all_suburbs_not_found(self, mock_retrieve_data):
        mock_retrieve_data.side_effect = ValueError("No data found")

        suburbs = ['Fake1', 'Fake2']
        with self.assertRaises(ValueError):
            compare(self.mock_engine, suburbs)

    @patch('compare.helpers.retrieve_data')
    def test_compare_large_suburb_list(self, mock_retrieve_data):
        # Return dummy data for many suburbs
        mock_retrieve_data.side_effect = lambda engine, suburb: {
            'Postcode': 1000 + len(suburb),
            'State': 'NSW',
            'Number of Properties': 100,
            'Average Property Size': 120.0,
            'Average Inflation Index': 1.0,
            'Population': 10000,
            'Median Income': 70000.0
        }

        suburbs = [f'Suburb{i}' for i in range(50)]
        result = compare(self.mock_engine, suburbs)

        self.assertEqual(len(result['Postcode']), 50)
        self.assertEqual(set(result['Postcode'].keys()), set(suburbs))


if __name__ == '__main__':
    unittest.main()
