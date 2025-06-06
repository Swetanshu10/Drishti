import threading
import time
import ultasonic_sensor_buzzer
import flame
import emergency_button
import pyttsx3

def start_threads():
    engine=pyttsx3.init("espeak")
    engine.setProperty("rate",110)
    voices=engine.getProperty("voices")
    engine.setProperty("voice","english+f1")
    threading.Thread(target=ultasonic_sensor_buzzer.main, daemon=True).start()
    threading.Thread(target=emergency_button.main, daemon=True).start()
    threading.Thread(target=flame.main, daemon=True).start()
    engine.say("System is started")
    engine.runAndWait()

    while True:
        time.sleep(1)

if __name__=="__main__":
    try:
       start_threads()
    except KeyboardInterrupt:
       print("program is closed")
