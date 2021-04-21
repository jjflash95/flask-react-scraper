# curl "https://www.olx.com.ar/api/relevance/search?facet_limit=100&location=1000001&location_facet_limit=20&page=2&query=audi%20a4" \
#   --compressed

import requests
import json
from .mparser import Parser


class OLXApi():
    apiUrl = "https://www.olx.com.ar/api/relevance"
    baseItemUrl = "https://www.olx.com.ar/item/"

    def search(term):
        items = []
        r = requests.get(
            OLXApi.apiUrl + "/search", params={
            "query": term, "facet_limit": 50},
            headers={"authority": "www.olx.com.ar"}
        )
        while len(items) < 50:
            result = json.loads(r.text)
            parser = Parser("OLX")
            for _r in result["data"]:
                try:
                    _id = _r["id"]
                    title = _r["title"]
                    price = _r["price"]["value"]["raw"]
                    currency = _r["price"]["value"]["currency"]["iso_4217"]
                    image_url = _r["images"][0]["url"]
                    url = OLXApi.baseItemUrl + _r["id"]
                    items.append({
                        "id": _id,
                        "title": title,
                        "price": price,
                        "currency": currency,
                        "image_url": image_url,
                        "currency": currency,
                        "url": url
                    })
                except:
                    pass

            next_page_url = result["metadata"].get("next_page_url")
            if not next_page_url:
                break
            r = requests.get(next_page_url)

        return [parser.parse(item) for item in items]
