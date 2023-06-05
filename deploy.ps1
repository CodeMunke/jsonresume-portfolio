$env:CURRENT_CFG="cert-conf"
docker-compose up -d
$env:CURRENT_CFG="final"
docker-compose up -d --force-recreate --no-deps webserver
Write-Host "Deployment complete."