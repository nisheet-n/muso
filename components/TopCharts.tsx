import Link from "next/link";

export default function TopCharts({ chartList }) {
    return (
        <div className="homepage-charts">
            <h2 className='homepage-chart-heading'>Top Charts</h2>
            <div className="homepage-chartlist">
                {
                    chartList?.map((chart) => (
                        <Link href={chart.url} key={chart.id} className="homepage-chart">
                            <img src={chart.image[2].link} alt={chart.title} height={200} width={200} className="homepage-chart-image" />
                        </Link>

                        // <Link href={`/album/${chart.id}`} key={chart.id} className="homepage-chart">
                        // 	<img src={chart.image[2].link} alt={chart.title} height={200} width={200} className="homepage-chart-image" />
                        // </Link>
                    ))
                }
            </div>
        </div>
    )
}
