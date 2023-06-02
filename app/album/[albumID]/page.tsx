"use client"

import '@styles/album-page.css'
import { ALBUM_URL } from "@utils/constants"
import { AlbumData } from '@utils/utils';
import Loading from '@components/Loading';
import Image from 'next/image';

import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';

interface ApiResponse {
    status: string;
    message: string | null;
    data: AlbumData;
}

export default function AlbumPage() {
    const albumID = usePathname().split('/album/')[1];

    const [album, setAlbum] = useState<AlbumData>();

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get<ApiResponse>(ALBUM_URL + albumID);
                const { data } = response.data;
                setAlbum(data);
            }

            catch (error) {
                console.error("Error fetching album data:", error);
            }
        };

        fetchAlbum();
    }, [albumID]);

    if (!album) {
        return <Loading />;
    }

    function formatDuration(duration: number | string): string {
        const minutes = Math.floor(Number(duration) / 60);
        const seconds = Math.floor(Number(duration) % 60);
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div className="album-page">
            <div className="album-content">
                <div className="album-header">
                    <div className="album-data">
                        <h1 className="album-name">{album.name.replace(/&quot;/g, '"')}</h1>
                        <p className="album-artists">{album.primaryArtists}</p>
                    </div>
                    <img src={album.image[album.image.length - 1].link} alt={album.name} className="album-image" />
                </div>

                <div className="song-list">
                    {album.songs.map((song) => (
                        <div className="song-item" key={song.id}>
                            <Image className='song-play'
                                src="/icons/play-icon.svg"
                                width={500}
                                height={500}
                                alt="Play/Pause"
                            />
                            <div className="song-data">
                                <Link href={`/song/${song.id}`} key={song.id} className="song-title">{song.name}</Link>
                                <p className="song-artists">{song.primaryArtists}</p>
                            </div>
                            <p className="song-duration">{formatDuration(song.duration)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="album-info">
                {album.songCount && <p className="album-songCount">{album.songCount} songs</p>}
                {album.releaseDate && <p className="album-release-date">Release Date: {album.releaseDate}</p>}
                {album.featuredArtists && album.featuredArtists.length > 0 && (
                    <div>
                        <h3>Featured Artists:</h3>
                        <ul>
                            {album.featuredArtists.map((artist, index) => (
                                <li key={index}>{artist}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {album.year && <p className="album-released">Year: {album.year}</p>}
                {album.url && <a href={album.url} target='_blank' className='album-link'>Listen on JioSaavn</a>}
            </div>
        </div>
    );
}