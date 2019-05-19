from datetime import datetime

from db import db
from classes import *


if __name__ == "__main__":
    db.generate_mapping(create_tables=True)
    
    with db_session:
        author = {'name':'Музыкант Володя', 
                  'description':'Привет, я Володя и я люблю играть на гитаре)))'}
        author = add_author(author)
        loc = {'latitude':56.837773, 'longitude':60.603695, 
               'name':'Родонитовый монолит'}
        add_event({'name':'Музыкальный вечер', 
                   'time_start':'2019-05-19T20:00:00', 
                   'time_end':'2019-05-20T00:00:00', 
                   'location':loc, 
                   'description':'Будем петь песни и веселиться!\nЗовите друзей!', 
                   'author':author})
        loc = {'latitude':56.838453, 'longitude':60.602941, 
               'name':'Бюст Д. Н. Мамина-Сибиряка'}
        add_event({'name':'Музыкальный вечер', 
                   'time_start':'2019-05-20T20:00:00', 
                   'time_end':'2019-05-21T00:00:00', 
                   'location':loc, 
                   'description':'Будем петь песни и веселиться!\nЗовите друзей!', 
                   'author':author})

        author = {'name':'Члены партии КПРФ', 
                  'description':'Мы - активная часть партии и её движущая сила!'}
        author = add_author(author)
        loc = {'latitude':56.837823, 'longitude':60.596343, 
               'name':'Памятник Ленину'}
        add_event({'name':'Протест КПРФ', 
                   'time_start':'2019-05-20T12:00:00', 
                   'time_end':'2019-05-20T17:00:00', 
                   'location':loc, 
                   'description':'Будем протестовать против повышения пенсионного возраста!', 
                   'author':author})
        add_event({'name':'Очередной протест КПРФ', 
                    'time_start':'2019-05-21T12:00:00', 
                    'time_end':'2019-05-21T17:00:00', 
                    'location':loc, 
                    'description':'Будем снова протестовать против повышения пенсионного возраста!', 
                    'author':author})

        author = {'name':'Гос. Центр Современного Искусства', 
                  'description':'Уральский филиал ГЦСИ: крутые и живые выставки.\nДобро Пожаловать!'}
        author = add_author(author)
        loc = {'latitude':56.831074, 'longitude':60.604684, 
               'name':'Центр современного искусства'}
        add_event({'name':'Выставка, посвященная Стрит-Арту', 
                   'time_start':'2019-05-20T12:00:00', 
                   'time_end':'2019-05-30T20:00:00', 
                   'location':loc, 
                   'description':'Будут представлены работы многих известных артистов ЕКБ.', 
                   'author':author})

        author = {'name':'Музей В.С. Высоцкого', 
                  'description':'Музей одного из самых известных народных исполнителей.'}
        author = add_author(author)
        loc = {'latitude':56.836008, 'longitude':60.614662, 
               'name':'Небоскрёб Высоцкий'}
        add_event({'name':'Выставка в музее В.С. Высоцкого', 
                   'time_start':'2019-05-20T12:00:00', 
                   'time_end':'2019-05-30T20:00:00', 
                   'location':loc, 
                   'description':'Ранее неизданные работы и произведения.', 
                   'author':author})
