# import requests

# # THESE TEST THE DEPLOYED LINK
# ENDPOINT = "https://q50eubtwpj.execute-api.us-east-1.amazonaws.com/property_prices"

# def test_get_average_price_no_filters():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "property_prices",
#         "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#         "filters": {}
#     })

#     assert response.status_code == 200

# def test_get_average_price_suburb():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "property_prices",
#         "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#         "filters": {
#             "suburb": "Chatswood"
#         }
#     })

#     data = response.json()  
#     assert "avg_price" in data  
#     assert data["avg_price"] == 1350000 
#     assert response.status_code == 200

# def test_get_average_price_error():
#     response = requests.post(ENDPOINT, json = {
#         "function_name": "property_prices",
#         "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#     })

#     assert response.status_code == 400
#     assert response.json()["error"] == "Missing 'filters' in body"
