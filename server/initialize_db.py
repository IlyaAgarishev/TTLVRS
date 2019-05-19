from datetime import datetime

from db import db
from classes import *


if __name__ == "__main__":
    db.generate_mapping(create_tables=True)
    
    with db_session:
        #####
        author = {'name':'Музыкант Володя', 
                  'description':'Привет, я Володя и я люблю играть на гитаре)))'}
        author = add_author(author)
        loc = {'latitude':56.837773, 'longitude':60.603695, 
               'name':'Родонитовый монолит'}
        event = add_event({'name':'Музыкальный вечер', 
                           'time_start':'2019-05-19T20:00:00', 
                           'time_end':'2019-05-20T00:00:00', 
                           'location':loc,
                           'category':'music',
                           'description':'Будем петь песни и веселиться!\nЗовите друзей!', 
                            'author':author})
        add_media({'media_type': 'image', 'link': 'https://avatars.mds.yandex.net/get-altay/904281/2a0000016286ede0dd0e1195ac586b93bb90/XXXL', 
                  'event': event})
        loc = {'latitude':56.838453, 'longitude':60.602941, 
               'name':'Бюст Д. Н. Мамина-Сибиряка'}
        event = add_event({'name':'Музыкальный вечер', 
                           'time_start':'2019-05-20T20:00:00', 
                           'time_end':'2019-05-21T00:00:00', 
                           'location':loc, 
                           'category':'music',
                           'description':'Будем петь песни и веселиться!\nЗовите друзей!', 
                            'author':author})
        add_media({'media_type': 'image', 'link': 'https://avatars.mds.yandex.net/get-altay/367512/2a0000015cb19a41a452b4d946d75518c163/XXXL', 
                  'event': event})
        add_media({'media_type': 'image', 'link': 'http://semantic.uraic.ru/icons/getimage.ashx?id=31383', 
                  'event': event})
        add_media({'media_type': 'image', 'link': 'https://media-cdn.tripadvisor.com/media/photo-s/08/09/ed/60/caption.jpg',
                  'event': event})
        #####
        author = {'name':'Гриль-Бар "Аппетитные ляшки"', 
                  'description':'У нас вы можете отведать самое вкусное мясо в городе.\nМы ручаемся!'}
        author = add_author(author)
        loc = {'latitude':56.842824, 'longitude':60.595459, 
               'name':'Сквер у Театра Драмы'}
        event = add_event({'name':'Фестиваль Барбекю', 
                           'time_start':'2019-05-20T12:00:00', 
                           'time_end':'2019-05-20T20:00:00', 
                           'location':loc,
                           'category':'food',
                           'description':'Будем набивать мясо вкуснейшими сосисками!\nПриходите всей семьёй!', 
                            'author':author})
        add_media({'media_type': 'image', 'link': 'https://i1.u-mama.ru/953/cfd/971/ecc9481b0cdefc674c61e0a638fb759f.jpg', 
                  'event': event})
        #####
        author = {'name':'Неравнодушные люди', 
                  'description':'Мы хотим свободы!'}
        author = add_author(author)
        loc = {'latitude':56.841779, 'longitude':60.597326, 
               'name':'Сквер у Театра Драмы'}
        event = add_event({'name':'Митинг #МыЗаХрам', 
                           'time_start':'2019-05-19T16:00:00', 
                           'time_end':'2019-05-20T02:00:00', 
                           'location':loc,
                           'category':'meeting',
                           'description':'Мы за экологичный город!', 
                            'author':author})
        add_media({'media_type': 'image', 'link': 'https://s14.stc.all.kpcdn.net/share/i/12/10903358/inx960x640.jpg', 
                  'event': event})
        #####
        author = {'name':'Члены партии КПРФ', 
                  'description':'Мы - активная часть партии и её движущая сила!'}
        author = add_author(author)
        loc = {'latitude':56.837823, 'longitude':60.596343, 
               'name':'Памятник Ленину'}
        add_event({'name':'Протест КПРФ', 
                   'time_start':'2019-05-20T12:00:00', 
                   'time_end':'2019-05-20T17:00:00', 
                   'location':loc,
                   'category':'meeting',
                   'description':'Будем протестовать против повышения пенсионного возраста!', 
                   'author':author})
        add_event({'name':'Очередной протест КПРФ', 
                    'time_start':'2019-05-21T12:00:00', 
                    'time_end':'2019-05-21T17:00:00', 
                    'location':loc, 
                   'category':'meeting',
                    'description':'Будем снова протестовать против повышения пенсионного возраста!', 
                    'author':author})
        #####
        author = {'name':'Гос. Центр Современного Искусства', 
                  'description':'Уральский филиал ГЦСИ: крутые и живые выставки.\nДобро Пожаловать!'}
        author = add_author(author)
        loc = {'latitude':56.831074, 'longitude':60.604684, 
               'name':'Центр современного искусства'}
        add_event({'name':'Выставка, посвященная Стрит-Арту', 
                   'time_start':'2019-05-20T12:00:00', 
                   'time_end':'2019-05-30T20:00:00', 
                   'location':loc, 
                   'category':'entertainment',
                   'description':'Будут представлены работы многих известных артистов ЕКБ.', 
                   'author':author})
        #####
        author = {'name':'Музей В.С. Высоцкого', 
                  'description':'Музей одного из самых известных народных исполнителей.'}
        author = add_author(author)
        loc = {'latitude':56.836008, 'longitude':60.614662, 
               'name':'Небоскрёб Высоцкий'}
        add_event({'name':'Выставка в музее В.С. Высоцкого', 
                   'time_start':'2019-05-20T12:00:00', 
                   'time_end':'2019-05-30T20:00:00', 
                   'location':loc, 
                   'category':'entertainment',
                   'description':'Ранее неизданные работы и произведения.', 
                   'author':author})
