"use client"

import '@styles/home.css'
import { BASE_URL } from '@utils/constants';
import { Album, Chart, Playlist } from '@utils/utils';
import Albums from '@components/Homepage/Albums';
import Charts from '@components/Homepage/Charts';
import Playlists from '@components/Homepage/Playlists';
import Loading from '@components/Loading';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse {
	data: {
		albums: Album[];
		charts: Chart[];
		playlists: Playlist[];
	};
}

export default function Home() {
	const [albums, setAlbums] = useState<Album[]>([]);
	const [charts, setCharts] = useState<Chart[]>([]);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<ApiResponse>(BASE_URL);

				const { albums, charts, playlists } = response.data.data;

				setAlbums(albums);
				setCharts(charts);
				setPlaylists(playlists);
				setIsLoading(false);
			}

			catch (error) {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='homepage'>
			<Albums albums={albums} />

			<Charts charts={charts} />

			<Playlists playlists={playlists} />
		</div>
	);
}