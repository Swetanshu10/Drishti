import numpy as np
import tensorflow as tf
from PIL import Image

# === Path to image and model ===
image_path = "test.jpg"  # Replace with your image path
model_path = "yolov8n_2_float16.tflite"

# === Load TFLite model ===
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

input_shape = input_details[0]["shape"]
input_height, input_width = input_shape[1], input_shape[2]

# === Load and preprocess image using PIL ===
image = Image.open(image_path).convert("RGB")
resized_image = image.resize((input_width, input_height))
image_np = np.asarray(resized_image).astype(np.float32) / 255.0
input_tensor = np.expand_dims(image_np, axis=0)

# === Run inference ===
interpreter.set_tensor(input_details[0]["index"], input_tensor)
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
