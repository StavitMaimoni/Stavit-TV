export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    title: string;
    backdrop_path: string;
    media_type?: string;
    release_date?: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    popularity: number;
    video_key: number;
    poster_path: string;
    original_title: string;
    vote_average: number;
    vote_count: number;
}

export interface Credits {
    cast: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        character: string;
        credit_id: string;
        order: number;
    }[];
    crew: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        credit_id: string;
        department: string;
        job: string;
    }[];
    id: number;
}


export interface Element {
    type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}
