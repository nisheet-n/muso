export interface Album {
    id: string;
    name: string;
    image: Image[];
    url: string;
}

export interface Chart {
    id: string;
    title: string;
    image: Image[];
    url: string;
}

export interface Playlist {
    id: string;
    title: string;
    image: Image[];
    url: string;
}

export interface Image {
    quality: string;
    link: string;
}

export interface AlbumData {
    id: string;
    name: string;
    year: string;
    releaseDate: string;
    songCount: string;
    url: string;
    primaryArtistsId: string;
    primaryArtists: string;
    image: { quality: string; link: string }[];
    songs: {
        id: string;
        name: string;
        type: string;
        album: { id: string; name: string; url: string };
        year: string;
        releaseDate: string;
        duration: string;
        label: string;
        primaryArtists: string;
        primaryArtistsId: string;
        featuredArtists: string;
        featuredArtistsId: string;
        explicitContent: number;
        playCount: string;
        language: string;
        hasLyrics: string;
        url: string;
        copyright: string;
        image: { quality: string; link: string }[];
        downloadUrl: { quality: string; link: string }[];
    }[];
};
