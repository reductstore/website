import { useState, useEffect, useCallback, useRef } from "react";
import { Client } from "reduct-js";
import debounce from "lodash/debounce";
import { LabelMap } from "reduct-js/lib/cjs/Record";

export interface ImageWithLabelsItem {
  url: string;
  labels: LabelMap;
}

interface DatasetInfo {
  name: string;
  recordCount: number;
}

const BUCKET_NAME = "datasets";
const DATASETS = ["imdb", "cats", "mnist_training"];
const BASE_URL = "http://localhost:8384";
const API_TOKEN = "reductstore";
const NUM_IMAGES = {
  imdb: 10,
  cats: 10,
  mnist_training: 20,
};

const client = new Client(BASE_URL, {
  apiToken: API_TOKEN,
});

export const useImageFetcher = (dataset: string, start: number) => {
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [imagesWithLabels, setImagesWithLabels] = useState<ImageWithLabelsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const imageUrlsRef = useRef<string[]>([]);

  const fetchBucketInfo = useCallback(async () => {
    try {
      const bucket = await client.getBucket(BUCKET_NAME);
      const entries = await bucket.getEntryList();
      const availableDatasets = entries.filter(
        (entry) => entry.recordCount > 0 && DATASETS.includes(entry.name)
      );

      setDatasets(
        availableDatasets.map(({ name, recordCount }) => ({
          name,
          recordCount: Number(recordCount),
        }))
      );
    } catch (error) {
      const errorMessage = `Error fetching bucket info: ${(error as Error).message
        }`;
      console.error(errorMessage);
      setError(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchBucketInfo();
  }, [fetchBucketInfo]);

  const revokeImageUrls = useCallback(() => {
    imageUrlsRef.current.forEach(URL.revokeObjectURL);
    imageUrlsRef.current = [];
  }, []);

  const fetchImages = useCallback(async () => {
    setError(null);
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    revokeImageUrls();

    try {
      const bucket = await client.getBucket(BUCKET_NAME);
      const stop = start + NUM_IMAGES[dataset] + 1;
      const newImagesWithLabels: ImageWithLabelsItem[] = [];

      for await (const record of bucket.query(
        dataset,
        BigInt(start),
        BigInt(stop)
      )) {
        if (signal.aborted) {
          throw new Error("Request aborted");
        }

        const recordBuffer = await record.read();
        const labels = record.labels;
        const recordData = new Uint8Array(recordBuffer);
        const blob = new Blob([recordData], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        newImagesWithLabels.push({ url: imageUrl, labels });
      }

      imageUrlsRef.current = newImagesWithLabels.map(img => img.url);
      setImagesWithLabels(newImagesWithLabels);
    } catch (error) {
      if ((error as Error).message !== "Request aborted") {
        const errorMessage = `Error fetching images: ${(error as Error).message}`;
        console.error(errorMessage);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [dataset, start, revokeImageUrls]);

  const debouncedFetchImages = useCallback(
    debounce(fetchImages, 100),
    [fetchImages]
  );

  useEffect(() => {
    debouncedFetchImages();

    return () => {
      debouncedFetchImages.cancel();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      revokeImageUrls();
    };
  }, [debouncedFetchImages, revokeImageUrls]);

  useEffect(() => {
    return () => {
      revokeImageUrls();
    };
  }, [revokeImageUrls]);

  return { datasets, imagesWithLabels, error, loading };
};