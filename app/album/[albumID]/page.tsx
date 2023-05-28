"use client"

import '@styles/album.css'
import { usePathname } from "next/navigation";
import { ALBUM_URL } from "@utils/constants"
import axios from "axios";
import { useEffect, useState } from "react";
import { Albums, Songs, Image } from '@utils/utils';
import Link from 'next/link';

export default function getAlbumDetails() {
    const albumID = usePathname().split('/album/')[1];

    const [albumDetails, setAlbumDetails] = useState<Array<Albums>>([]);
    const [albumImage, setAlbumImage] = useState<Array<Image>>([]);
    const [albumSongs, setAlbumSongs] = useState<Array<Songs>>([]);

    useEffect(() => {
        async function getAlbumDetails() {
            const response = await axios.get(ALBUM_URL + albumID);
            setAlbumDetails(response.data.data);
            setAlbumImage(response.data.data.image[2]);
            setAlbumSongs(response.data.data.songs);
        }
        getAlbumDetails();
    }, [])

    console.log(albumDetails)

    return (
        <div className="album-page">
            <div className="album-header">
                <div className='album-content'>
                    <p className='album-name'>{albumDetails.name}</p>
                    <p className='album-artists'>Artists: <br /> {albumDetails.primaryArtists}</p>
                    <p className='album-release-date'>{albumDetails.releaseDate}</p>
                    <br />
                    <div className='album-content-footer'>
                        <p className='album-songCount'>Songs: {albumDetails.songCount}</p>
                        <p className='album-released'>{albumDetails.year}</p>
                    </div>
                </div>

                <img src={albumImage.link} alt={albumDetails.name} className="album-image" />
            </div>

            {
                albumSongs?.map((song) => (
                    <div key={song.id} className='song-list'>
                        <div key={song.id} className="song">
                            <Link href={`/song/${song.id}`} className="song-title">{song.name}</Link>
                            <p className="song-artists">{song.primaryArtists}</p>
                            <p className="song-duration">{~~(song.duration / 60)}m {~~(song.duration % 60)}s</p>
                        </div>
                        <p className="song-language">{song.language}</p>
                        <div className='song-lyrics'>{song.hasLyrics ? "Yes" : "No"}</div>
                    </div>
                ))
            }
        </div >
    )
}
