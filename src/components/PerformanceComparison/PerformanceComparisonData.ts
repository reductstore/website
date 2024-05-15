export interface IPerformanceComparisonData {
  url: string;
  title: string;
  table: {
    recordSize: string;
    readSpeed: string;
    writeSpeed: string;
  }[];
}

export const PerformanceComparisonData: Record<
  string,
  IPerformanceComparisonData
> = {
  TimescaleDB: {
    url: "/blog/comparisons/iot/reductstore-vs-timescaledb",
    title: "TimescaleDB vs ReductStore",
    table: [
      {
        recordSize: "10 MB",
        readSpeed: "+850%",
        writeSpeed: "+1300%",
      },
      {
        recordSize: "1 MB",
        readSpeed: "+855%",
        writeSpeed: "+1075%",
      },
      {
        recordSize: "100 KB",
        readSpeed: "+217%",
        writeSpeed: "+205%",
      },
    ],
  },
  MongoDB: {
    url: "/blog/comparisons/iot/reductstore-vs-mongodb",
    title: "MongoDB vs ReductStore",
    table: [
      {
        recordSize: "10 MB",
        readSpeed: "+65%",
        writeSpeed: "+158%",
      },
      {
        recordSize: "1 MB",
        readSpeed: "+112%",
        writeSpeed: "+137%",
      },
      {
        recordSize: "100 KB",
        readSpeed: "+198%",
        writeSpeed: "+155%",
      },
    ],
  },
  MinIO: {
    url: "/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio",
    title: "MinIO vs ReductStore",
    table: [
      {
        recordSize: "10 MB",
        readSpeed: "+52%",
        writeSpeed: "+217%",
      },
      {
        recordSize: "1 MB",
        readSpeed: "+170%",
        writeSpeed: "+333%",
      },
      {
        recordSize: "100 KB",
        readSpeed: "+548%",
        writeSpeed: "+214%",
      },
    ],
  },
};
