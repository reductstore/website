import styles from "./styles.module.css";

export default function YouTube({ id }: { id: string }) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <div className={styles.videoWrapper}>
      <iframe
        className={styles.responsiveIframe}
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title="YouTube Video Player"
        allow="picture-in-picture"
        allowFullScreen
      />
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "14px", color: "#666" }}
        >
          Having trouble? Watch on YouTube →
        </a>
      </div>
    </div>
  );
}
