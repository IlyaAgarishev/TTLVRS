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
def add_position(latitude, longitude, name=None):
    Position(latitude=latitude, longitude=longitude, name=name)

@db_session
def add_event(name, time_start, time_end, position, description=None, author=None):
    Event(name=name, time_start=time_start, time_end=time_end, position=position, description=description, author=author)

@db_session
def add_author(name, description=None):
    Author(name=name, description=description)

def get_time(iso_time):
    return dateutil.parser.parse(iso_time)
