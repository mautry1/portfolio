#!/bin/bash
python -m gunicorn --bind 0.0.0.0:$PORT --workers 4 --timeout 120 app:app