/**
* TodoModels.tsx
* Copyright: Microsoft 2018
*
* Data models used with Todo sample app.
*/

export interface Data{
    x:number;
    y:number;
}

export interface Todo {
    id:string;
    creationTime?: number;
    _searchTerms?: string;    
    title  : string;
    imaginaryPartX: number[]  ;
    imaginaryPartY :number[]  ;
    dfImaginaryPartX: number[] ,
    dfImaginaryPartY :number[] ;
    dfRealPartX :number[]  ;
    dfRealPartY: number[] ;
    chisq:number;
    lamdaLow: number;
    lamdaHigh: number;
    lamdaInit: number;
    deltachi:number;
    params:number[],
    alpha:number[][]
    tolerance:number;
    absorbanceReal:Data[],
    absorbanceImg:Data[],
    reflectanceReal:Data[],
    reflectanceImg:Data[],
    transmissionReal:Data[],
    transmissionImg:Data[],
    dielectricFunctionImg:Data[],
    dielectricFunctionReal:Data[],
    conductivityReal:Data[],
    conductivityImg:Data[],
    impedanceReal:Data[],
    impedanceImg:Data[],
    difference:Data[];
    refractionIndex:Data[],
    extincionCoef:Data[],
    type:string;
}