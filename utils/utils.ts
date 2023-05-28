export interface homeDataType {
    albums: Albums[];
    charts: Charts[];
    trending: Trending[];
}

export interface Albums {
    id: number;
    image: Image[];
    name: string;
    url: string;
}

export interface Charts {
    id: number;
    image: Image[];
    title: string;
    url: string;
}

export interface Trending {
    albums: Albums[];
    songs: Songs[];
}

export interface Image {
    link: string;
    quality: string;
}


export interface Albums {
    id: number;
    image: Image[];
    name: string;
    primaryArtists: string;
    releaseDate: string;
    songCount: number;
    songs: Songs[];
    url: string;
    year: number;
}

export interface Songs {
    id: string;
    name: string;
    primaryArtists: string;
    album: Albums[];
    image: Image[];
    duration: number;
    language: string;
    hasLyrics: boolean;
    url: string;
    year: number;
}
