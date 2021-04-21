from .db_schema import User, Tracking, TrackingItem, Item
import peewee
import datetime
import json

class Db:

    def createUser(user):
        return User.create(
            username = user['username'],
            password = user['password'],
        )

    def getUser(name, password):
        return User.get(User.username == name, User.password == password)

    def saveTrackings(user, tracking):
        title = tracking["title"]
        price = float(tracking["trackingPrice"])
        currency = tracking["trackingCurrency"]
        user_id = user["id"]
        _tracking = Tracking.create(title=title, price=price, currency=currency, user_id=user_id)
        _items = Db.insertItems(tracking["selectedItems"])
        _titems = Db.createTrackingItems(_tracking, _items)
        return True

    def createTrackingItems(tracking, items):
        return [Db.createTrackingItem(tracking, item) for item in items]

    def createTrackingItem(tracking, item):
        titem = TrackingItem.create(
            tracking_id = tracking.id,
            item_id = item.id,
        )
        return titem

    def insertItems(items):
        return [Db.upsertItem(item) for item in items]

    def upsertItem(item):
        print(item)
        try:
            id = item['id']
            title = item['title']
            price = float(item['price'])
            currency = item['currency']
            url = item['url']
            image_url = item['image_url']
            source = item['source']
            _item = Item.create(
                id=id,
                title=title,
                price=price,
                currency=currency,
                url=url,
                image_url=image_url,
                source=source,
            )
        except peewee.IntegrityError:
            _item = Item.update(
                title=title,
                price=price,
                currency=currency,
                url=url,
                image_url=image_url,
                source=source,
                updated_at=datetime.datetime.now()
            ).where(
                id=id
            )

        return _item

    def getUserTrackings(id):
        result = []
        trackings = Tracking.select().where(Tracking.user == id)
        for t in trackings:
            tracking_data = t.serialize
            print(tracking_data)
            tracking_data["items"] = []
            tracking_items = TrackingItem.select().where(TrackingItem.tracking_id == t.id)
            for t_item in tracking_items:
                item = Item.get(Item.id == t_item.item_id)
                tracking_data["items"].append(item.serialize)
            result.append(tracking_data)

        return result


