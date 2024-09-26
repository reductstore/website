import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ImageWithLabelsProps } from "./ImageCarousel.types";

const ImageWithLabels: React.FC<ImageWithLabelsProps> = ({
  image,
  showLabels,
  dataset,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (imgRef.current) {
        setDimensions({
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight,
        });
      }
    };

    const img = imgRef.current;
    if (img) {
      img.addEventListener("load", updateDimensions);
      if (img.complete) updateDimensions();
    }

    return () => {
      if (img) {
        img.removeEventListener("load", updateDimensions);
      }
    };
  }, [image.url]);

  const calculateRelativeCoordinate = (x: number, y: number) => {
    if (!x && !y) return { x: 0, y: 0 };
    return {
      x: (x / (dimensions.width + 1e-3)) * 100,
      y: (y / (dimensions.height + 1e-3)) * 100,
    };
  };

  const renderImageLabels = () => {
    if (!showLabels) return null;

    switch (dataset) {
      case "imdb":
        const faceLocation = {
          x1: Number(image.labels.face_location_x),
          y1: Number(image.labels.face_location_y),
          x2: Number(image.labels.face_location_w),
          y2: Number(image.labels.face_location_h),
        };
        const relativeLocation = {
          x: (faceLocation.x1 / (dimensions.width + 1e-3)) * 100,
          y: (faceLocation.y1 / (dimensions.height + 1e-3)) * 100,
          w:
            ((faceLocation.x2 - faceLocation.x1) / (dimensions.width + 1e-3)) *
            100,
          h:
            ((faceLocation.y2 - faceLocation.y1) / (dimensions.height + 1e-3)) *
            100,
        };

        if (!Number(image.labels.face_score)) return null;

        return (
          <svg
            className={styles.svgImage}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x={relativeLocation.x}
              y={relativeLocation.y}
              width={relativeLocation.w}
              height={relativeLocation.h}
              fill="grey"
              fillOpacity="0.3"
              stroke="yellow"
              strokeWidth="0.5"
            />
          </svg>
        );
      case "cats":
        if (dimensions.width === 0 || dimensions.height === 0) return null;

        const leftEye = calculateRelativeCoordinate(
          Number(image.labels["left-eye-x"]),
          Number(image.labels["left-eye-y"]),
        );
        const rightEye = calculateRelativeCoordinate(
          Number(image.labels["right-eye-x"]),
          Number(image.labels["right-eye-y"]),
        );
        const mouth = calculateRelativeCoordinate(
          Number(image.labels["mouth-x"]),
          Number(image.labels["mouth-y"]),
        );
        const leftEar1 = calculateRelativeCoordinate(
          Number(image.labels["left-ear-1-x"]),
          Number(image.labels["left-ear-1-y"]),
        );
        const leftEar2 = calculateRelativeCoordinate(
          Number(image.labels["left-ear-2-x"]),
          Number(image.labels["left-ear-2-y"]),
        );
        const leftEar3 = calculateRelativeCoordinate(
          Number(image.labels["left-ear-3-x"]),
          Number(image.labels["left-ear-3-y"]),
        );
        const rightEar1 = calculateRelativeCoordinate(
          Number(image.labels["right-ear-1-x"]),
          Number(image.labels["right-ear-1-y"]),
        );
        const rightEar2 = calculateRelativeCoordinate(
          Number(image.labels["right-ear-2-x"]),
          Number(image.labels["right-ear-2-y"]),
        );
        const rightEar3 = calculateRelativeCoordinate(
          Number(image.labels["right-ear-3-x"]),
          Number(image.labels["right-ear-3-y"]),
        );

        return (
          <svg
            className={styles.svgImage}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx={leftEye.x}
              cy={leftEye.y}
              r="2"
              fill="blue"
              opacity="0.5"
            />
            <circle
              cx={rightEye.x}
              cy={rightEye.y}
              r="2"
              fill="blue"
              opacity="0.5"
            />
            <circle cx={mouth.x} cy={mouth.y} r="2" fill="blue" opacity="0.5" />
            <polygon
              points={`${leftEar1.x},${leftEar1.y} ${leftEar2.x},${leftEar2.y} ${leftEar3.x},${leftEar3.y}`}
              fill="green"
              opacity="0.5"
            />
            <polygon
              points={`${rightEar1.x},${rightEar1.y} ${rightEar2.x},${rightEar2.y} ${rightEar3.x},${rightEar3.y}`}
              fill="green"
              opacity="0.5"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const textLabels = () => {
    if (!showLabels) return null;

    switch (dataset) {
      case "imdb":
        return (
          <div className={styles.imageLabels}>
            <p>Name: {String(image.labels.name).slice(2, -1)}</p>
            <p>Gender: {image.labels.gender === "1.0" ? "Male" : "Female"}</p>
            <p>Photo Taken: {Number(image.labels.photo_taken)}</p>
            <p>
              Date of Birth:{" "}
              {new Date(Number(image.labels.dob) * 1000).toDateString()}
            </p>
            <p>Face Score: {Number(image.labels.face_score).toFixed(2)}</p>
          </div>
        );
      case "mnist_training":
        return (
          <div className={styles.imageLabels}>
            <p>Digit: {Number(image.labels.digit)}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.imageWithLabels}>
      <div className={styles.imageContainer}>
        <img ref={imgRef} src={image.url} alt="Dataset" />
        {renderImageLabels()}
      </div>
      {textLabels()}
    </div>
  );
};

export default ImageWithLabels;
