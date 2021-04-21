from db_schema import db, User, Tracking, TrackingItem, Item
from peewee import SqliteDatabase


db.connect()

db.create_tables([User, Tracking, TrackingItem, Item])
juli = User.create(username='julian', password='julian')
juli.save()