import requests, json
import re
from .mparser import Parser


class MLApi():
    apiUrl = "https://api.mercadolibre.com/sites/MLA"

    @staticmethod
    def search(term):
        r = requests.get(
            MLApi.apiUrl + "/search",
            params={"q": term, "sort": "price_asc"}
        )
        r = json.loads(r.text)
        parser = Parser("mercadolibre")
        out = []
        for product in r["results"]:
            product["currency"] = product["currency_id"]
            product["url"] = product["permalink"]
            product["image_url"] = MLApi.get_medium_sized_thumbnail(product["thumbnail"])
            product = parser.parse(product)
            out.append(product)

        return out

    @staticmethod
    def get_medium_sized_thumbnail(thumbnail_url):
        p = re.compile(r"-I\.jpg$")
        return p.sub("-J.jpg", thumbnail_url)


