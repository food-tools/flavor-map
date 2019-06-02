import json
import collections

def main():

    ingredients = json.load(open("ingredients.json"))
    cuisines = json.load(open("cuisines.json"))
    pairings = json.load(open("pairings.json"))

    subsets = list()
    lookup = collections.defaultdict(list)

    for cuisine in cuisines:
        for ingredient in cuisine["ingredients"]:
            lookup[ingredient].append(cuisine["id"])

    for ingredient in ingredients:
        cluster = sorted(lookup[ingredient["id"]])
        cluster_index = -1
        if len(cluster) > 0:
            for i, subset in enumerate(subsets):
                if set(cluster) == set(subset):
                    cluster_index = i
                    break
            if cluster_index == -1:
                cluster_index = len(subsets)
                subsets.append(cluster)
        ingredient["clusterId"] = cluster_index
        ingredient["cuisines"] = cluster

    ingredients_no_null_cuisines = list()
    pairings_no_null_cuisines = list()

    ids = list()
    
    for ingredient in ingredients:
        if ingredient["clusterId"] >= 0:
            ingredients_no_null_cuisines.append(ingredient)
            ids.append(ingredient["id"])

    for pairing in pairings: 
        if (pairing["source"] in ids) and (pairing["target"] in ids):
            pairings_no_null_cuisines.append(pairing)

    with open("pairings-no-null-cuisines.clustered.json", "w") as outfile:
        outfile.write(json.dumps(pairings_no_null_cuisines))
    
    with open("ingredients-no-null-cuisines.clustered.json", "w") as outfile:
        outfile.write(json.dumps(ingredients_no_null_cuisines))

    with open("clusters-no-null-cuisines.json", "w+") as outfile:
        outfile.write(json.dumps(subsets))

    with open("graph-no-null-cuisines.json", "w+") as outfile:
        graph = dict()
        graph["nodes"] = ingredients_no_null_cuisines
        graph["links"] = pairings_no_null_cuisines
        outfile.write(json.dumps(graph))
    
if __name__ == "__main__": 
    main()
