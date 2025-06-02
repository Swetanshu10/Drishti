"""
This Raspberry Pi code was developed by newbiely.com
This Raspberry Pi code is made available for public use without any restriction
For comprehensive instructions and wiring diagrams, please visit:
https://newbiely.com/tutorials/raspberry-pi/raspberry-pi-ultrasonic-sensor
"""


import RPi.GPIO as GPIO
import time
import pyttsx3
from camera_test import fun
#import subprocess
# Set the GPIO mode (BCM or BOARD)
GPIO.setmode(GPIO.BCM)

# Define GPIO pins for the ultrasonic sensor
TRIG_PIN = 23
ECHO_PIN = 24

# Set the trigger and echo pins
GPIO.setup(TRIG_PIN, GPIO.OUT)
GPIO.setup(ECHO_PIN, GPIO.IN)
engine=pyttsx3.init("espeak")


def get_distance():
    # Send a short pulse to the trigger pin
    GPIO.output(TRIG_PIN, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(TRIG_PIN, GPIO.LOW)

    # Measure the duration for the echo pulse
    timeout=time.time()+1
    while GPIO.input(ECHO_PIN) == 0:
        pulse_start = time.time()
        if pulse_start>timeout:
          print("Timeout waiting for pulse_start")
          return None

    timeout=time.time()+1
    while GPIO.input(ECHO_PIN) == 1:
        pulse_end = time.time()
        if pulse_end>timeout:
          print("Timeout waiting for pulse_end")
          return None


    pulse_duration = pulse_end - pulse_start

    # Calculate the distance based on the speed of sound (34300 cm/s)
    distance = pulse_duration * 34300 / 2

    return distance

def ultrasonic():
    flag=True
    try:
        while True:
            distance = get_distance()
            if(distance<=120 and flag==True):
             print(f"Distance: {distance:.2f} cm")
             time.sleep(1)
             engine.say("object detected, identifying it now")
             engine.runAndWait()
             flag=False
             fun()
             flag=True
            time.sleep(0.1)

    except KeyboardInterrupt:
        # If the user presses Ctrl+C, clean up the GPIO configuration
        GPIO.cleanup()

def main():
    ultrasonic()
