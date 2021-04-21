from bs4 import BeautifulSoup
from .mparser import Parser
import requests


class MLScraper():

    @staticmethod
    def scrape(search):
        _results = []
        parser = Parser("mercadolibre")
        response = requests.get(
            "https://listado.mercadolibre.com.ar/" + search
        )
        soup = BeautifulSoup(response.text, "html.parser")
        search_results = soup.find("ol", {"id": "searchResults"})
        results = search_results.find_all("li", {"class": "results-item"})

        for result in results:
            title = result.find("span", {"class": "main-title"}).text
            price = MLScraper.getRawPrice(result.find(
                "span", {"class": "price__fraction"}).text)
            currency = MLScraper.getCurrency(result.find(
                "span", {"class": "price__symbol"}).text)
            image_url = MLScraper.findFirstImage(result)
            item_url = result.find(
                "a", {"class": ["item__info-link", "item__js-link"]}).get("href")

            _results.append({
                "title": title,
                "price": price,
                "image_url": image_url,
                "currency": currency,
                "item_url": ""
            })

        return [parser.parse(r) for r in _results]

    @staticmethod
    def findFirstImage(block):
        image_block = block.find("div", {"class": "image-content"})
        if image_block:
            image_container = image_block.get("img")
            if not image_container:
                image_container = image_block.a.img
        else:
            carousel = block.find("ul").find_all("li")
            image_container = carousel[0].a.img
        image_url = image_container.get("src")
        if not image_url:
            image_url = image_container.get("data-src")
        return image_url

    @staticmethod
    def getRawPrice(text):
        price = text.replace(".", "").split(",")[0]
        return int(price)

    @staticmethod
    def getCurrency(text):
        if text == "$":
            return "ARS"
        elif text == "U$S":
            return "USD"
        else:
            return ""
