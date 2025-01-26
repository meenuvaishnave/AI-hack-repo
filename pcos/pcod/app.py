from fastapi import FastAPI
from pydantic import BaseModel
from ai_model import predict_pcos  # Import AI logic
from database import User, SessionLocal  # Import database setup

app = FastAPI()

# Define the request structure for data coming from the frontend
class DiagnosisRequest(BaseModel):
    name: str
    symptoms: str

# API Endpoint to handle predictions
@app.post("/api/predict")
def predict(request: DiagnosisRequest):
    # Extract user input
    name = request.name
    symptoms = request.symptoms

    # Use AI model to predict based on symptoms
    result = predict_pcos(symptoms)

    # Save user data and result to the database
    db = SessionLocal()  # Connect to the database
    user = User(name=name, symptoms=symptoms)
    db.add(user)
    db.commit()

    # Return the prediction to the frontend
    return {"message": result}