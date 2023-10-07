import json

titles = [
    "Spacecraft High-Voltage Paschen and Corona Design Handbook",
    "Programmable Logic Devices (PLD) Handbook",
    "Space Telecommunications Radio Systems (STRS)Architecture Standard Rationale",
    "Fracture Control Implementation Handbook for Payloads, Experiments, and Similar Hardware",
    "Spacecraft Polymers Atomic Oxygen Durability Handbook",
    "Guidelines for the Specification and Certification of Titanium Alloys for NASA Flight Applications",
    "NASA Manufacturing and Test Requirements for Normally Closed Pyrovalves for Hazardous Flight Systems Applications",
    "Electrical Bonding for NASA Launch Vehicles, Spacecraft, Payloads, and Flight Equipment",
    "Low Earth Orbit Spacecraft Charging Design Standard",
    "Space Telecommunications Radio Systems (STRS) Architecture Standard",
    "Structural Design and Test Factors of Safety for Spaceflight Hardware",
]

new_data = []

prev_data = []

with open("./backend/src/data/std.json", "r") as json_file:
    prev_data = json.load(json_file)

for i, d in enumerate(prev_data):
    n_d = {
        "txt": d["pdf_text"],
        "title": titles[i]
    }

    new_data.append(n_d)

with open("d.json", "w") as json_file:
    json.dump(new_data, json_file)
