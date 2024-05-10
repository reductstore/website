export const PerformanceComparisonData = {
  TimescaleDB: [
    {
      chunkSize: "1 KB",
      operation: "Write",
      timescaleDB: 2475,
      reductStore: 1463,
      reductStorePercent: "-41%",
    },
    {
      chunkSize: "1 KB",
      operation: "Read",
      timescaleDB: 2361,
      reductStore: 1260,
      reductStorePercent: "-47%",
    },
  ],
  MongoDB: [],
  MinIO: [],
};
