import {
    IngredientTypes,
    IngredientSeasons,
    IngredientFunctions,
    IngredientTastes,
    IngredientWeights,
    IngredientVolumes
} from "./IngredientProperties";

import { NodeColorEncodings } from "../actions/actions";

export const IngredientTypeColors = {
    [IngredientTypes.VEGETABLE]: "#14453d",
    [IngredientTypes.FRUIT]: "#a3333d",
    [IngredientTypes.GRAIN]: "#c4a69d",
    [IngredientTypes.DAIRY]: "#7391ba",
    [IngredientTypes.FAT]: "#aa9052",
    [IngredientTypes.NUT]: "#363457",
    [IngredientTypes.MEAT]: "#6d3b47",
    [IngredientTypes.HERB]: "#98a886",
    [IngredientTypes.SPICE]: "#ba5734"
};

export const IngredientFunctionColors = {
    [IngredientFunctions.TEST]: "#14453d"
};

export const IngredientSeasonColors = {
    [IngredientSeasons.SPRING]: "#14453d",
    [IngredientSeasons.SUMMER]: "#a3333d",
    [IngredientSeasons.AUTUMN]: "#c4a69d",
    [IngredientSeasons.WINTER]: "#7391ba"
};

export const IngredientTasteColors = {
    [IngredientTastes.SALTY]: "#14453d",
    [IngredientTastes.SWEET]: "#a3333d",
    [IngredientTastes.SOUR]: "#c4a69d",
    [IngredientTastes.SAVORY]: "#7391ba"
};

export const IngredientWeightColors = {
    [IngredientWeights.HEAVY]: "#14453d",
    [IngredientWeights.MEDIUM]: "#a3333d",
    [IngredientWeights.LIGHT]: "#c4a69d"
};

export const IngredientVolumeColors = {
    [IngredientVolumes.QUIET]: "#14453d",
    [IngredientVolumes.MODERATE]: "#a3333d",
    [IngredientVolumes.MODERATE_LOUD]: "#c4a69d",
    [IngredientVolumes.LOUD]: "#7391ba"
};

export const GetColorScheme = (nodeColorEncoding=NodeColorEncodings.ENCODE_TYPE) => {
    switch (nodeColorEncoding) {
        case NodeColorEncodings.ENCODE_TYPE:
            return IngredientTypeColors;
        case NodeColorEncodings.ENCODE_FUNCTION:
            return IngredientFunctionColors;
        case NodeColorEncodings.ENCODE_SEASON:
            return IngredientSeasonColors;
        case NodeColorEncodings.ENCODE_TASTE:
            return IngredientTasteColors;
        case NodeColorEncodings.ENCODE_WEIGHT:
            return IngredientWeightColors;
        case NodeColorEncodings.ENCODE_VOLUME:
            return IngredientVolumeColors;
        default:
            return undefined;
    }
}

export const GetColorKey = (nodeColorEncoding=NodeColorEncodings.ENCODE_TYPE) => {
    switch (nodeColorEncoding) {
        case NodeColorEncodings.ENCODE_TYPE:
            return "type";
        case NodeColorEncodings.ENCODE_FUNCTION:
            return "function";
        case NodeColorEncodings.ENCODE_SEASON:
            return "season";
        case NodeColorEncodings.ENCODE_TASTE:
            return "taste";
        case NodeColorEncodings.ENCODE_WEIGHT:
            return "weight";
        case NodeColorEncodings.ENCODE_VOLUME:
            return "volume";
        default:
            return undefined;
    }
}
