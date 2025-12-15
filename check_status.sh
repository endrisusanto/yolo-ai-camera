#!/bin/bash
echo "--- Docker PS ---" > status.txt
docker ps -a >> status.txt
echo "--- Docker Logs ---" >> status.txt
docker logs yolo-ai-container 2>&1 >> status.txt
echo "--- Curl Check ---" >> status.txt
curl -I http://localhost:9090 2>&1 >> status.txt
