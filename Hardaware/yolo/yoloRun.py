'''import numpy as np
import tensorflow as tf
from PIL import Image
import cv2



# === Load TFLite model ===
interpreter = tf.lite.Interpreter(model_path="my_model.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


# Prepare input
img = cv2.imread("test.jpg")
img_resized = cv2.resize(img, (input_details[0]['shape'][2], input_details[0]['shape'][1]))
input_data = np.expand_dims(img_resized, axis=0).astype(np.float32)
input_data = input_data / 255.0  # if normalization is required


# === Run inference ===
interpreter.set_tensor(input_details[0]["index"], input_data)
interpreter.invoke()
output_data = interpreter.get_tensor(output_details[0]["index"])
detections = output_data[0]

# === Class names (put your own model's class lables here) ===
class_names = ["person", "vehicle", "wall", "pothole", "staircase"]

# === Parse and print detections ===
confidence_threshold = 0.5
detected_classes = set()

for det in detections:
    if len(det) < 6:
        continue
    conf = det[4]
    class_id = int(det[5])
    if conf > confidence_threshold and class_id < len(class_names):
        # detected_classes.add(class_names[class_id])
        detected_classes.add(class_id)

if detected_classes:
    print("Detected classes:", detected_classes)
else:
    print("No confident detections found.")
'''
import numpy as np
import tensorflow as tf
import cv2

# === Load TFLite model ===
interpreter = tf.lite.Interpreter(model_path="my_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# === Prepare input image ===
img = cv2.imread("test.jpg")
img_resized = cv2.resize(img, (input_details[0]['shape'][2], input_details[0]['shape'][1]))
input_data = np.expand_dims(img_resized, axis=0).astype(np.float32)
input_data = input_data / 255.0

# === Run inference ===
interpreter.set_tensor(input_details[0]["index"], input_data)
interpreter.invoke()
output_data = interpreter.get_tensor(output_details[0]["index"])  # shape: [1, 29, 8400]
detections = output_data[0].transpose()  # shape: [8400, 29]

# === Define class names ===
class_names = ["person", "vehicle", "wall", "pothole", "staircase"]

# === Parse and print results ===
confidence_threshold = 0.5
detected_classes = set()

for det in detections:
    x, y, w, h = det[:4]
    objectness = det[4]
    class_probs = det[5:]
    class_id = np.argmax(class_probs)
    confidence = objectness * class_probs[class_id]

    if confidence > confidence_threshold and class_id < len(class_names):
        detected_classes.add(class_names[class_id])

if detected_classes:
    print("Detected classes:", detected_classes)
else:
    print("No confident detections found.")
