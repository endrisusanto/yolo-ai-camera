# VisionGuard AI - Face Recognition Setup

## How to Add Known Faces

1. Create a folder named `faces/` in the project root (if it doesn't exist)

2. Add photos of people you want to recognize:
   - Supported formats: `.jpg`, `.jpeg`, `.png`
   - **Filename = Person's Name**
   - Example: `John_Doe.jpg` will be recognized as "John Doe"
   - Example: `Alice.png` will be recognized as "Alice"

3. Image requirements:
   - Clear face photo
   - Good lighting
   - Face should be clearly visible
   - One face per image (first face will be used if multiple)

4. Restart the application to load new faces

## Example Structure

```
yolo-ai/
├── faces/
│   ├── John_Doe.jpg
│   ├── Alice_Smith.png
│   ├── Bob_Johnson.jpeg
│   └── Charlie.jpg
├── app.py
└── ...
```

## Features

- **Real-time Face Recognition**: Detects and labels faces in video feed
- **Green Bounding Box**: Draws rectangle around recognized faces
- **Name Label**: Shows person's name below the face
- **Unknown Detection**: Shows "Unknown" for unrecognized faces
- **Tolerance**: 0.6 (adjustable in code for stricter/looser matching)

## Performance

- Frame is resized to 50% for faster processing
- Only processes when known faces are loaded
- Runs alongside YOLO detection, pose estimation, and phone detection

## Notes

- Face recognition runs every frame
- The more faces you add, the slower the processing
- Recommended: Keep known faces under 20 for optimal performance
- Use clear, high-quality reference photos for best accuracy
