#!/bin/bash

# Test Candidate Management API

API="http://localhost:5000/api/candidates"

echo "=========================================="
echo "Testing Candidate Management API"
echo "=========================================="

# 1. ADD a candidate
echo -e "\n1️⃣ Adding a new candidate..."
curl -X POST "$API/add" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main Street, City",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": 3,
    "education": "B.Tech Computer Science",
    "certification": "AWS",
    "college": "MIT",
    "status": "ACTIVE"
  }'

echo -e "\n\n2️⃣ Getting all candidates..."
curl -X GET "$API/list"

echo -e "\n\n=========================================="
echo "API Testing Complete!"
echo "=========================================="
