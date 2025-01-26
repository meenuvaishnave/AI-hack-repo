# Simple AI logic to predict PCOS based on symptoms
def predict_pcos(symptoms):
    # Example logic: Check if specific symptoms are mentioned
    if "irregular periods" in symptoms or "weight gain" in symptoms:
        return "High chance of PCOS. Please consult a doctor."
    else:
        return "Symptoms are not indicative of PCOS."