import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import json
import pickle
import numpy as np
from keras.models import load_model
from nltk.stem import WordNetLemmatizer

app = Flask(__name__)
CORS(app)

lemmatizer = WordNetLemmatizer()
intents = json.loads(open("intent.json").read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbotmodel.h5')

context = {}

def clean_up_sentences(sentence):
    sentence_words = word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words


def bagw(sentence):
    sentence_words = clean_up_sentences(sentence)
    bag = [0]*len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bagw(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res)
               if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]],
                            'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    result = "Success"
    for i in list_of_intents:
        if i['tag'] == tag:
        #     if 'context_set' in i:
        #         context[userID] = i['context_set']

            # if 'context_filter' in i and userID in context and i['context_filter'] == context[userID]:
            #     if 'text' in i:
            #         print("Eligibility Criteria:")
            #         print(i['text'])
            #     responses = i['responses']
            #     for resp in responses:
            #         if 'context_filter' in resp and resp['context_filter'] == context[userID]:
            #             result = random.choice(resp['response'])
            #             context[userID] = ""
            #             return result

            responses = i['responses']
            result = random.choice(responses)
            return result
    return result

@app.route('/get_response', methods=['POST'])
def chatbot_response():
    message = request.json['message']
    # userID = request.json['userID']
    ints = predict_class(message)
    res = get_response(ints, intents)
    return jsonify({'response': res})

if __name__ == '__main__':
    app.run(debug=True)
