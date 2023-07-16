from cassandra.cluster import Cluster

cluster = Cluster()  # create a cluster object
session = cluster.connect(keyspace='health_tracker')
result = session.execute("SELECT user_id FROM user WHERE username = %s ALLOW "
                    "FILTERING",
                          ('shlokgupta',)).one()
session.execute("DELETE FROM user WHERE user_id = %s", (result.user_id,))

session.shutdown()
cluster.shutdown()