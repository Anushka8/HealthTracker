from cassandra.cluster import Cluster
import pandas as pd
import uuid

data = pd.read_csv('heart_rate.csv')
cluster = Cluster(['localhost'])
session = cluster.connect()
session.set_keyspace('health_tracker')
for index, row in data.iterrows():
    query = ("INSERT INTO heart_rate (user_id, "
             "heart_rate_id, timestamp, heart_rate)"
             "VALUES ({},now(),'{}',{});"
             .format(uuid.UUID(row['user_id']),
                     row['timestamp'],
                     row['heart_rate']))
    print(query)
    session.execute(query)
session.shutdown()
cluster.shutdown()


# INSERT INTO heart_rate.csv (user_id, heart_rate_id, timestamp, heart_rate.csv)
# VALUES (user_id_value, now(), '2023-06-01T12:00:00Z', 80);