
class Parser():

    def __init__(self, source):
        self.source = source

    def parse(self, product: dict):
        parsed = {
            'id': product['id'],
            'title': product['title'],
            'price': product['price'],
            'currency': product['currency'],
            'image_url': product['image_url'],
            'url': product['url'],
            'source': self.source,
        }
        return parsed
