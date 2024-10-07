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
        recordSize: "1 MB",
        readSpeed: "+671%",
        writeSpeed: "+1604%",
      },
              {
        recordSize: "100 KB",
        readSpeed: "+603%",
        writeSpeed: "+924%",
      },
      {
        recordSize: "10 KB",
        readSpeed: "+313%",
        writeSpeed: "+297%",
      },
      {
        recordSize: "1 KB",
        readSpeed: "+28%",
        writeSpeed: "+198%",
      },
    ],
  },
    MongoDB: {
    url: "/blog/comparisons/iot/reductstore-vs-mongodb",
    title: "MongoDB with GridFS vs ReductStore",
    table: [
      {
        recordSize: "1 MB",
        readSpeed: "-30%",
        writeSpeed: "+170%",
      },
      {
        recordSize: "100 KB",
        readSpeed: "+260%",
        writeSpeed: "+420%",
      },
              {
        recordSize: "10 KB",
        readSpeed: "+1600%",
        writeSpeed: "+850%",
      },
      {
        recordSize: "1 KB",
        readSpeed: "+2300%",
        writeSpeed: "+900%",
      },
    ],
  },
    MinIO: {
    url: "/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio",
    title: "MinIO vs ReductStore",
    table: [
      {
        recordSize: "1 MB",
        readSpeed: "+291%",
        writeSpeed: "+936%",
      },
      {
        recordSize: "100 KB",
        readSpeed: "+1552%",
        writeSpeed: "+1288%",
      },
              {
        recordSize: "10 KB",
        readSpeed: "+6170%",
        writeSpeed: "+1629%",
      },
      {
        recordSize: "1 KB",
        readSpeed: "+8310%",
        writeSpeed: "+1400%",
      },
    ],
  },
};
