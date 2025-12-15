#!/bin/bash

echo "=== Monitoring Docker Build Progress ==="
echo ""
echo "Build started at: $(date)"
echo ""

# Monitor build log
tail -f build_with_cmake.log &
TAIL_PID=$!

# Wait for user interrupt
trap "kill $TAIL_PID 2>/dev/null; exit" INT TERM

wait $TAIL_PID
