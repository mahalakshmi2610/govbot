# importing the required modules.
import random
import json
import pickle
import numpy as np
# import nltk
nltk.download('wordnet')

from keras.models import Sequential
from nltk.stem import WordNetLemmatizer
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD
from tensorflow.keras.optimizers import SGD

lemmatizer = WordNetLemmatizer()

# reading the json.intense file
intents = {
"intentsKey":[
{"tag": "greetings",
"patterns": ["hello", "hi", "what's up?", "whats up", "good morning", "good evening", "morning", "how's it going?", "how is it going?", "how are you?"],
"responses":["Hello!", "Hey!", "What can I do for you?", "Greeting, Human!"]
},
{"tag": "scheme name",
"patterns": ["What's the eligibility for abc scheme?", "can you tell me about the eligibility criteria for the abc scheme?"], 
 "responses":["Students currently pursuing B.E or B.Tech", "Undergraduates"]
},
 {"tag": "age",
"patterns": ["What's your age?", "How old are you?", "age?"], "responses":["My own is 25!", "My owner is 25 years old!"]
 }

]}


# creating empty lists to store data
words = []
classes = []
documents = []
ignore_letters = ["?", "!", ".", ","]
for intent in intents['intentsKey']:
  #print(intent)
  for pattern in intent['patterns']:
    # separating words from patterns
    #print(pattern)
    word_list = nltk.word_tokenize(pattern)
    #print(word_list)
    words.extend(word_list) # and adding them to words list

		# associating patterns with respective tags
    documents.append(((word_list), intent['tag']))
    #print(documents)

		# appending the tags to the class list
    if intent['tag'] not in classes:
      classes.append(intent['tag'])
#print(classes)
# print(words)
# storing the root words or lemma
words = [lemmatizer.lemmatize(word)
		for word in words if word not in ignore_letters]
words = sorted(set(words))
#print(words)
# saving the words and classes list to binary files
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))


training = []
output_empty = [0]*len(classes)
#print(output_empty)
for document in documents:
    bag = []
    #print(document)
    word_patterns = document[0]
    #print(word_patterns)
    word_patterns = [lemmatizer.lemmatize(
        word.lower()) for word in word_patterns]
    #print(word_patterns)
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)
    #print(bag)
    # making a copy of the output_empty
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    #print("output_row",output_row)
    training.append([bag, output_row])

#print(training)
random.shuffle(training)
t= np.array(training, dtype="object")
#print(bag)
# splitting the data
train_x = list(t[:, 0])
train_y = list(t[:, 1])
print(train_x)
print(train_y)




# creating a Sequential machine learning model
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]), ),
                activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]),
                activation='softmax'))

# compiling the model
sgd = SGD(lr=0.01, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy',
              optimizer=sgd, metrics=['accuracy'])
hist = model.fit(np.array(train_x), np.array(train_y),
                 epochs=200, batch_size=5, verbose=1)

# saving the model
model.save("chatbotmodel.h5", hist)

# print statement to show the
# successful training of the Chatbot model
print("Yay!")