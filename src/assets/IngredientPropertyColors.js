import {
    IngredientTypes,
    IngredientSeasons,
    IngredientFunctions,
    IngredientTastes,
    IngredientWeights,
    IngredientVolumes
} from "./IngredientProperties";

import { ClassyJack as ColorScheme } from "./Colors";

import { NodeColorEncodings } from "../actions/actions";

export const IngredientTypeColors = {
    [IngredientTypes.VEGETABLE]: ColorScheme.DARK_GREEN,
    [IngredientTypes.FRUIT]: ColorScheme.LIGHT_RED,
    [IngredientTypes.GRAIN]: ColorScheme.BEIGE,
    [IngredientTypes.DAIRY]: ColorScheme.LIGHT_BLUE,
    [IngredientTypes.FAT]: ColorScheme.YELLOW,
    [IngredientTypes.NUT]: ColorScheme.DARK_BLUE,
    [IngredientTypes.MEAT]: ColorScheme.DARK_RED,
    [IngredientTypes.HERB]: ColorScheme.LIGHT_GREEN,
    [IngredientTypes.SPICE]: ColorScheme.ORANGE
};

export const IngredientFunctionColors = {
    [IngredientFunctions.TEST]: ColorScheme.DARK_GREEN
};

export const IngredientSeasonColors = {
    [IngredientSeasons.SPRING]: ColorScheme.DARK_GREEN,
    [IngredientSeasons.SUMMER]: ColorScheme.LIGHT_RED,
    [IngredientSeasons.AUTUMN]: ColorScheme.BEIGE,
    [IngredientSeasons.WINTER]: ColorScheme.LIGHT_BLUE
};

export const IngredientTasteColors = {
    [IngredientTastes.SALTY]: ColorScheme.DARK_GREEN,
    [IngredientTastes.SWEET]: ColorScheme.LIGHT_RED,
    [IngredientTastes.SOUR]: ColorScheme.BEIGE,
    [IngredientTastes.SAVORY]: ColorScheme.LIGHT_BLUE
};

export const IngredientWeightColors = {
    [IngredientWeights.HEAVY]: ColorScheme.DARK_GREEN,
    [IngredientWeights.MEDIUM]: ColorScheme.LIGHT_RED,
    [IngredientWeights.LIGHT]: ColorScheme.BEIGE
};

export const IngredientVolumeColors = {
    [IngredientVolumes.QUIET]: ColorScheme.DARK_GREEN,
    [IngredientVolumes.MODERATE]: ColorScheme.LIGHT_RED,
    [IngredientVolumes.MODERATE_LOUD]: ColorScheme.BEIGE,
    [IngredientVolumes.LOUD]: ColorScheme.LIGHT_BLUE
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
