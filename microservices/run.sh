#!/bin/bash
echo
echo "****************************************"
echo "********* Starting services... *********"
echo "****************************************"
echo

killall node

(cd business-api && npm start) &
(cd email-api && npm start) &

~
