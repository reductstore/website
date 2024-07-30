import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

const BUCKET_NAME = 'datasets';
const DATASETS = ['imdb', 'cats', 'mnist_training'];
const BASE_URL = 'http://localhost:8383/api/v1/b';
const NUM_IMAGES = {
  imdb: 10,
  cats: 10,
  mnist_training: 20,
};

interface DatasetInfo {
  name: string;
  record_count: number;
}

const ImageCarousel = () => {
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [images, setImages] = useState([]);
  const [dataset, setDataset] = useState(DATASETS[0]);
  const [start, setStart] = useState(0);
  const [error, setError] = useState(null);

  const fetchBucketInfo = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/${BUCKET_NAME}`);
      const { entries } = await response.json();
      const availableDatasets = entries.filter((entry) => entry.record_count > 0 && DATASETS.includes(entry.name));
      setDatasets(availableDatasets.map(({ name, record_count }) => ({ name, record_count })));
    } catch (error) {
      const errorMessage = `Error fetching bucket info: ${error.message}`;
      console.error(errorMessage);
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchBucketInfo();
  }, [fetchBucketInfo]);

  const fetchImages = useCallback(async () => {
    setError(null);

    let timeoutId;

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Request timed out.'));
      }, 10_000); // 10 seconds
    });

    try {
      const fetchPromise = (async () => {
        const stop = start + NUM_IMAGES[dataset] + 1;
        const queryResponse = await fetch(`${BASE_URL}/${BUCKET_NAME}/${dataset}/q?start=${start}&stop=${stop}`);
        const { id: queryId } = await queryResponse.json();

        if (!queryId) throw new Error('No ID returned from query.');

        const imageUrls = [];

        for (let i = 0; i < NUM_IMAGES[dataset]; i++) {
          const recordResponse = await fetch(`${BASE_URL}/${BUCKET_NAME}/${dataset}?q=${queryId}`);
          const recordBlob = await recordResponse.blob();
          const imageUrl = URL.createObjectURL(recordBlob);
          imageUrls.push(imageUrl);
          setImages([...imageUrls]);
        }
      })();

      await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
      const errorMessage = `Error fetching images: ${error.message}`;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      clearTimeout(timeoutId);
    }
  }, [dataset, start]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSliderChange = (event) => {
    const newStart = Number(event.target.value);
    setStart(newStart);
    fetchImages();
  };

  if (error) {
    return (
      <div className={styles.mainContainer}>
        <div className="alert alert--danger" role="alert">
          Unfortunately an error occurred while fetching the remote dataset images: &nbsp;
          <strong>{error}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.datasetSelect}>
        <label className={styles.formLabel}>Dataset</label>
        <div className="dropdown dropdown--hoverable">
          <button className="button button--primary">{dataset}</button>
          <ul className="dropdown__menu">
            {datasets.map((ds) => (
              <li key={ds.name}>
                <a
                  className="dropdown__link"
                  onClick={(e) => {
                    e.preventDefault();
                    setDataset(ds.name);
                    setStart(0);
                  }}
                >
                  {ds.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <label className={styles.formLabel} htmlFor="start-slider">Timeline</label>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            id="start-slider"
            className={styles.slider}
            min="0"
            max={datasets.find((ds) => ds.name === dataset)?.record_count - NUM_IMAGES[dataset] || 0}
            step={NUM_IMAGES[dataset]}
            value={start}
            onChange={handleSliderChange}
          />
          <span className={styles.sliderValue}>
            {start + 1} - {start + NUM_IMAGES[dataset]}
          </span>
        </div>
      </div>

      <div className={clsx(styles.imageCarousel, {
        [styles.mnistCarousel]: dataset === 'mnist_training'
      })}>
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={clsx(styles.imageWrapper, {
              [styles.mnistImageWrapper]: dataset === 'mnist_training'
            })}
          >
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              className={clsx(styles.image, {
                [styles.mnistImage]: dataset === 'mnist_training'
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
