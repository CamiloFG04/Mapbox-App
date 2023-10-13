// Generated by https://quicktype.io

export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text_es:              string;
    language_es?:         Language;
    place_name_es:        string;
    text:                 string;
    language?:            Language;
    place_name:           string;
    matching_text?:       string;
    matching_place_name?: string;
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
}

export interface Context {
    id:           string;
    mapbox_id:    string;
    text_es:      string;
    text:         string;
    wikidata?:    Wikidata;
    short_code?:  ShortCode;
    language_es?: Language;
    language?:    Language;
}

export enum Language {
    Es = "es",
}

export enum ShortCode {
    Co = "co",
    CoDc = "CO-DC",
}

export enum Wikidata {
    Q2841 = "Q2841",
    Q739 = "Q739",
}

export interface Geometry {
    coordinates: number[];
    type:        string;
}

export interface Properties {
    wikidata?:  string;
    landmark:   boolean;
    address?:   string;
    foursquare: string;
    category:   string;
    maki:       string;
}