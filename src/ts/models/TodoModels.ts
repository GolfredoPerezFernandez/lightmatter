/**
* TodoModels.tsx
* Copyright: Microsoft 2018
*
* Data models used with Todo sample app.
*/

export interface Todo {
    id: string;
    creationTime: number;
    closeTime: number;
    duration: number;
    title: string;
    winning: string;
    winner: string;
    openPoll:boolean;
    description: string;
    totalVotes: number;
    options:Options[];
    _searchTerms: string;
}

export interface Options {
    id: string;
    creationTime: number;
    title: string;
    url: string;
    votes: number;
    votesPercent: string;
    _searchTerms: string;
}
