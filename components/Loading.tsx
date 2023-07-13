import "@styles/loading.css";

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-animation">
                <div className="loading-circle"></div>
                <div className="loading-text">Loading</div>
            </div>
        </div>
    );
};