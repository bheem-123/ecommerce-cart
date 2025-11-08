#!/bin/bash

BASE_URL="http://localhost:5000/api"
SESSION_ID="user_12345"

echo "=== E-Commerce Cart API Testing ==="
echo

echo "1. Get all products:"
curl -s "$BASE_URL/products" | jq .
echo

echo "2. Add item to cart:"
curl -s -X POST "$BASE_URL/cart" \
  -H "Content-Type: application/json" \
  -H "session-id: $SESSION_ID" \
  -d '{"productId": "PRODUCT_ID_HERE", "qty": 2}' | jq .
echo

echo "3. Get cart:"
curl -s "$BASE_URL/cart" \
  -H "session-id: $SESSION_ID" | jq .
echo

echo "4. Checkout:"
curl -s -X POST "$BASE_URL/checkout" \
  -H "Content-Type: application/json" \
  -H "session-id: $SESSION_ID" \
  -d '{"name": "John Doe", "email": "john.doe@example.com"}' | jq .
echo