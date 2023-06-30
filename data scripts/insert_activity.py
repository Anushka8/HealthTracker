from cassandra.cluster import Cluster
import pandas as pd
import uuid

data = pd.read_csv('activity.csv')
cluster = Cluster(['localhost'])
session = cluster.connect()
session.set_keyspace('health_tracker')
for index, row in data.iterrows():
    query = ("INSERT INTO activity (activity_id, user_id, activity_type, "
             "start_time, end_time, duration, distance, calories_burned) "
             "VALUES (uuid(),{},'{}','{}','{}',{},{},{});".format(
        uuid.UUID(row['user_id']), row['activity_type'], row['start_time'],
        row['end_time'], row['duration'], row['distance'],
        row['calories_burned']))
    session.execute(query)
session.shutdown()
cluster.shutdown()