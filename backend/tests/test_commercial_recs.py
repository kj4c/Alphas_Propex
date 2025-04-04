import io
import pandas as pd
import unittest
import numpy as np
# from backend.commercial_recs.handler import lambda_handler
from backend.commercial_recs.helpers import find_commerical_recs

class TestCommercialRecs(unittest.TestCase):
    def setUp(self):
        # dataframe for testing commericial reccomendations
        self.test_data = """
        suburb,suburb_median_income,suburb_sqkm,suburb_population
        Bensville,36764,4.925,2545
        Narara,34632,8.242,7934
        Putney,44876,1.508,4107
        Hornsby,38792,8.386,22168
        Killara,49452,4.632,10574
        Glenfield,37024,6.995,9633
        Punchbowl,22048,4.323,20236
        Eastwood,39876,7.342,16489
        Ingleburn,33124,12.454,15039
        Penrith,32240,12.202,13295
        """
        self.df = pd.read_csv(io.StringIO(self.test_data))

    def test_basic_functionality(self):

        # test if the function works lol
        result = find_commerical_recs(self.df.copy())
        self.assertIsInstance(result, pd.DataFrame)

        required_columns = ["suburb", "suburb_median_income", "population_density", "composite_score"]

        self.assertTrue(all(col in result.columns for col in required_columns))
        self.assertGreater(len(result), 0)

    def test_ranking_order(self):
    
        # tests whether the commercial recommendations are ranked correctly.

        result = find_commerical_recs(self.df.copy())
        scores = result['composite_score'].values
        
        self.assertTrue(all(scores[i] >= scores[i + 1] 
                            for i in range(len(scores) - 1)))

    def test_threshold_filter(self):
        # tests whether the function filters suburbs below a certain threshold

        default_res = find_commerical_recs(self.df.copy())
        
        # return less suburbs if the threshold is higher
        high_threshold_res = find_commerical_recs(self.df.copy(), income_threshold=0.8, traffic_threshold=0.8)
        self.assertLess(len(high_threshold_res), len(default_res))
    
    def test_weight(self):
        # test that weight affect the ranks properly
        income_heavy = find_commerical_recs(self.df.copy(), income_weight=0.9, traffic_weight=0.1)
        traffic_heavy = find_commerical_recs(self.df.copy(), income_weight=0.1, traffic_weight=0.9)

        income_scores = income_heavy['composite_score'].values
        traffic_scores = traffic_heavy['composite_score'].values
        self.assertTrue(all(income_scores[i] >= traffic_scores[i] for i in range(len(income_scores))))

    def test_handle_missing_values(self):

        # tests whether the function can handle missing values

        df_missing = self.df.copy()
        df_missing.loc[0, "suburb_median_income"] = np.nan
        result = find_commerical_recs(df_missing)
        self.assertGreater(len(result), 0)

    def test_empty_dataframe(self):
        
        # tests the function behavior when given an empty df

        df_empty = pd.DataFrame(columns=self.df.columns)
        result = find_commerical_recs(df_empty)
        self.assertEqual(len(result), 0)

    def test_handle_zero_sqkm(self):

        # tests how the function handles cases where suburb_sqkm is 0

        df_zero_sqkm = self.df.copy()
        df_zero_sqkm.loc[0, "suburb_sqkm"] = 0
        result = find_commerical_recs(df_zero_sqkm)
        self.assertGreater(len(result), 0)
        self.assertTrue(np.isinf(result.loc[0, "population_density"]))
    
    def test_missing_columns(self):

        # tests how the function handles cases where columns are missing
        df_missing = self.df.drop(columns=["suburb_median_income"])
        with self.assertRaises(ValueError) as e:
            find_commerical_recs(df_missing)
        
        self.assertEqual(str(e.exception), "Missing required columns")

    def test_top_n_param(self):
        # tests whether the top_n parameter works as expected
        for i in [1, 2, 3]:
            result = find_commerical_recs(self.df.copy(), top_n=i)
            self.assertEqual(len(result), i)


if __name__ == "__main__":
    unittest.main()

