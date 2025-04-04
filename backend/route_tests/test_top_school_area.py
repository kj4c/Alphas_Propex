import requests

# THESE TEST THE DEPLOYED LINK
ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/top_school_area"

def test_school_area():
    response = requests.post(ENDPOINT, json = {
        "function_name": "top_school_area",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
        "district": "Sydney",
        "school_type": "Primary School",
        "radius": 10
    })

    assert response.status_code == 200
    data = response.json()  
    assert "top_school_area" in data  

def test_school_area_no_id():
    response = requests.post(ENDPOINT, json = {
        "function_name": "top_school_area",
        "district": "Sydney",
        "school_type": "Primary School",
        "radius": 10
    })
    assert response.json()["error"] == "Missing 'id' in body"
    assert response.status_code == 500

def test_school_area_missing_school_type():
    response = requests.post(ENDPOINT, json = {
        "function_name": "top_school_area",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
        "district": "Sydney",
        "radius": 10
    })

    assert response.status_code == 400

def test_school_area_missing_district():
    response = requests.post(ENDPOINT, json = {
        "function_name": "top_school_area",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
        "school_type": "Primary School",
        "radius": 10
    })

    assert response.status_code == 400

def test_school_area_missing_radius():
    response = requests.post(ENDPOINT, json = {
        "function_name": "top_school_area",
        "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
        "school_type": "Primary School",
        "district": "Sydney",
    })

    assert response.status_code == 400
