# organize all possible ingredient properties

import csv
import pprint
import uuid
import json

METADATA = ["season:", "taste:", "botanical relatives:", "function:", "weight:",
            "volume:", "tips:", "techniques:"]

metadata_csv = open('ingredient_metadata.csv', mode='r')
data_reader = csv.reader(metadata_csv, delimiter=',')

# seasons = open('seasons.csv', mode='w')
# seasons_writer = csv.writer(seasons, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

# initialize property collections as sets to ensure uniqueness
props = {
    "season": set(),
    "taste": set(),
    "botanical relatives": set(),
    "function": set(),
    "weight": set(),
    "volume": set(),
    "tips": set(),
    "techniques": set()
}

# helper to avoid leading or trailing spaces
def clean_end_spaces(string):
    if string[0] == ' ':
        string = string[1:]
    if string[-1] == ' ':
        string = string[:-1]
    return string
    

# helper to further narrow down certain properties for uniqueness
def split_props(key):
    prop_ids = {}
    for prop in props[key]:
        items = list(prop.split(', '))
        for item in items:
            if '(' in item:
                item = item[:item.index('(')]
            item = clean_end_spaces(item)
            if '–' in item:
                sub_items = item.split('–')
                for sub_item in sub_items:
                    sub_item = clean_end_spaces(sub_item)
                    if sub_item not in prop_ids:
                        prop_ids[sub_item] = str(uuid.uuid4())
            elif item not in prop_ids:
                prop_ids[item] = str(uuid.uuid4())
    props[key] = prop_ids


# read in metadata and put all unique properties in a dict
for row in data_reader:
    [ingredient, data] = row
    for key in METADATA:
        if key in data:
            value = data[len(key) + 1:]
            props[key.strip(':')].add(value)

# narrow down for uniqueness all categories except tips
for key in props.keys():
    if key != "tips":
        split_props(key)

for key in props.keys():
    props[key] = list(props[key])

with open('metadata_unique_values.json', 'w') as metadata_json:
    json.dump(props, metadata_json)
    metadata_json.close()

with open("metadata_unique_values.txt", 'w') as metadata_txt:
    pprint.pprint(props, metadata_txt)
    metadata_txt.close()