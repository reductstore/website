import styles from './styles.module.css';

export default function YouTube({ id }: { id: string }) {
  return (
    <div className={styles.videoWrapper}>
      <iframe
        className={styles.responsiveIframe}
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
