FROM ultralytics/ultralytics:latest

WORKDIR /app

# Install Flask and other dependencies
# Ultralytics image already has torch, torchvision, opencv, etc.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download YOLO weights
RUN wget https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n.pt
RUN wget https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n-seg.pt
RUN wget https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n-pose.pt

COPY . .

EXPOSE 2123

CMD ["python", "app.py"]
