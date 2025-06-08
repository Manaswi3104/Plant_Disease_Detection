import streamlit as st
from PIL import Image
import torch
import torchvision.transforms as transforms

# Set Streamlit UI config
st.set_page_config(
    page_title="Leaf Health Detection",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Class names in order
class_names = ['healthy', 'unhealthy', 'not_leaf']

# Load YOLOv5 classification model (fixed version)
@st.cache_resource

@st.cache_resource

def load_model():
    model_path = 'runs/train-cls/exp/weights/best.pt'

    # Load model with weights_only=False (trusted source)
    model_data = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)

    # If checkpoint is a dict, extract and prepare model
    if isinstance(model_data, dict) and 'model' in model_data:
        model = model_data['model'].float().fuse().eval()
    else:
        model = model_data.eval()

    return model


# Load model
model = load_model()

# Sidebar navigation
st.sidebar.title("🍃 Leaf Health Detection")
app_mode = st.sidebar.radio("Choose Section", ["Home", "About", "Detect"])

# Home Page
if app_mode == "Home":
    st.title("🌿 Welcome to the Leaf Health Detection App")
    st.markdown("""
        This app classifies uploaded images into:
        - *Healthy Leaf*
        - *Unhealthy Leaf*
        - *Not a Leaf*
        
        Model trained using YOLOv5 Classification on a Roboflow dataset.
    """)

# About Page
elif app_mode == "About":
    st.title("📘 About This Project")
    st.markdown("""
        - 🔍 *Goal*: Detect health of plant leaves from images.
        - ⚙ *Model*: YOLOv5 Classification
        - 🧠 *Trained on*: Roboflow dataset (3 classes)
        - 🏷 *Classes*: healthy, unhealthy, not_leaf
        - ⏱ *Training Time*: 0.129 hours
        - 🔗 *Model Path*: runs/train-cls/exp/weights/best.pt
    """)

# Detection Page
elif app_mode == "Detect":
    st.title("🔬 Detect Leaf Health")
    uploaded_file = st.file_uploader("Upload a leaf image", type=["jpg", "jpeg", "png"])

    if uploaded_file is not None:
        image = Image.open(uploaded_file).convert("RGB")
        st.image(image, caption="Uploaded Leaf", use_column_width=True)

        if st.button("Predict"):
            with st.spinner("Running prediction..."):
                transform = transforms.Compose([
                    transforms.Resize((224, 224)),
                    transforms.ToTensor(),
                    transforms.Normalize([0.485, 0.456, 0.406],
                                         [0.229, 0.224, 0.225])
                ])

                input_tensor = transform(image).unsqueeze(0)
                input_tensor = input_tensor.to(next(model.parameters()).device)

                with torch.no_grad():
                    prediction = model(input_tensor)
                    class_idx = prediction.argmax(1).item()
                    pred_class = class_names[class_idx]

                st.success(f"✅ Prediction: *{pred_class.upper()}*")
