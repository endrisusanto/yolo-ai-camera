#!/bin/bash
curl http://localhost:9091 > body_9091.txt 2>&1
docker ps -a | grep yolo >> body_9091.txt
