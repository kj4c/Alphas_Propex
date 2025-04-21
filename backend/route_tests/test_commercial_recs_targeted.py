# import requests

# # THESE TEST THE DEPLOYED LINK
# ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/commercial_recs_targeted"

# def test_working():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "commercial_recs_targeted",
#         "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#         "top_n": 5
#     })
#     print(response.json())
#     assert response.status_code == 200

# def test_missing_id():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "commercial_recs_targeted"
#     })

#     assert response.status_code == 400
#     assert response.json()["error"] == "Missing 'id' in body"