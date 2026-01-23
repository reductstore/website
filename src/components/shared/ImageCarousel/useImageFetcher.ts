import { useState, useEffect, useCallback, useRef } from "react";
import { Client } from "reduct-js";
import debounce from "lodash/debounce";
import {
  DatasetInfo,
  ImageWithLabelsItem,
  PlayServerContextType,
} from "./ImageCarousel.types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const useImageFetcher = (
  dataset: string,
  start: number,
  num_images: number,
  allowed_datasets: string[],
) => {
  const { siteConfig } = useDocusaurusContext();
  const { themeConfig } = siteConfig;
  const playServer = themeConfig.playServer as PlayServerContextType;

  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [imagesWithLabels, setImagesWithLabels] = useState<
    ImageWithLabelsItem[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchVersionRef = useRef(0);
  const imageUrlsRef = useRef<string[]>([]);

  const clientRef = useRef<Client | null>(null);
  if (!clientRef.current) {
    clientRef.current = new Client(playServer.url, {
      apiToken: playServer.token,
    });
  }
  const client = clientRef.current;

  const fetchBucketInfo = useCallback(async () => {
    try {
      const bucket = await client.getBucket(playServer.bucket);
      const entries = await bucket.getEntryList();
      const availableDatasets = entries.filter(
        (entry) =>
          entry.recordCount > 0 && allowed_datasets.includes(entry.name),
      );

      setDatasets(
        availableDatasets.map(({ name, recordCount }) => ({
          name,
          recordCount: Number(recordCount),
        })),
      );
    } catch (error) {
      const errorMessage = `Error fetching bucket info: ${
        (error as Error).message
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
    fetchVersionRef.current += 1;
    const thisVersion = fetchVersionRef.current;

    setError(null);
    setLoading(true);

    const previousUrls = [...imageUrlsRef.current];
    const localUrls: string[] = [];

    try {
      const bucket = await client.getBucket(playServer.bucket);
      const stop = start + num_images;
      const newImagesWithLabels: ImageWithLabelsItem[] = [];

      for await (const record of bucket.query(
        dataset,
        BigInt(start),
        BigInt(stop),
      )) {
        if (fetchVersionRef.current !== thisVersion) {
          localUrls.forEach((url) => URL.revokeObjectURL(url));
          return;
        }

        const recordBuffer = await record.read();
        const labels = record.labels;
        const recordData = new Uint8Array(recordBuffer);
        const blob = new Blob([recordData], {
          type: record.contentType || "image/jpeg",
        });
        const imageUrl = URL.createObjectURL(blob);
        localUrls.push(imageUrl);
        newImagesWithLabels.push({ url: imageUrl, labels });
      }

      if (fetchVersionRef.current !== thisVersion) {
        localUrls.forEach((url) => URL.revokeObjectURL(url));
        return;
      }

      imageUrlsRef.current = localUrls;
      setImagesWithLabels(newImagesWithLabels);

      previousUrls.forEach((url) => URL.revokeObjectURL(url));
    } catch (error) {
      localUrls.forEach((url) => URL.revokeObjectURL(url));
      if (fetchVersionRef.current === thisVersion) {
        const errorMessage = `Error fetching images: ${(error as Error).message}`;
        console.error(errorMessage);
        setError(errorMessage);
      }
    } finally {
      if (fetchVersionRef.current === thisVersion) {
        setLoading(false);
      }
    }
  }, [dataset, start, num_images]);

  const debouncedFetchImages = useCallback(debounce(fetchImages, 100), [
    fetchImages,
  ]);

  useEffect(() => {
    debouncedFetchImages();

    return () => {
      debouncedFetchImages.cancel();
    };
  }, [debouncedFetchImages]);

  useEffect(() => {
    return () => {
      revokeImageUrls();
    };
  }, [revokeImageUrls]);

  return { datasets, imagesWithLabels, error, loading };
};
