#!/bin/bash
#export DISPLAY=:0
#export XDG_RUNTIME_DIR=/run/user/1000
source /home/pi/yolo/myenv/bin/activate
export AUDIODEV=default
python /home/pi/yolo/main.py
