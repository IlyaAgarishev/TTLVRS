from datetime import datetime
from pony.orm import *
from db import db
import dateutil.parser
from geopy.distance import geodesic

class Location(db.Entity):
    latitude = Required(float)
    longitude = Required(float)
    name = Optional(str, nullable=True)
    events = Set('Event')

class Event(db.Entity):      
    name = Required(str)
    time_start = Required(datetime)
    time_end = Required(datetime)
    location = Required('Location')
    description = Optional(str, nullable=True)
    author = Optional('Author', nullable=True)

    def event_to_dict(self):
        event_dict = self.to_dict()
        event_dict['author'] = self.author.to_dict() if self.author else None
        event_dict['location'] = self.location.to_dict()
        return event_dict
    
class Author(db.Entity):
    name = Required(str)
    description = Optional(str, nullable=True)
    events = Set('Event')

@db_session
def add_event(event_dict):
    # print(event_dict)
    pos_dist = event_dict['location']
    loc = Location(latitude=pos_dist['latitude'], 
                   longitude=pos_dist['longitude'], 
                   name=pos_dist.get('name', None))
    Event(name=event_dict['name'], 
          time_start=get_time(event_dict['time_start']), 
          time_end=get_time(event_dict['time_end']), 
          location=loc, 
          description=event_dict.get('description', None), 
          author=event_dict.get('author', None))

@db_session
def add_author(author_dict):
    author = Author(name=author_dict['name'], 
                    description=author_dict.get('description', None))
    return author  

def get_event_ids_in_radius(Event, latitude, longitude, radius):
    relevant_event_ids = []
    for event in Event.select():
        event_location = event.location.latitude, event.location.longitude
        event_id = event.id
        if geodesic(event_location, (latitude, longitude)).m < radius:
            relevant_event_ids.append(event_id)
    return relevant_event_ids

def get_time(iso_time):
    return dateutil.parser.parse(iso_time)

def json_serial(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError (f"Type {type(obj)} is not serializable")

