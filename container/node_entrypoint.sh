#!/bin/sh
npm install -q
npm run build

echo 'starting watcher'
npm run start
