#!/bin/bash
#Ensure that this file has EoL conversion format of Unix (LF)
set -e
echo "Starting SSH ..."
service ssh start
chmod -R go= ${USR_HOME}/.ssh
chown -R ${USR}:${USR} ${USR_HOME}/.ssh

node server.mjs