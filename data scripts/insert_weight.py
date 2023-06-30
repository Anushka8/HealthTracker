# INSERT INTO weight (user_id, weight_id, timestamp, weight)
# VALUES (user_id_value, now(), '2023-06-01T09:00:00Z', 72.5);

from cassandra.cluster import Cluster
import pandas as pd
import uuid

data = pd.read_csv('weight.csv')
cluster = Cluster(['localhost'])
session = cluster.connect()
session.set_keyspace('health_tracker')
for index, row in data.iterrows():
    query = ("INSERT INTO weight (user_id,weight_id,timestamp,weight)"
             "VALUES ({},now(),'{}',{});"
             .format(uuid.UUID(row['user_id']),
                     row['timestamp'], row['weight']))
    print(query)
    session.execute(query)
session.shutdown()
cluster.shutdown()
