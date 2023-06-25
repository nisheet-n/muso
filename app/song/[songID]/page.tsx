"use client"

import '@styles/song-page.css'
import { SONG_URL, ALBUM_URL } from '@utils/constants';
import { SongData, AlbumData } from "@utils/utils"
import Loading from '@components/Loading';

import axios from "axios";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

interface ApiResponse {
	status: string;
	message: string | null;
	data: SongData[];
}

interface ApiResponseAlbum {
	status: string;
	message: string | null;
	data: AlbumData;
}

export default function Song() {
	const [song, setSong] = useState<ApiResponse | null>(null);
	const [selectedQuality, setSelectedQuality] = useState<string>('');
	const [songAlbum, setSongAlbum] = useState<AlbumData>();

	const songID = usePathname().split('/song/')[1];
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		async function fetchSong() {
			try {
				const response = await axios.get<ApiResponse>(SONG_URL + songID);
				const { data } = response.data;

				if (data.length > 0) {
					const track: SongData = data[0];
					setSong(response.data);

					const lastQuality = track.downloadUrl[track.downloadUrl.length - 1].quality;
					setSelectedQuality(lastQuality);

					// Fetch the song album data
					const albumResponse = await axios.get<ApiResponseAlbum>(ALBUM_URL + track.album.id);
					const albumData = albumResponse.data.data;
					setSongAlbum(albumData);
				}
			}
			catch (error) {
				console.error('Error fetching song and album data:', error);
			}
		}
		fetchSong();
	}, [songID]);

	if (!song) {
		return <Loading />;
	}

	const relatedSongs = songAlbum?.songs.filter((song) => song.id !== songID);

	function getArtistsArray(artists: string, artistIds: string): { id: string; name: string }[] {
		const artistArray = artists.split(", ");
		const artistIdArray = artistIds.split(", ");
		return artistArray.map((name, index) => ({
			id: artistIdArray[index],
			name: name,
		}));
	}

	function formatDuration(duration: number | string): string {
		const minutes = Math.floor(Number(duration) / 60);
		const seconds = Math.floor(Number(duration) % 60);
		const formattedMinutes = minutes.toString().padStart(2, '0');
		const formattedSeconds = seconds.toString().padStart(2, '0');
		return `${formattedMinutes}:${formattedSeconds}`;
	}

	function handleQualityChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const selectedQuality = event.target.value;
		setSelectedQuality(selectedQuality);
	}

	function getAudioSource(): string {
		const selectedDownload = song?.data[0].downloadUrl.find((download) => download.quality === selectedQuality);
		return selectedDownload?.link || '';
	}

	return (
		<div className="song-page">
			{song && (
				<div className="song-content">
					<div className="song-header">
						<img src={song.data[0].image[2].link} alt={song.data[0].name} className="song-image" />
						<div className='song-data'>
							<p className="song-title">
								{song.data[0].name.replace(/&quot;/g, '"')}
							</p>
							<p className="song-album">
								<Link href={`/album/${song.data[0].album.id}`}>{song.data[0].album.name.replace(/&quot;/g, '"')}</Link>
							</p>
							<div className="song-artist-container">
								{getArtistsArray(song.data[0].primaryArtists, song.data[0].primaryArtistsId).map(
									(artist) => (
										<Link href={`/artist/${artist.id}`} key={artist.id} className="song-artist-name">
											{artist.name}
										</Link>
									)
								)}
							</div>
							<p className="song-featured-artists">
								{getArtistsArray(song.data[0].featuredArtists, song.data[0].featuredArtistsId).map(
									(artist) => (
										<Link href={`/artist/${artist.id}`} key={artist.id} className="song-artist-name">
											{artist.name}
										</Link>
									)
								)}
							</p>
							<p className="song-release-year">{song.data[0].year}</p>
						</div>
					</div>
					<div className='song-details'>
						<p className="song-duration">
							Duration: {song.data[0].duration ? formatDuration(song.data[0].duration) : '00:00'}
						</p>

						<p className="song-language">Language: {song.data[0].language}</p>
						<p className="song-released">Released: {song.data[0].releaseDate}</p>
						<p className="song-playcount">PlayCount: {song.data[0].playCount}</p>
						<p className="song-label">Label: {song.data[0].label}</p>
						<p className="song-explicit-content">
							Explicit Content: {song.data[0].explicitContent ? 'Yes' : 'No'}
						</p>
						<p className="song-has-lyrics">{song.data[0].hasLyrics ? 'Lyrics Available' : 'Lyrics Unavailable'}</p>
						<p className="song-copyright">Copyright: {song.data[0].copyright}</p>

						<div className='song-options'>
							<a href={song.data[0].url} target='_blank' className='song-url'>Listen on JioSaavn</a>

							<select value={selectedQuality} onChange={handleQualityChange} className="song-quality">
								{song.data[0].downloadUrl.map((download) => (
									<option key={download.quality} value={download.quality}>
										{download.quality}
									</option>
								))}
							</select>
						</div>

						<audio controls ref={audioRef} src={getAudioSource()} className="song-audio" />
					</div>
				</div>
			)}

			{song && song.data[0].album && songAlbum?.songs && (
				<div className='album-songs-list'>
					<p className='album-songs-heading'>	More from <i>{songAlbum.name.replace(/&quot;/g, '"')}</i>:</p>
					{relatedSongs?.map((song) => (
						<div className='album-song' key={song.id}>
							<Link href={`/song/${song.id}`} className='album-song-title'>{song.name}</Link>
							<p className='album-song-artist'>{formatDuration(song.duration)}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}