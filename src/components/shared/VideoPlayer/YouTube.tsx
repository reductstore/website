import styles from "./styles.module.css";

export default function YouTube({ id }: { id: string }) {
  return (
    <div className={styles.videoWrapper}>
      <iframe
        className={styles.responsiveIframe}
        src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
