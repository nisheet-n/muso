"use client"

import '@styles/album.css'
import { usePathname } from "next/navigation";
import { Songs, Image } from "@utils/utils"
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { SONG_URL } from '@utils/constants';
import Link from 'next/link';

interface SongData {
	id: string;
	name: string;
	primaryArtists: string;
	primaryArtistsId: string;
	downloadUrl: Array<{ quality: string; link: string }>;
	duration: string;
	image: Array<{ quality: string; link: string }>;
	album: { id: string; name: string };
	language: string;
	releaseDate: string;
	year: string;
	playCount: number;
}

export default function Song() {
	const [currentTrack, setCurrentTrack] = useState<SongData | null>(null);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [selectedQuality, setSelectedQuality] = useState<string>('');

	const songID = usePathname().split('/song/')[1];
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		async function fetchSong() {
			try {
				const response = await axios.get(SONG_URL + songID);
				const { data } = response.data;

				if (data.length > 0) {
					const track: SongData = data[0];
					setCurrentTrack(track);
					const lastQuality = track.downloadUrl[track.downloadUrl.length - 1].quality;
					setSelectedQuality(lastQuality);
				}
			} catch (error) {
				console.error('Error fetching song:', error);
			}
		}

		fetchSong();
	}, [songID]);

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

	function handleTimeUpdate(event: React.SyntheticEvent<HTMLAudioElement, Event>) {
		const time = Math.floor(event.currentTarget.currentTime);
		setCurrentTime(time);
	}

	function handleQualityChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const selectedQuality = event.target.value;
		setSelectedQuality(selectedQuality);
	}

	function getAudioSource(): string {
		const selectedDownload = currentTrack?.downloadUrl.find((download) => download.quality === selectedQuality);
		return selectedDownload?.link || '';
	}

	return (
		<div className="player">
			{currentTrack && (
				<div>
					<p>Title: {currentTrack.name}</p>
					<p>Artists:</p>

					{getArtistsArray(currentTrack.primaryArtists, currentTrack.primaryArtistsId).map((artist) => (
						<Link href={`/artist/${artist.id}`} key={artist.id}>
							{artist.name}
						</Link>
					))}

					<p>Duration: {currentTrack.duration ? formatDuration(currentTrack.duration) : '00:00'}</p>
					<p>Album: <Link href={`/album/${currentTrack.album.id}`}>{currentTrack.album.name}</Link></p>
					<p>Language: {currentTrack.language}</p>
					<p>Released: {currentTrack.releaseDate}</p>
					<p>Release Year: {currentTrack.year}</p>
					<p>PlayCount: {currentTrack.playCount}</p>
					<img src={currentTrack.image[2].link} alt={currentTrack.name} />

					<select value={selectedQuality} onChange={handleQualityChange}>
						{currentTrack.downloadUrl.map((download) => (
							<option key={download.quality} value={download.quality}>
								{download.quality}
							</option>
						))}
					</select>

					<audio controls ref={audioRef} src={getAudioSource()} onTimeUpdate={handleTimeUpdate} />
				</div>
			)}
		</div>
	);
}
