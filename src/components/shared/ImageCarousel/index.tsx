import React, { useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useImageFetcher } from "./useImageFetcher";
import ImageWithLabels from "./ImageWithLabels";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const DATASETS = {
  imdb: {
    id: "imdb",
    name: "IMDB",
    numImages: 10,
  },
  cats: {
    id: "cats",
    name: "Cat",
    numImages: 10,
  },
  mnist_training: {
    id: "mnist_training",
    name: "MNIST",
    numImages: 20,
  },
};

const ImageCarousel = () => {
  if (ExecutionEnvironment.canUseDOM && window.innerWidth < 768) {
    return (
      <div className={styles.mainContainer}>
        <div className="alert alert--warning" role="alert">
          The datasets are best viewed on a larger screen. Please switch to a
          desktop or laptop for the best experience.
        </div>
      </div>
    );
  }

  const [dataset, setDataset] = useState("imdb");
  const [start, setStart] = useState(0);
  const [showLabels, setShowLabels] = useState(true);

  const numImages = DATASETS[dataset].numImages;
  const datasetName = DATASETS[dataset].name;
  const datasetIds = Object.keys(DATASETS);

  const { datasets, imagesWithLabels, error } = useImageFetcher(
    dataset,
    start,
    numImages,
    datasetIds,
  );

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = Number(event.target.value);
    setStart(newStart);
  };

  const maxImages =
    Number(datasets.find((ds) => ds.name === dataset)?.recordCount) -
      numImages || 0;

  if (error) {
    return (
      <div className={styles.mainContainer}>
        <div className="alert alert--danger" role="alert">
          Unfortunately an error occurred while fetching the remote dataset
          images: &nbsp;
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
            <button className="button button--primary">{datasetName}</button>
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
                    {DATASETS[ds.name].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={clsx("col col--1", styles.labeledInput)}>
          <label className={styles.inputLabel}>Labels</label>
          <button
            className={"button button--secondary"}
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? (
              <EyeIcon
                size="1em"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            ) : (
              <EyeSlashIcon
                size="1em"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            )}
          </button>
        </div>

        <div className={clsx("col col--9", styles.labeledInput)}>
          <label className={styles.inputLabel} htmlFor="start-slider">
            Timeline
          </label>
          <div className={styles.sliderWrapper}>
            <span className={styles.sliderValue}>
              {start + 1} - {start + numImages}
            </span>
            <input
              type="range"
              id="slider"
              className={styles.slider}
              min="0"
              max={maxImages}
              step={numImages}
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
            imageNumber={start + index + 1}
            showLabels={showLabels}
            dataset={dataset}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
