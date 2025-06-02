import RPi.GPIO as GPIO
import time
import pyrebase
import pyttsx3


GPIO.setmode(GPIO.BCM)
GPIO.setup(4,GPIO.IN,pull_up_down=GPIO.PUD_UP)
engine=pyttsx3.init("espeak")

firebaseConfig = {
  "apiKey": "AIzaSyBqel6Wl-Ig_7L4eTMfebMCRlzkowBQ9fU",
  "authDomain": "finalyear-14b62.firebaseapp.com",
  "databaseURL":"https://finalyear-14b62-default-rtdb.asia-southeast1.firebasedatabase.app",
  "projectId": "finalyear-14b62",
  "storageBucket": "finalyear-14b62.firebasestorage.app",
  "messagingSenderId": "548992273872",
  "appId": "1:548992273872:web:4a4d8bbf28fbe5285d3dd5",
  "measurementId": "G-8BR1DC4ZNJ"
}

firebase=pyrebase.initialize_app(firebaseConfig)
db=firebase.database()


def button_callback(channel):
  data = {
    "message": "Help Me, I am in danger"
  }
  currentTime=time.localtime()
  formattedTime=time.strftime("%Y-%m-%d %H:%M:%S",currentTime)
  db.child("Emergency").child(formattedTime).set(data)
  engine.say("Message is successfully sent")
  engine.runAndWait()

def emergency():
  GPIO.add_event_detect(4,GPIO.FALLING,callback=button_callback,bouncetime=200)

  try:
    while True:
      time.sleep(1)
  except KeyboardInterrupt:
      GPIO.cleanup()


def main():
  emergency()
