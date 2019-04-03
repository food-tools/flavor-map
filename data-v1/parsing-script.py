"""
parsing flavor_bible_full.csv from https://github.com/areeves87/Flavor-Bible-App
to fit our data model
"""

import csv
import uuid
import pprint
import json
import re

SEASONS = ["summer", "winter", "autumn", "spring"]

# starting with this, trim rest of string
TRIM_STRING_FLAGS = ["see also", "e.g.", "i.e.", "esp.", "(say some)", "(key indgredient)"] # added "(", ")", ":" for exceptions_writer

# metadata
METADATA = ["season:", "taste:", "botanical relatives:", "function:", "weight:",
            "volume:", "tips:", "techniques:"]



flavor_bible = open('flavor_bible_full.csv', mode='r')
flavor_reader = csv.reader(flavor_bible, delimiter=',')

seasons = open('seasons.csv', mode='w')
seasons_writer = csv.writer(seasons, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

ingredients = open('ingredients.csv', mode='w')
ing_writer = csv.writer(ingredients, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

ingredient_metadata = open('ingredient_metadata.csv', mode='w')
ing_meta_writer = csv.writer(ingredient_metadata, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

cuisines = open('cuisines.csv', mode='w')
cuisines_writer = csv.writer(cuisines, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

cuisine_metadata = open('cuisine_metadata.csv', mode='w')
cuisine_meta_writer = csv.writer(cuisine_metadata, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

affinities = open('affinities.csv', mode='w')
affinities_writer = csv.writer(affinities, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

# exceptions = open('exceptions.csv', mode='w')
# exceptions_writer = csv.writer(exceptions, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

# strip extraneous info off of mains and pairings
def strip_extra(string, flag):
    index = string.find(flag)
    string = string[: index - 1]
    for char in ":, *":
        string = string.strip(char)
    return string

"""
SPLIT TO 3 CSVs: ingredients, cuisines, affinities
- set all main and pairing to lower case
- if main or pairing contains "cuisine" add to cuisine csv
- if pairing contains "+" add to flavor affinities csv
- if pairing == "Flavor affinities" skip  
"""
# store alternate ingredient names
aka = {}

first_row = True
for row in flavor_reader:
    if first_row:
        first_row = False
    else:
        row = list(map(lambda item: item.lower(), row)) #all lowercase
        [main, pairing] = row
        
        # put entries with extra info to be dealt with later in a separate csv
        # if any(string in main for string in TRIM_STRING_FLAGS) or any(string in pairing for string in TRIM_STRING_FLAGS):
            # exceptions_writer.writerow(row)

        # clean up extra info for now, these are captured in execeptions.csv
        for flag in TRIM_STRING_FLAGS:
            if flag in main:
                main = strip_extra(main, flag)
        for flag in TRIM_STRING_FLAGS:
            if flag in pairing:
                pairing = strip_extra(pairing, flag)
        row = [main, pairing]


        if any(string == main for string in SEASONS):
            seasons_writer.writerow(row)
        elif "cuisine" in main or "cuisine" in pairing:
            if any(string in pairing for string in METADATA):
                cuisine_meta_writer.writerow(row)
            elif pairing == "flavor affinities":
                continue
            elif "+" in pairing:
                affinities_writer.writerow(row)
            else:
                cuisines_writer.writerow(row)
        elif "+" in pairing:
            affinities_writer.writerow(row)
        elif pairing == "flavor affinities":
            continue
        elif any(string in pairing for string in METADATA):
                ing_meta_writer.writerow(row)
        else:
            if "aka:" in pairing:
                alt_names = list(pairing.strip("aka:").split(','))
                for name in alt_names:
                    aka[name] = main
            elif ':' in pairing:
                pairing = pairing.split(':')
                pairing[1] = list(pairing[1].split(','))
                for specifier in pairing[1]:
                    row = [main, "{},{}".format(pairing[0], specifier)]
                    ing_writer.writerow(row)
            else:
                ing_writer.writerow(row)


# set up uuids for each ingredient
# add all ingredients to a dictionary
ingredients_csv = open('ingredients.csv', mode='r')
ing_reader = csv.reader(ingredients_csv, delimiter=',')
ingredient_ids = {}
ingredients_data = {}
for row in ing_reader:
    for item in row:
        if item not in ingredient_ids:
            ingredient_ids[item] = str(uuid.uuid4())
        if item not in ingredients_data:
            ingredients_data[item] = {'name':str(item), 'id':str(ingredient_ids[item])}


# fill in ingredient metadata to the dictionary
ing_metadata_csv = open('ingredient_metadata.csv', mode='r')
ing_metadata_reader = csv.reader(ing_metadata_csv, delimiter=',')
for row in ing_metadata_reader:
    [item, data] = row
    for attribute in METADATA:
        if attribute in data:
            data = data[len(attribute) + 1:]
            attribute = attribute.strip(':')
            ingredients_data[item][str(attribute)] = data


# add pairings data to a list
ingredients_csv = open('ingredients.csv', mode='r')
ing_reader = csv.reader(ingredients_csv, delimiter=',')
pairings_data = []
for row in ing_reader:
    [main, pairing] = row
    [source, target] = [ingredient_ids[main], ingredient_ids[pairing]]
    if {"source":source, "target":target} not in pairings_data and {"source":target, "target":source} not in pairings_data:
        pairings_data.append({"source":source, "target":target})


# add cuisines data to a dictionary
# add ingredients if we come across new ones
cuisines_csv = open('cuisines.csv', mode='r')
cuisines_reader = csv.reader(cuisines_csv, delimiter=',')
cuisines_ids = {}
cuisines_data = {}
for row in cuisines_reader:
    [first, second] = row
    if "cuisine" in first:
        [cuisine, ingredient] = [first, second]
    else:
        [ingredient, cuisine] = [first, second]
    if cuisine not in cuisines_ids:
        cuisines_ids[cuisine] = str(uuid.uuid4())
    if ingredient not in ingredient_ids:
        ingredient_ids[ingredient] = str(uuid.uuid4())
        ingredients_data[ingredient] = {'name':str(ingredient), 'id':str(ingredient_ids[ingredient])}
    if cuisine not in cuisines_data:
        cuisines_data[cuisine] = {'name':str(cuisine), 'id':str(cuisines_ids[cuisine]), 'ingredients': [ingredient_ids[ingredient]]}
    else:
        cuisines_data[cuisine]['ingredients'].append(ingredient_ids[ingredient])


# format data how app expects it
ingredients_data_values_list = list(ingredients_data.values())
cuisines_data_values_list = list(cuisines_data.values())

# write all cleaned and formatted data to JSON files
with open('ingredients.json', 'w') as outfile:
    json.dump(ingredients_data_values_list, outfile)

with open('pairings.json', 'w') as outfile:
    json.dump(pairings_data, outfile)

with open('cuisines.json', 'w') as outfile:
    json.dump(cuisines_data_values_list, outfile)