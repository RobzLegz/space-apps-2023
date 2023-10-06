from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json


urls = [
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-3/3/2020_12_29_nasa-hdbk-4007_w-change_3_revalidated.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-1/1/Historical/2013-12-02_NASA-HDBK-4008_Draft1_Clean_Published.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/w/CHANGE-1/1/nasa-hdbk-4009a_w-chg_1.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-1/1/nasa-hdbk-_5010_revalidated.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-2/2/2022-12-16-NASA-HDBK-6024_w-Chg-2_Reval-Final.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-1/1/nasa-hdbk-6025_w_change_1.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-2/2/2021-07-16_nasa-spec-5022_w-change_2_revalidation_w-edit-admin_chgs_final.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/w/CHANGE-1/1/NASA-STD-4003A_w-Change-1-Revalidated.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/A/1/2021-11-17_NASA_STD_4005A_w-Change-1-Revalidation-Final.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/w/Change-1/1/nasa-std-4009a_w-chg_1.pdf",
]

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

        obj = {}

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

            if len(obj) > 1:
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
