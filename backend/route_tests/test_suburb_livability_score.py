import requests

# THESE TEST THE DEPLOYED LINK
ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/suburb_livability_score"

def test_working():
    response = requests.post(ENDPOINT, json = {
        "function_name": "suburb_livability_score",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
        "proximity_weight": 0.2,
        "property_size_weight": 0.5,
        "population_density_weight": 0.3
    })

    assert response.status_code == 200

def test_missing_id():
    response = requests.post(ENDPOINT, json = {
        "function_name": "suburb_livability_score"
    })

    assert response.status_code == 400
    assert response.json()["error"] == "Missing 'id' in body"
    