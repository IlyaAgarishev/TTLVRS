from datetime import datetime
from pony.orm import *
from db import db
import dateutil.parser


class Position(db.Entity):
    latitude = Required(float)
    longitude = Required(float)
    name = Optional(str, nullable=True)
    events = Set('Event')

class Event(db.Entity):      
    name = Required(str)
    time_start = Required(datetime)
    time_end = Required(datetime)
    position = Required('Position')
    description = Optional(str, nullable=True)
    author = Optional('Author', nullable=True)
    
class Author(db.Entity):
    name = Required(str)
    description = Optional(str, nullable=True)
    events = Set('Event')

@db_session
def add_event(event_dict):
    pos_dist = event_dict['position']
    pos = Position(latitude=pos_dist['latitude'], longitude=pos_dist['longitude'], name=pos_dist.get('name', None))
    Event(name=event_dict['name'], time_start=event_dict['time_start'], time_end=event_dict['time_end'], 
          position=pos, description=event_dict.get('description', None), author=event_dict.get('author', None))

@db_session
def add_author(author_dict):
    author = Author(name=author_dict['name'], description=author_dict.get('description', None))
    return author

def get_time(iso_time):
    return dateutil.parser.parse(iso_time)
