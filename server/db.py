from pony.orm import Database
import os


path_to_db = os.path.abspath('')
db_name = 'db.sqlite'
filename = f'{path_to_db}/{db_name}'

db = Database('sqlite', filename=filename, create_db=True)
