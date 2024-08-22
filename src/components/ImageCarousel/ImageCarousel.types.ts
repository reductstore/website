import { LabelMap } from "reduct-js/lib/cjs/Record";

export interface ImageWithLabelsItem {
  url: string;
  labels: LabelMap;
}

export interface ImageWithLabelsProps {
  image: ImageWithLabelsItem;
  showLabels: boolean;
  dataset: string;
}

export interface DatasetInfo {
  name: string;
  recordCount: number;
}

export interface PlayServerContextType {
  url: string;
  token: string;
  bucket: string;
}
