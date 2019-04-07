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
    [IngredientTypes.SPICE]: ColorScheme.ORANGE,
    "DEFAULT": ColorScheme.DEFAULT
};

export const IngredientFunctionColors = {
    [IngredientFunctions.TEST]: ColorScheme.DARK_GREEN,
    "DEFAULT": ColorScheme.DEFAULT
};

// changed for v1 data render
export const IngredientSeasonColors = {
    [IngredientSeasons.SPRING]: ColorScheme.SPRING,
    [IngredientSeasons.SUMMER]: ColorScheme.SUMMER,
    [IngredientSeasons.AUTUMN]: ColorScheme.AUTUMN,
    [IngredientSeasons.WINTER]: ColorScheme.WINTER,
    [IngredientSeasons.YEAR_ROUND]: ColorScheme.YEAR_ROUND,
    "DEFAULT": ColorScheme.DEFAULT
};

export const IngredientTasteColors = {
    [IngredientTastes.SALTY]: ColorScheme.LIGHT_BLUE,
    [IngredientTastes.SWEET]: ColorScheme.YELLOW,
    [IngredientTastes.SOUR]: ColorScheme.LIGHT_GREEN,
    [IngredientTastes.SAVORY]: ColorScheme.DARK_RED,
    "DEFAULT": ColorScheme.DEFAULT
};

export const IngredientWeightColors = {
    [IngredientWeights.HEAVY]: ColorScheme.DARK_RED,
    [IngredientWeights.MEDIUM]: ColorScheme.ORANGE,
    [IngredientWeights.LIGHT]: ColorScheme.YELLOW,
    "DEFAULT": ColorScheme.DEFAULT
};

export const IngredientVolumeColors = {
    [IngredientVolumes.QUIET]: ColorScheme.LIGHT_BLUE,
    [IngredientVolumes.MODERATE]: ColorScheme.BEIGE,
    [IngredientVolumes.MODERATE_LOUD]: ColorScheme.YELLOW,
    [IngredientVolumes.LOUD]: ColorScheme.DARK_RED,
    "DEFAULT": ColorScheme.DEFAULT
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
