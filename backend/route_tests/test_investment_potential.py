import requests

# THESE TEST THE DEPLOYED LINK
ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/investment_potential"

def test_working():
    response = requests.post(ENDPOINT, json = {
        "function_name": "investment_potential",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
    })

    assert response.status_code == 200

def test_missing_id():
    response = requests.post(ENDPOINT, json = {
        "function_name": "suburb_livability_score"
    })

    assert response.status_code == 400
    assert response.json()["error"] == "Missing 'id' in body"
    