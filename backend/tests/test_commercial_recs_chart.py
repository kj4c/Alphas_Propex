import unittest
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rcParams
from backend.commercial_recs_chart.helpers import plot_commercial_suburbs  # Update import path

class TestPlotCommercialSuburbs(unittest.TestCase):
    def setUp(self):
        # sample data for testing
        self.test_df = pd.DataFrame({
            'suburb': ['Suburb A', 'Suburb B', 'Suburb C'],
            'composite_score': [0.8, 0.6, 0.9]
        })
        
        # set non-interactive backend for testing
        plt.switch_backend('Agg')
        rcParams.update({'figure.max_open_warning': 0})

    def test_plot_creation(self):
        # test that the plot is created without errors
        try:
            plot_commercial_suburbs(self.test_df)
            fig = plt.gcf()
            self.assertIsNotNone(fig, "No figure was created")
        except Exception as e:
            self.fail(f"Plotting failed with exception: {str(e)}")
        finally:
            plt.close('all')

    def test_plot_content(self):
        # test that the plot contains expected content
        plot_commercial_suburbs(self.test_df)
        fig = plt.gcf()
        ax = fig.axes[0]
        
        # Test title
        self.assertEqual(ax.get_title(), 
                        "Top Suburbs by Commercial Potential",
                        "Incorrect plot title")
        
        # Test x-axis label
        self.assertEqual(ax.get_xlabel(),
                       "Composite Score (0-1 Scale)",
                       "Incorrect x-axis label")
        
        # Test bar count
        self.assertEqual(len(ax.patches), 
                        len(self.test_df),
                        "Incorrect number of bars")
        
        plt.close('all')

    def test_empty_dataframe(self):
        # test empty DataFrame handling
        empty_df = pd.DataFrame(columns=['suburb', 'composite_score'])
        try:
            plot_commercial_suburbs(empty_df)
            fig = plt.gcf()
            self.assertEqual(len(fig.axes[0].patches), 0, 
                          "Plot should have no bars for empty DataFrame")
        except Exception as e:
            self.fail(f"Failed to handle empty DataFrame: {str(e)}")
        finally:
            plt.close('all')

    def test_sorting(self):
       # test sorting of bars
        plot_commercial_suburbs(self.test_df)
        ax = plt.gcf().axes[0]
        
        # Get bar positions (should be sorted ascending)
        bar_positions = [bar.get_y() for bar in ax.patches]
        self.assertTrue(all(bar_positions[i] < bar_positions[i+1] 
                          for i in range(len(bar_positions)-1)),
                      "Bars are not properly sorted")
        plt.close('all')

if __name__ == "__main__":
    unittest.main()