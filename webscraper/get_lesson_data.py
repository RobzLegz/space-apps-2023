from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json


with open("./webscraper/urls.json", "r") as json_file:
    urls = json.load(json_file)

driver = webdriver.Firefox()

data = []

for url in urls:
    try:
        driver.get(url)

        time.sleep(4)

        lesson = driver.find_element(By.CSS_SELECTOR, "div.lesson")

        lesson_data = lesson.find_elements(By.TAG_NAME, "div")

        obj = {
            "url": url
        }

        for d in lesson_data:
            try:
                title = d.find_element(By.TAG_NAME, "h3").text

                txt = d.text.replace(title, "")

                if title == "Subject":
                    obj["subject"] = txt.replace("\n", "")
                elif title == "Abstract":
                    obj["abstract"] = txt.replace("\n", "")
                elif title == "Driving Event":
                    obj["driving_event"] = txt.replace("\n", "")
                elif title == "Lesson(s) Learned":
                    obj["lessons_learned"] = txt.replace("\n", "")
                elif title == "Recommendation(s)":
                    obj["recomendations"] = txt.replace("\n", "")
                elif title == "Evidence of Recurrence Control Effectiveness":
                    obj["evidence"] = txt.replace("\n", "")
                elif title == "Program Relation":
                    obj["program_relation"] = txt.replace("\n", "")
                elif title == "Program/Project Phase":
                    obj["phase"] = txt.replace("\n", "")
                elif title == "Mission Directorate(s)":
                    obj["directories"] = txt.replace("\n", "")
                elif title == "Topic(s)":
                    obj["topics"] = txt.replace("\n", "")
            except Exception as e:
                print(e)
                pass

            if len(obj) > 2:
                print(obj)
                print("")
                data.append(obj)

                with open("data.json", "w") as json_file:
                    json.dump(data, json_file)
    except Exception as e:
        print(e)
        pass


with open("data.json", "w") as json_file:
    json.dump(data, json_file)
