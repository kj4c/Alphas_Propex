import matplotlib.pyplot as plt

def plot_commercial_suburbs(recommended_df):
    """
    Plots a bar chart of suburbs and their composite scores.
    
    Parameters:
    - recommended_df (DataFrame): DataFrame containing 'suburb' and 'composite_score' columns
    """
    df = recommended_df.sort_values("composite_score", ascending=True)
    
    plt.figure(figsize=(10, 6))
    bars = plt.barh(df["suburb"], df["composite_score"], color="skyblue")

    for bar in bars:
        width = bar.get_width()
        plt.text(width + 0.01, bar.get_y() + bar.get_height()/2, 
                 f"{width:.2f}", va="center", fontsize=10)
    
    plt.title("Top Suburbs by Commercial Potential", fontweight="bold", pad=20)
    plt.xlabel("Composite Score (0-1 Scale)")
    plt.xlim(0, 1.1)
    plt.grid(axis="x", linestyle="--", alpha=0.7)
    plt.tight_layout()
    plt.show()