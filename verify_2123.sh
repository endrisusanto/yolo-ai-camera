#!/bin/bash
docker ps | grep yolo-ai
echo "--- Curl Port 2123 ---"
curl -s http://localhost:2123 | head -n 20
docker logs yolo-ai-container | tail -n 20
