"use client"

import '@styles/home.css'
import { BASE_URL } from '@utils/constants';
import Trending from '@components/Trending';
import TopCharts from '@components/TopCharts';
import { Albums, Charts } from '@utils/utils';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
	const [trendingAlbumList, setTrendingAlbumList] = useState<Array<Albums>>([]);
	const [chartList, setChartList] = useState<Array<Charts>>([]);

	useEffect(() => {
		async function getAnime() {
			const response = await axios.get(BASE_URL);
			setChartList(response.data.data.charts);
			setTrendingAlbumList(response.data.data.trending.albums);
		}
		getAnime();
	}, [])

	return (
		<div className="homepage">
			<Trending
				trendingAlbumList={trendingAlbumList}
			/>

			<TopCharts
				chartList={chartList}
			/>
		</div >
	)
}