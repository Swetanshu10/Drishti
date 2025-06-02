"""
This Raspberry Pi code was developed by newbiely.com
This Raspberry Pi code is made available for public use without any restriction
For comprehensive instructions and wiring diagrams, please visit:
https://newbiely.com/tutorials/raspberry-pi/raspberry-pi-flame-sensor
"""


import RPi.GPIO as GPIO
import time
import pyttsx3
DO_PIN = 26  # GPIO pin connected to DO pin of the flame sensor
BUZZER_PIN=6


# Set up the GPIO mode
GPIO.setmode(GPIO.BCM)

# Initialize the GPIO pin as an input
GPIO.setup(DO_PIN, GPIO.IN)
GPIO.setup(BUZZER_PIN, GPIO.OUT)
engine=pyttsx3.init("espeak")


def flame():
    try:
        while True:
            flame_state = GPIO.input(DO_PIN)

            if flame_state == 0:
                GPIO.output(BUZZER_PIN, GPIO.HIGH)
               # engine.say("Fire Detected")
               # engine.runAndWait()
            else:
                GPIO.output(BUZZER_PIN, GPIO.LOW)
                time.sleep(1)
    except KeyboardInterrupt:
        # Clean up GPIO on keyboard interrupt
        GPIO.cleanup()


def main():
    flame()

