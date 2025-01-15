#!/bin/bash

set -e

echo "Starting services..."


nx serve tap-n-taste-api & nx serve t-scanning --port 4300 

# Wait for all background processes to complete
wait
