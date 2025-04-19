import unittest
import sys
from unittest.mock import patch
from backend.commercial_recs_targeted.helpers import find_commercial_recs_targeted

class TestCommercialRecsTargeted(unittest.TestCase):

    @patch("backend.commercial_recs_targeted.helpers.get_family_data")
    @patch("backend.commercial_recs_targeted.helpers.get_gender_data")
    def test_find_commercial_recs_targeted(self, mock_get_gender_data, mock_get_family_data):
        # Mocked API responses
        mock_get_family_data.return_value = {
            "total_families": "1000",
            "couple_family_with_children_under_15": "300",
            "one_parent_with_children_under_15": "100",
            "couple_family_with_children_over_15": "50",
            "one_parent_with_children_over_15": "50"
        }

        mock_get_gender_data.return_value = {
            "total_population": "5000",
            "male": "2200",
            "female": "2800"
        }

        # Input suburb list
        input_data = [{"suburb": "Bondi"}]

        # Call the function
        top_n = 1
        result = find_commercial_recs_targeted(input_data, 1)

        # Assertions
        self.assertEqual(len(result), top_n)
        self.assertEqual(result[0]["suburb"], "Bondi")
        self.assertIn("persona", result[0])
        self.assertIn("business_recommendations", result[0])
        self.assertIn("Female-Dominant", result[0]["persona"])
        self.assertTrue(len(result[0]["business_recommendations"]) > 0)

if __name__ == '__main__':
    unittest.main()
