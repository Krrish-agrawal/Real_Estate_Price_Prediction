import os
import joblib
import numpy as np
import pandas as pd
from huggingface_hub import hf_hub_download

# Globals
__model       = None
__columns     = None
__loc_means   = None

# Hugging Face repo details
REPO_ID = "KrrishAgrawal/bangalore-model"
MODEL_PATH = "./artifacts/bangalore_home_price_model.pkl"
MODEL_FILENAME = "bangalore_home_price_model.pkl"

def download_model():
    """Always ensure the model is available locally"""
    if not os.path.exists(MODEL_PATH):
        print("Downloading model from Hugging Face Hub...")
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)

        hf_hub_download(
            repo_id=REPO_ID,
            filename=MODEL_FILENAME,
            local_dir=os.path.dirname(MODEL_PATH),
            local_dir_use_symlinks=False
        )

        # Check for valid download
        if not os.path.exists(MODEL_PATH) or os.path.getsize(MODEL_PATH) < 1_000_000:
            raise RuntimeError("Model download failed or file is incomplete.")

def load_saved_artifacts():
    """Load model and helper artifacts"""
    print("Loading saved artifacts...")

    global __model, __columns, __loc_means

    download_model()

    __model     = joblib.load(MODEL_PATH)
    __columns   = joblib.load("./artifacts/model_columns.pkl")
    __loc_means = joblib.load("./artifacts/location_mean_mapping.pkl")

    print("Loading saved artifacts...done")

def get_location_names():
    """Return all known locations from mapping file"""
    if __loc_means is None:
        load_saved_artifacts()
    return sorted(list(__loc_means.keys()))

def get_estimated_price(location, sqft, bhk, bath):
    """Build feature row and return estimated price in lakhs"""
    if __model is None or __columns is None:
        load_saved_artifacts()

    row = pd.DataFrame(np.zeros((1, len(__columns))), columns=__columns)
    row.at[0, "total_sqft"] = sqft
    row.at[0, "bath"]       = bath
    row.at[0, "bhk"]        = bhk

    default_mean = np.mean(list(__loc_means.values()))
    row.at[0, "loc_enc"]    = __loc_means.get(location, default_mean)

    row.at[0, "sqft_bhk"]     = sqft * bhk
    row.at[0, "bath_per_bhk"] = bath / bhk if bhk != 0 else 0

    pred_log   = __model.predict(row)[0]
    pred_price = np.exp(pred_log) - 1
    return round(pred_price, 2)
