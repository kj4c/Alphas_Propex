import unittest
from commercial_recs.helpers import find_commerical_recs

class TestCommercialRecs(unittest.TestCase):
    def test_input1(self):
        # test given 3 properties
        self.assertEqual(find_commerical_recs("poop"), "yooo")