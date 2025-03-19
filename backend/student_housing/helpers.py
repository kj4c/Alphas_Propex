import pandas as pd

def student_housing(data):

    data.columns = data.columns.str.strip()
    print(data.columns)

if __name__ == "__main__":

    test_data = """
            price,property_inflation_index,suburb_median_income,km_from_cbd,suburb
            530000,150.9,29432,47.05,Kincumber
            525000,140.2,24752,78.54,Halekulani
            480000,160.5,31668,63.59,Chittaway Bay
            750000,135.7,35000,22.7,Parramatta
            680000,142.3,27000,35.0,Chatswood
        """
    df = pd.read_csv(io.StringIO(self.test_data))
    student_housing(df)