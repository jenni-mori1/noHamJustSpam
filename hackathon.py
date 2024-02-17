from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import DataLoader
from transformers import AdamW

# Example data (replace with your labeled scam and non-scam data)
texts = ["Congratulations! You've won a prize.", "This is a legitimate email."]
labels = [1, 0]  # 1 for scam, 0 for non-scam

# Tokenize input texts
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
tokenized_texts = tokenizer(texts, padding=True, truncation=True, return_tensors='pt')

# Create DataLoader for efficient processing
dataset = list(zip(tokenized_texts['input_ids'], tokenized_texts['attention_mask'], labels))
dataloader = DataLoader(dataset, batch_size=1)

# Load pre-trained BERT model for sequence classification
model = BertForSequenceClassification.from_pretrained('bert-base-uncased')

# Training loop (adjust as needed)
optimizer = AdamW(model.parameters(), lr=5e-5)
for epoch in range(3):
    for input_ids, attention_mask, label in dataloader:
        outputs = model(input_ids, attention_mask=attention_mask, labels=label)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# Inference (replace with your test data)
test_texts = ["This seems suspicious."]
tokenized_test_texts = tokenizer(test_texts, padding=True, truncation=True, return_tensors='pt')
test_outputs = model(**tokenized_test_texts)
predicted_labels = test_outputs.logits.argmax(dim=1).tolist()

print("Predicted Labels:", predicted_labels)