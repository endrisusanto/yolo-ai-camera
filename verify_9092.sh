#!/bin/bash
docker ps | grep yolo-ai
echo "--- Curl Body Head ---"
curl -s http://localhost:9092 | head -n 20
