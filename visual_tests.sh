#!/bin/bash

set -e

echo "=== SETTING UP LOCAL BACKEND ==="
yarn local & sleep 120
# curl --retry 10 --retry-delay 11 --retry-max-time 120 --max-time 8 --retry-connrefused localhost:3000
echo "=== DONE ==="

echo "=== RUN VISUAL TEST ==="
yarn visual
echo "=== DONE ==="