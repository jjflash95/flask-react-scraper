from peewee import *
import datetime


db = SqliteDatabase('./db/db.db')

class BaseModel(Model):
    class Meta:
        database = db

class User(BaseModel):
    username = CharField(unique=True)
    password = CharField()

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'username': self.username,
            'password': self.password,
        }

        return data

class Tracking(BaseModel):
    title = CharField()
    price = FloatField()
    currency = CharField() 
    user = ForeignKeyField(User, backref='user')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'title': self.title,
            'price': float(self.price),
            'currency': str(self.currency),
            'user': self.user.serialize,
        }

        return data

class Item(BaseModel):
    id = CharField(primary_key = True)
    title = TextField()
    price = FloatField()
    currency = CharField()
    url = TextField()
    image_url = TextField()
    source = CharField()
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'title': str(self.title).strip(),
            'price': float(self.price),
            'currency': str(self.currency),
            'url': str(self.url).strip(),
            'image_url': str(self.image_url).strip(),
            'source': str(self.source),
            'updated_at': str(self.updated_at),
        }

        return data

class TrackingItem(BaseModel):
    tracking_id = ForeignKeyField(Tracking, backref='tracking')
    item_id = ForeignKeyField(Item, backref="item")

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'tracking_id': str(self.tracking_id),
            'countrycode': str(self.item_id),
        }

        return data