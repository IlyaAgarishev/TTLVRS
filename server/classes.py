from datetime import datetime
import dateutil.parser
from geopy.distance import geodesic
from pony.orm import *
import json

from db import db

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
    category = Optional(str, nullable=True)
    category_eng = Optional(str, nullable=True)
    media = Set('Media')
    description = Optional(str, nullable=True)
    author = Optional('Author', nullable=True)

    def event_to_dict(self):
        event_dict = self.to_dict()
        event_dict['author'] = self.author.to_dict() if self.author else None
        event_dict['location'] = self.location.to_dict()
        event_dict['media'] = list(map(lambda x: x.to_dict(), self.media))
        return event_dict
    
class Author(db.Entity):
    name = Required(str)
    description = Optional(str, nullable=True)
    events = Set('Event')

class Media(db.Entity):
    media_type = Required(str) # image or video
    link = Required(str)
    event = Required('Event')

Categories = {'entertainment': 'Развлечения', 'music': 'Музыка', 'progress': 'Развитие',
              'food': 'Еда', 'near': 'Близко', 'soon': 'Скоро', 'meeting': 'Собрание'}

@db_session
def add_event(event_dict):
    # print(event_dict)
    category = event_dict.get('category', None)
    loc_dict = event_dict['location']
    loc = Location(latitude=loc_dict['latitude'], 
                   longitude=loc_dict['longitude'], 
                   name=loc_dict.get('name', None))
    event = Event(name=event_dict['name'], 
                  time_start=get_time(event_dict['time_start']), 
                  time_end=get_time(event_dict['time_end']), 
                  location=loc, 
                  category=None if not category else Categories[category],
                  category_eng=category,
                  description=event_dict.get('description', None), 
                  author=event_dict.get('author', None))
    return event

@db_session
def add_author(author_dict):
    author = Author(name=author_dict['name'], 
                    description=author_dict.get('description', None))
    return author 

@db_session
def add_media(media_dict):
    Media(media_type=media_dict['media_type'], link=media_dict['link'], event=media_dict['event'])


def get_event_ids_in_radius(Event, latitude, longitude, radius):
    relevant_event_ids = []
    for event in Event.select():
        event_location = event.location.latitude, event.location.longitude
        event_id = event.id
        if geodesic(event_location, (latitude, longitude)).m < radius:
            relevant_event_ids.append(event_id)
    return relevant_event_ids

def get_event_ids_in_interval(Event, time_start, time_end):
    return select(event.id for event in Event 
                  if time_start <= event.time_start and 
                     event.time_start <= time_end)[:]

def get_event_ids_in_categories(Event, categories):
    categories = categories.split(',')
    return select(event.id for event in Event if event.category_eng in categories)[:]

def events_to_json(events):
    return json.dumps(list(map(lambda x: x.event_to_dict(), events)), default=json_serial)

def get_time(iso_time):
    return dateutil.parser.parse(iso_time)

def json_serial(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError (f"Type {type(obj)} is not serializable")
