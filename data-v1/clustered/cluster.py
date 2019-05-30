import json
import collections

def main():

    ingredients = json.load(open("../ingredients.json"))
    cuisines = json.load(open("../cuisines.json"))

    subsets = list()
    lookup = collections.defaultdict(list)

    for cuisine in cuisines:
        for ingredient in cuisine["ingredients"]:
            lookup[ingredient].append(cuisine["id"])

    for ingredient in ingredients:
        cluster = sorted(lookup[ingredient["id"]])
        cluster_index = -1
        for i, subset in enumerate(subsets):
            if set(cluster) == set(subset):
                cluster_index = i
                break
        if cluster_index == -1:
            cluster_index = len(subsets)
            subsets.append(cluster)
        ingredient["clusterId"] = cluster_index
    
    with open("ingredients.clustered.json", "w") as outfile:
        outfile.write(json.dumps(ingredients))

    with open("clusters.json", "w+") as outfile:
        outfile.write(json.dumps(subsets))
    
if __name__ == "__main__": 
    main()
