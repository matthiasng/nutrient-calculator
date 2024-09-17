
import { blue, green, grey, pink, purple, red } from '@mui/material/colors';

export interface NutrientSchema {
    ingredients: NutrientSchemaIngredient[]
    ec: NutrientSchemaEC
}

export interface NutrientSchemaIngredient {
    name: string
    firstRoots: number
    firstTrueLeafes: number
    growing: number
    preFlowering: number
    flowering: number
    color: string
}

export interface NutrientSchemaEC {
    name: string
    firstRoots: string
    firstTrueLeafes: string
    growing: string
    preFlowering: string
    flowering: string
    color: string
}

export const nutrientSchema: NutrientSchema = {
    ingredients: [
        { name: "CalMag", firstRoots: 2, firstTrueLeafes: 2, growing: 2, preFlowering: 2, flowering: 2, color: blue["600"] },
        { name: "Grow", firstRoots: 0.5, firstTrueLeafes: 1, growing: 1.8, preFlowering: 2, flowering: 0.8, color: green["600"] },
        { name: "Micro", firstRoots: 0.5, firstTrueLeafes: 1, growing: 1.2, preFlowering: 2, flowering: 1.6, color: purple["600"] },
        { name: "Bloom", firstRoots: 0.5, firstTrueLeafes: 1, growing: 0.6, preFlowering: 1.5, flowering: 2.4, color: pink["600"] },
    ],
    ec: { name: "EC", firstRoots: "0,3-0,6", firstTrueLeafes: "0,8-1,2", growing: "1,3-1,8", preFlowering: "1,8-2,0", flowering: "1,4-2,2", color: grey["600"] }
};

export interface Plant {
    name: string
    optimalPhFrom: number
    optimalPhTo: number
    optimalEcFrom: number
    optimalEcTo: number
}

export const plants : Plant[] = [
    {
        name: "Cucumber",
        optimalPhFrom: 5.8,
        optimalPhTo: 6.0,
        optimalEcFrom: 1700,
        optimalEcTo: 2500,
    },
    {
        name: "Lettuce",
        optimalPhFrom: 5.5,
        optimalPhTo: 6.5,
        optimalEcFrom: 800,
        optimalEcTo: 1200,
    },
    {
        name: "Tomato",
        optimalPhFrom: 5.5,
        optimalPhTo: 6.0,
        optimalEcFrom: 2000,
        optimalEcTo: 5000,
    }
]
