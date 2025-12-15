#!/bin/bash

echo "=== VisionGuard AI Deployment Status ==="
echo ""

echo "1. Docker Container Status:"
docker ps | grep yolo-ai
echo ""

echo "2. Checking faces folder:"
echo "Total faces: $(find faces/ -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | wc -l)"
echo ""

echo "3. Testing API endpoints:"
echo "- Live Monitor: http://localhost:2123/"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:2123/
echo ""

echo "- Dashboard: http://localhost:2123/dashboard"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:2123/dashboard
echo ""

echo "- API Stats: http://localhost:2123/api/stats"
curl -s http://localhost:2123/api/stats | head -c 100
echo "..."
echo ""

echo "4. Recent logs (face loading):"
docker logs yolo-ai-container 2>&1 | grep -i "face" | tail -10
echo ""

echo "=== Deployment Complete ==="
echo "Access the application at: http://localhost:2123"
