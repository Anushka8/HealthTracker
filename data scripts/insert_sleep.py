from cassandra.cluster import Cluster
import pandas as pd
import uuid

data = pd.read_csv('sleep.csv')
cluster = Cluster(['localhost'])
session = cluster.connect()
session.set_keyspace('health_tracker')
for index, row in data.iterrows():
    query = ("INSERT INTO sleep (user_id,sleep_id,start_time,end_time,duration)"
             "VALUES ({},now(),'{}','{}',{});"
             .format(uuid.UUID(row['user_id']),
                     row['start_time'], row['end_time'], row['duration']))
    print(query)
    session.execute(query)
session.shutdown()
cluster.shutdown()
