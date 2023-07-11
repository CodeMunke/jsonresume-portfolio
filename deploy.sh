#!/bin/bash
CURRENT_CFG="cert-conf"
docker-compose up -d
CURRENT_CFG="final"
docker-compose up -d --force-recreate --no-deps webserver
echo "Deployment complete."