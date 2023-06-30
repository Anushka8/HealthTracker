from cassandra.cluster import Cluster
import pandas as pd
from passlib.hash import bcrypt

data = pd.read_csv('user.csv')
cluster = Cluster(['localhost:9042', 'localhost:9043'])
session = cluster.connect()
session.set_keyspace('health_tracker')
for index, row in data.iterrows():
    query = ("INSERT INTO user (user_id, name, username, email, dob, "
                    "gender, height, weight, password_hash) VALUES (uuid(), "
                    "'{}','{}','{}','{}','{}',{},{},'{}');"
                    .format(row['name'],row['username'], row['email'],
                            row['dob'], row['gender'], row['height'],
                            row['weight'], bcrypt.hash(row['password'])))
    session.execute(query)
session.shutdown()
cluster.shutdown()