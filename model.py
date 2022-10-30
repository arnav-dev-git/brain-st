import numpy as np
import pandas as pd
# %matplotlib inline
import matplotlib.pyplot as plt
# import seaborn as sns
import os
import sys
import warnings
warnings.filterwarnings("ignore")
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

df = pd.read_csv('brain_stroke.csv')
df.loc[ df['age'] <= 25, 'age'] = 0
df.loc[(df['age'] > 25) & (df['age'] <= 39), 'age'] = 1
df.loc[(df['age'] > 39) & (df['age'] <= 59), 'age'] = 2
df.loc[ df['age'] > 59, 'age'] = 3
df.loc[ df['bmi'] <= 23, 'bmi'] = 0
df.loc[(df['bmi'] > 23) & (df['bmi'] <= 28), 'bmi'] = 1
df.loc[(df['bmi'] > 28) & (df['bmi'] <= 32), 'bmi'] = 2
df.loc[ df['bmi'] > 32, 'bmi'] = 3
df.loc[ df['avg_glucose_level'] <= 50, 'avg_glucose_level'] = 0
df.loc[(df['avg_glucose_level'] > 50) & (df['avg_glucose_level'] <= 100), 'avg_glucose_level'] = 1
df.loc[(df['avg_glucose_level'] > 100) & (df['avg_glucose_level'] <= 150), 'avg_glucose_level'] = 2
df.loc[(df['avg_glucose_level'] > 150) & (df['avg_glucose_level'] <= 200), 'avg_glucose_level'] = 3
df.loc[ df['avg_glucose_level'] > 200, 'avg_glucose_level'] = 4
def to_numerical(feature: str):
    mapping = {}
    labels = df[feature].unique()
    for x, y in zip(labels, range(len(labels))):
        mapping[x] = y
    df[feature] = df[feature].map(mapping)

string_features = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
for feature in string_features:
    to_numerical(feature)  
X = df.drop('stroke',axis=1)
y = df.stroke
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2, random_state=42)
rf_c = RandomForestClassifier()
rf_c.fit(X_train, y_train)
ans = rf_c.score(X_test, y_test)

# print(ans, end="")

arr = sys.argv[1]
arr = arr.split(",")

#features = np.array([[1,3,1,1,1,2,4,3,2,1]])
features = np.array([arr])
prediction = rf_c.predict(features)
print(prediction, end="")