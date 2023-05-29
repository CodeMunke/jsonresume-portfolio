#!/bin/bash
#Ensure that this file has EoL conversion format of Unix (LF)
set -e
echo "Starting SSH ..."
service ssh start

#Pre-chmoding the mounted folders doesn't work because they are mounted as root with incorrect modes.
#WHY? HAS I EVER?!
chmod -R go= ${USR_HOME}/.ssh
chown -R ${USERNAME}:${USERNAME} ${USR_HOME}/.ssh

node server.mjs