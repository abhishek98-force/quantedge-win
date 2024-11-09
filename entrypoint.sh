#!/bin/sh
PORT=${PORT:-8000}
echo "PORT is set to: $PORT"

uvicorn api_server:app --host 0.0.0.0 --port $PORT