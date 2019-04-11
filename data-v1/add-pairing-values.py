'''

test to see if adding varying pairing values diminishes the hairball-ness
of the graph with the full dataset

'''
import random
import json

with open('pairings.json') as json_file:
    data = json.load(json_file)
    for pairing in data:
        pairing['value'] = random.randint(1,4)

with open('pairings.json', 'w') as outfile:
    json.dump(data, outfile)