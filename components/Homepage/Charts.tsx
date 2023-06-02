import '@styles/homepage/chart-homepage.css'
import { Chart } from "@utils/utils";
import Link from "next/link";

interface ChartProps {
    charts: Chart[];
}

export default function Charts({ charts }: ChartProps) {
    return (
        <div className="chart-container">
            <h1>Charts</h1>
            {charts.length > 0 ? (
                <div className="charts-list">
                    {charts.map((chart) => (
                        <Link href={chart.url} key={chart.id} className="chart-card">
                            <img src={chart.image[chart.image.length - 1].link} alt={chart.title} />
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No charts available.</p>
            )}
        </div>
    );
}