"""
parsing flavor_bible_full.csv from https://github.com/areeves87/Flavor-Bible-App
to fit our data model
"""

import csv
import uuid

# starting with this, trim rest of string
TRIM_STRING_FLAGS = ["see also", "e.g.", "esp.", "aka"] # added "(", ")", ":" for exceptions_writer

# metadata
METADATA = ["season:", "taste:", "botanical relative", "function:", "weight:",
            "volume:", "tips:", "techniques:"]



flavor_bible = open('flavor_bible_full.csv', mode='r')
flavor_reader = csv.reader(flavor_bible, delimiter=',')

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
        row = [main.strip("*"), pairing.strip("*")]


        if "cuisine" in main or "cuisine" in pairing:
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
            ing_writer.writerow(row)





# create json files
# uuid.uuid4() random uuid
