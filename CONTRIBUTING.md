# Contributing to VisionGuard AI

First off, thank you for considering contributing to VisionGuard AI! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Python version, GPU, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing style
5. Write a clear commit message

## Development Setup

### Prerequisites
- Python 3.11+
- Docker & Docker Compose
- NVIDIA GPU (optional)

### Setup Steps

1. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/visionguard-ai.git
cd visionguard-ai
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Download YOLO models**
```bash
wget https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n.pt
wget https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n-seg.pt
wget https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n-pose.pt
```

5. **Run the application**
```bash
python app.py
```

## Coding Standards

### Python Style Guide
- Follow PEP 8
- Use meaningful variable names
- Add docstrings to functions
- Keep functions focused and small
- Use type hints where appropriate

### Example:
```python
def calculate_angle(a: tuple, b: tuple, c: tuple) -> float:
    """
    Calculate angle between three points.
    
    Args:
        a: First point (x, y)
        b: Middle point (x, y)
        c: Last point (x, y)
        
    Returns:
        Angle in degrees
    """
    # Implementation
    pass
```

### JavaScript Style Guide
- Use ES6+ features
- Use const/let instead of var
- Add JSDoc comments
- Use meaningful function names

### CSS Style Guide
- Use CSS variables for theming
- Follow BEM naming convention
- Keep selectors specific but not overly complex
- Group related properties

## Project Structure

```
visionguard-ai/
├── app.py              # Main application
├── templates/          # HTML templates
├── static/            # Static files (CSS, JS, images)
├── faces/             # Face recognition references
└── docs/              # Documentation
```

## Testing

Before submitting a PR, ensure:
- [ ] Code runs without errors
- [ ] Face recognition works
- [ ] Phone detection works
- [ ] Sitting detection works
- [ ] Dashboard loads correctly
- [ ] Excel export works
- [ ] Theme toggle works

## Documentation

- Update README.md if you change functionality
- Add comments for complex logic
- Update API documentation if you add/modify endpoints

## Commit Messages

Use clear and meaningful commit messages:

```
✨ Add new feature
🐛 Fix bug
📝 Update documentation
♻️ Refactor code
⚡ Improve performance
🎨 Improve UI/UX
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation with any new features
3. The PR will be merged once you have approval from maintainers

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to VisionGuard AI! 🚀
