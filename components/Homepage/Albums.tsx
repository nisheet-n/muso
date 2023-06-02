import '@styles/homepage/album-homepage.css'
import { Album } from "@utils/utils";
import Link from "next/link";
import { useState } from "react";

interface AlbumProps {
    albums: Album[];
}

export default function Albums({ albums }: AlbumProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex < albums.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    return (
        <div className="album-container">
            <h1>Albums</h1>

            <div className="button-container">
                <button onClick={handlePrevClick} disabled={activeIndex === 0}>
                    Prev
                </button>
                <button onClick={handleNextClick} disabled={activeIndex === albums.length - 1}>
                    Next
                </button>
            </div>

            {albums.length > 0 ? (
                <div className="albums-list">
                    <div className="album-slider" style={{ transform: `translateX(-${activeIndex * 220}px)` }}>
                        {albums.map((album, index) => (
                            <Link href={`/album/${album.id}`} key={album.id} className="album-card">
                                <img src={album.image[album.image.length - 1].link} alt={album.name} />
                                <p>{album.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No albums available.</p>
            )}
        </div>
    );
}
