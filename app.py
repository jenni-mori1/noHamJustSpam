from flask import Flask, request, jsonify, render_template
import torch
from transformers import BertTokenizerFast, AutoModel
from hackathon import BERT_Arch  # Make sure this import points to where your BERT_Arch class is defined
import numpy as np

app = Flask(__name__)

# Setup device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the pre-trained BERT model
bert = AutoModel.from_pretrained('bert-base-uncased')

# Initialize your model with the BERT model
model = BERT_Arch(bert).to(device)
model.load_state_dict(torch.load("best_model.pth", map_location=device))
model.eval()

# Initialize your tokenizer
tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')

@app.route('/', methods=['GET'])
def home():
    # Render the home template with the input form
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get text from the form
        text = request.form['text']

        # Tokenize and encode the text
        tokens = tokenizer.encode_plus(text, max_length=25, pad_to_max_length=True, truncation=True, return_tensors="pt")
        seq = tokens['input_ids'].to(device)
        mask = tokens['attention_mask'].to(device)
        
        with torch.no_grad():
            preds = model(seq, mask)
            preds = preds.detach().cpu().numpy()
            predicted_label = np.argmax(preds, axis=1)[0]
        
        # Convert numerical prediction back to string label
        label = 'scam' if predicted_label == 1 else 'ham'

        # Render the same or a different template with the prediction result
        return render_template('index.html', prediction_text=f'Predicted Label: {label}')

if __name__ == '__main__':
    app.run(debug=True)
