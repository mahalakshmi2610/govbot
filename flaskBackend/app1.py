import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, GlobalAveragePooling1D
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import pickle

from flask import Flask, request, jsonify
from flask_cors import CORS
with open('intent.json') as file:
        data = json.load(file)


# Load the pre-trained model, tokenizer, and label encoder
model = keras.models.load_model('chat_model')
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
with open('label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

def chat(inp):
    max_len = 20
    result = model.predict(keras.preprocessing.sequence.pad_sequences(tokenizer.texts_to_sequences([inp]),
                                         truncating='post', maxlen=max_len))
    tag = lbl_encoder.inverse_transform([np.argmax(result)])

    for i in data['intents']:
        if i['tag'] == tag:
            return (np.random.choice(i['responses']))

app = Flask(__name__)
CORS(app)

@app.route('/get_response', methods=['POST'])
def chatbot_response():
    message = request.json['message']
    res = chat(message)
    return jsonify({'response': res})

if __name__ == '__main__':
    app.run(debug=True)
