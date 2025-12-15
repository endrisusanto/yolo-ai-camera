#!/bin/bash
echo "--- Port 9090 Check ---" > debug_port.txt
netstat -tulpn | grep 9090 >> debug_port.txt 2>&1
echo "--- Curl Body ---" >> debug_port.txt
curl http://localhost:9090 >> debug_port.txt 2>&1
echo "--- Docker Start Attempt ---" >> debug_port.txt
docker start yolo-ai-container >> debug_port.txt 2>&1
docker logs yolo-ai-container >> debug_port.txt 2>&1
