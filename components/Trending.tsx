import Link from "next/link";

export default function Trending({ trendingAlbumList }) {
    return (
        <div className="homepage-albums">
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
        </div>
    )
}
