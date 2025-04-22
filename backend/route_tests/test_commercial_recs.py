# import requests

# THESE TEST THE DEPLOYED LINK
ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/commercial_recs"

# def test_commercial_recs():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "commercial_recs",
#         "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#     })

#     assert response.status_code == 200

# def test_commercial_recs_no_id():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "commercial_recs",
#     })
#     assert response.status_code == 400
