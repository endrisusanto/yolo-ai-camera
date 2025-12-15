#!/bin/bash
curl -I http://localhost:9091 > status_9091.txt 2>&1
docker ps | grep yolo >> status_9091.txt
