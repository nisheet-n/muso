import '@styles/homepage/playlist-homepage.css'
import { Playlist } from "@utils/utils";
import Link from "next/link";

interface PlaylistProps {
    playlists: Playlist[];
}

export default function Playlists({ playlists }: PlaylistProps) {
    return (
        <div className="playlist-container">
            <h1>Playlists</h1>
            {playlists.length > 0 ? (
                <div className="charts-list">
                    {playlists.map((playlist) => (
                        <Link href={playlist.url} key={playlist.id} className="playlist-card">
                            <img src={playlist.image[playlist.image.length - 1].link} alt={playlist.title} />
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No charts available.</p>
            )}
        </div>
    );
}