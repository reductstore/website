import React, { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import { useImageFetcher } from './useImageFetcher';
import ImageWithLabels from './ImageWithLabels';
import {
  FaEye as EyeIcon,
  FaEyeSlash as EyeSlashIcon,
} from 'react-icons/fa';

const DATASETS = ['imdb', 'cats', 'mnist_training'];
const DATASET_NAMES = {
  imdb: 'IMDB',
  cats: 'Cat',
  mnist_training: 'MNIST',
};
const NUM_IMAGES = {
  imdb: 10,
  cats: 10,
  mnist_training: 20,
};

const ImageCarousel = () => {
  const [dataset, setDataset] = useState(DATASETS[0]);
  const [start, setStart] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const { datasets, imagesWithLabels, error } = useImageFetcher(dataset, start);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = Number(event.target.value);
    setStart(newStart);
  };
  const maxImages = Number(datasets.find((ds) => ds.name === dataset)?.recordCount) - NUM_IMAGES[dataset] || 0;

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
      <div className={clsx("row", styles.inputRow)}>
        <div className={clsx("col col--1", styles.labeledInput)}>
          <label className={styles.inputLabel}>Dataset</label>
          <div className="dropdown dropdown--left dropdown--hoverable">
            <button className="button button--primary" >
              {DATASET_NAMES[dataset]}
            </button>
            <ul className="dropdown__menu">
              {datasets.map((ds) => (
                <li key={ds.name}>
                  <a
                    className={clsx("dropdown__link", styles.dropdownLink)}
                    onClick={(e) => {
                      e.preventDefault();
                      setDataset(ds.name);
                      setStart(0);
                    }}
                  >
                    {DATASET_NAMES[ds.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={clsx("col col--1", styles.labeledInput)}>
          <label className={styles.inputLabel}>Labels</label>
          <button className={'button button--secondary'}
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ?
              <EyeIcon size="1em" style={{ color: "var(--ifm-color-primary)" }} /> :
              <EyeSlashIcon size="1em" style={{ color: "var(--ifm-color-primary)" }} />
            }
          </button>
        </div>

        <div className={clsx("col col--9", styles.labeledInput)}>
          <label className={styles.inputLabel} htmlFor="start-slider">Timeline</label>
          <div className={styles.sliderWrapper}>
            <span className={styles.sliderValue}>
              {start + 1} - {start + NUM_IMAGES[dataset]}
            </span>
            <input
              type="range"
              id="slider"
              className={styles.slider}
              min="0"
              max={maxImages}
              step={NUM_IMAGES[dataset]}
              value={start}
              onChange={handleSliderChange}
            />
          </div>
        </div>

      </div>

      <div className={styles.imageCarousel}>
        {imagesWithLabels.map((image, index) => (
          <ImageWithLabels
            key={index}
            image={image}
            showLabels={showLabels}
            dataset={dataset}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
