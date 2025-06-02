import cv2
import numpy as np
#import yolo_detect.py
#import ncnn
import subprocess
import time

#net=ncnn.Net()
#net.load_param("/home/pi/yolo/my_model_ncnn_model/model.ncnn.param")
#net.load_model("/home/pi/yolo/my_model_ncnn_model/model.ncnn.bin")

def yolo(image: np.ndarray):
   if image is None:
     print("Error")
     return None
   in_mat=ncnn.Mat.from_pixels_resize(image,ncnn.Mat.PixelType.PIXEL_BGR,image.shape[1],image.shape[0],640,640)
   extractor=net.create_extractor()
   extractor.input("in0",in_mat)
   out_mat=ncnn.Mat()
   extractor.extract("out0",out_mat)
   output_data=np.array(out_mat, dtype=np.float32)
   print(output_data)
   return output_data

stored_image=None
cap=cv2.VideoCapture(0, cv2.CAP_V4L2)
if cap.isOpened():
  print("camera is open")
  ret,frame=cap.read()
  if ret:
     stored_image=np.copy(frame)
     # cv2.imwrite(image_path,frame)
     # subprocess.Popen(["python","yolo_detect.py","/home/pi/yolo/my_model_ncnn_model",image_path])
     # yres=yolo(stored_image)
     cv2.imshow("Camera",stored_image)
     cv2.waitKey(1000)


cap.release()
cv2.destroyAllWindows()

