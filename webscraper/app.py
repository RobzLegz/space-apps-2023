from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

url = "https://llis.nasa.gov"

driver = webdriver.Firefox()

year_urls = []
urls = []

driver.get(url)

time.sleep(2)

elements_with_class = driver.find_elements(By.CSS_SELECTOR, "ul.list-group")  # Replace with your class name

last_element = None

if elements_with_class:
    last_element = elements_with_class[-1]


if last_element != None:
    for el in last_element.find_elements(By.TAG_NAME, "li"):
        y = el.find_element(By.TAG_NAME, "a").text
        year_urls.append(f"{url}/search?lesson_date={y}")

page = 1

all_urls = []

for yurl in year_urls:
    while True:
        try:
            u = f"{yurl}&page={page}"
            driver.get(u)
            time.sleep(3)

            p = driver.find_element(By.CSS_SELECTOR, "div.results")

            els = p.find_elements(By.TAG_NAME, "div")
            els = list(filter(lambda el: el.get_attribute("class") == "", els))
            
            if len(els) == 0:
                break

            for el in els:
                link = el.find_element(By.TAG_NAME, "a").get_attribute("href")
                if link in all_urls:
                    continue
                all_urls.append(link)    
                print(link)           

            page += 1
        except:
            break
    page = 1

driver.quit()

with open("urls.json", "w") as json_file:
    json.dump(all_urls, json_file)