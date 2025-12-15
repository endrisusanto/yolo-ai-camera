FROM ultralytics/ultralytics:latest

WORKDIR /app

# Install system dependencies for dlib (cmake, build tools)
RUN apt-get update && apt-get install -y \
    cmake \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Remove broken pip cmake if exists and ensure system cmake is used
RUN pip uninstall -y cmake || true

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
