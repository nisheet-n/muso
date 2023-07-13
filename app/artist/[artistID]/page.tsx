"use client"

import '@styles/artist-page.css'
import { ARTIST_URL } from '@utils/constants';
import Loading from '@components/Loading';

import { usePathname } from "next/navigation";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

interface ArtistData {
	id: string;
	name: string;
	url: string;
	image: { quality: string; link: string }[];
	followerCount: string;
	fanCount: string;
	isVerified: boolean;
	dominantLanguage: string;
	dominantType: string;
	bio: string[];
	dob: string;
	fb: string;
	twitter: string;
	wiki: string;
	availableLanguages: string[];
	isRadioPresent: boolean;
}

export default function ArtistPage() {
	const artistID = usePathname().split('/artist/')[1];

	const [artist, setArtist] = useState<ArtistData | null>(null);

	useEffect(() => {
		const fetchArtist = async () => {
			try {
				const response = await axios.get<ArtistData>(ARTIST_URL + artistID);
				setArtist(response.data.data);
			}
			catch (error) {
				console.error('Error fetching artist:', error);
			}
		};

		fetchArtist();
	}, [artistID]);

	if (!artist) {
		return <Loading />;
	}

	const {
		name,
		url,
		image,
		followerCount,
		fanCount,
		isVerified,
		dominantLanguage,
		dominantType,
		bio,
		dob,
		fb,
		twitter,
		wiki,
		availableLanguages,
		isRadioPresent,
	} = artist;

	return (
		<div className="artist-page">
			<div className='artist-header'>
				{image.length > 0 && <img src={image[image.length - 1].link} alt={name} />}
				<div className="artist-content">
					<h1>{name}</h1>
					<p>{followerCount} followers on <a href={url} target='_blank' className='artist-url'>JioSaavn</a></p>
				</div>
			</div>

			<div className='artist-info'>
				<p>Fans: {fanCount}</p>
				<p>Verified: {isVerified ? 'Yes' : 'No'}</p>
				<p>Dominant Language: {dominantLanguage}</p>
				<p>Dominant Type: {dominantType}</p>
				{bio.length > 0 && <p>Bio: {bio.join(', ')}</p>}
				{dob && <p>Date of Birth: {dob}</p>}
				{fb && <p>Facebook: <a href={fb}>{fb}</a></p>}
				{twitter && <p>Twitter: <a href={twitter}>{twitter}</a></p>}
				{wiki && <p>Wikipedia: <a href={wiki}>{wiki}</a></p>}
				{availableLanguages.length > 0 && <p>Available Languages: {availableLanguages.join(', ')}</p>}
				<p>Radio Present: {isRadioPresent ? 'Yes' : 'No'}</p>
			</div>
		</div>
	);
}