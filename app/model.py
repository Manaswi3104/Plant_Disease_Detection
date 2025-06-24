import torch
import sys
import os
import pathlib

# ✅ Fix for PosixPath issue on Windows
pathlib.PosixPath = pathlib.WindowsPath

# 🔧 Add yolov5 to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'yolov5')))

# ✅ Import and allow the custom model class for deserialization
import models.yolo
torch.serialization.add_safe_globals({
    "models.yolo.ClassificationModel": models.yolo.ClassificationModel
})

# Model path
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'best.pt')

def load_model():
    model = torch.load(MODEL_PATH, map_location=torch.device("cpu"), weights_only=False)
    if isinstance(model, dict) and 'model' in model:
        model = model['model'].float().fuse().eval()
    return model

# Load once
model = load_model()
