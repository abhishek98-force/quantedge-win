import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect("test.db")
cursor = conn.cursor()

# Check the schema of the strategy table
cursor.execute("PRAGMA table_info(strategy)")
schema = cursor.fetchall()
print("Schema of 'strategy' table:")
for column in schema:
    print(column)

# Query the strategy table
cursor.execute("SELECT * FROM strategy")
rows = cursor.fetchall()
print("\nData in 'strategy' table:")
for row in rows:
    print(row)

# Close the connection
conn.close()
