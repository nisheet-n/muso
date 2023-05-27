"use client"

import '@styles/home.css'
import { BASE_URL } from "@utils/utils";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';

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

export interface Songs {
	id: number;
	image: Image[];
	name: string;
	url: string;
}

export interface Image {
	link: string;
	quality: string;
}

export default function Home() {
	const [homeDataList, setHomeDatalList] = useState<Array<homeDataType>>([]);
	const [trendingAlbumList, setTrendingAlbumList] = useState<Array<Albums>>([]);
	const [chartList, setChartList] = useState<Array<Charts>>([]);

	useEffect(() => {
		async function getAnime() {
			const response = await axios.get(BASE_URL);
			setHomeDatalList(response.data.data);
			setChartList(response.data.data.charts);
			setTrendingAlbumList(response.data.data.trending.albums);
		}
		getAnime();
	}, [])

	// console.log(homeDataList)
	// console.log(trendingAlbumList)
	// console.log(chartList)

	return (
		<div className="homepage">
			<h2 className='homepage-album-heading'>Trending Albums</h2>
			<div className="homepage-albumlist">
				{
					trendingAlbumList?.map((trendingAlbum) => (
						<Link href={`/album/${trendingAlbum.id}`} key={trendingAlbum.id} className="homepage-album">
							<img src={trendingAlbum.image[2].link} alt={trendingAlbum.name} height={200} width={200} className="homepage-album-image" />
							<div className="homepage-album-title">{trendingAlbum.name}</div>
						</Link>
					))
				}
			</div>

			<h2 className='homepage-chart-heading'>Top Charts</h2>
			<div className="homepage-chartlist">
				{
					chartList?.map((chart) => (
						<a href={chart.url} key={chart.id} className="homepage-chart">
							<img src={chart.image[2].link} alt={chart.title} height={200} width={200} className="homepage-chart-image" />
						</a>

						// <Link href={`/album/${chart.id}`} key={chart.id} className="homepage-chart">
						// 	<img src={chart.image[2].link} alt={chart.title} height={200} width={200} className="homepage-chart-image" />
						// </Link>
					))
				}
			</div>
		</div >
	)
}