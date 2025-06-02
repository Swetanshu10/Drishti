from picamera2 import Picamera2
import time
import subprocess
import libcamera
import pyttsx3

def fun():
  #initialize
  engine=pyttsx3.init("espeak")
  engine.setProperty("rate",110)
  picam2 = Picamera2()

  #config the camerafor still image capture
  config=picam2.create_still_configuration()
  config["transform"]=libcamera.Transform(hflip=1,vflip=1)
  picam2.configure(config)

  #start the camera
  picam2.start()
  time.sleep(2) #allow camera to warm up

  #capture and save image
  image_path="img.jpg"
  picam2.capture_file(image_path)
  print("Image saved as image.jpg")
  picam2.stop()
  picam2.close()
  model_path="my_model_ncnn_model"
  command=["python","yolo_detect.py","--model="+model_path,"--source="+image_path]

  try:
     result=subprocess.run(command, check=True, capture_output=True, text=True)
     close=result.stdout.find("}")
     final_result=result.stdout[51:close]
     formatted_class_label=""
     for character in final_result:
        if(character!="'"):
           formatted_class_label+=character
     print(formatted_class_label)
     engine.say(f"Detected {formatted_class_label}")
     engine.runAndWait()
  except subprocess.CalledProcessError as e:
     print("Error running YOLO detection",e)


