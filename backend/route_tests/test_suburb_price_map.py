import requests

# THESE TEST THE DEPLOYED LINK
ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/suburb_price_map"

def test_suburb_price_map():
    response = requests.post(ENDPOINT, json = {
        "function_name": "suburb_price_map",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
    })
    assert response.status_code == 200

def test_school_area_no_id():
    response = requests.post(ENDPOINT, json = {
        "function_name": "suburb_price_map",
    })

    assert response.status_code == 500
