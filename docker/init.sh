#!/bin/bash
#Ensure that this file has EoL conversion format of Unix (LF)
set -e
echo "Starting SSH ..."
service ssh start
node server.mjs