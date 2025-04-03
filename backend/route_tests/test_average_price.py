import requests

ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_prices"

def test_get_average_price_no_filters():
    response = requests.post(ENDPOINT, json = {
        "function_name": "property_prices",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
        "filters": {}
    })

    print(response.status_code)

    assert response.status_code == 200