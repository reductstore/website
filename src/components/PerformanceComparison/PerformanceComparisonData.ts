export const PerformanceComparisonData = {
  TimescaleDB: [
    {
      chunkSize: "10 MB",
      operation: "Write",
      reductStorePercent: "+1300%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+850%",
    },
    {
      chunkSize: "1 MB",
      operation: "Write",
      reductStorePercent: "+1075%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+855%",
    },
    {
      chunkSize: "100 KB",
      operation: "Write",
      reductStorePercent: "+205%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+217%",
    },
  ],
  MongoDB: [
    {
      chunkSize: "10 MB",
      operation: "Write",
      reductStorePercent: "+158%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+65%",
    },
    {
      chunkSize: "1 MB",
      operation: "Write",
      reductStorePercent: "+137%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+112%",
    },
    {
      chunkSize: "100 KB",
      operation: "Write",
      reductStorePercent: "+155%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+198%",
    },
  ],
  MinIO: [
    {
      chunkSize: "10 MB",
      operation: "Write",
      reductStorePercent: "+217%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+52%",
    },
    {
      chunkSize: "1 MB",
      operation: "Write",
      reductStorePercent: "+333%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+170%",
    },
    {
      chunkSize: "100 KB",
      operation: "Write",
      reductStorePercent: "+214%",
    },
    {
      chunkSize: "",
      operation: "Read",
      reductStorePercent: "+548%",
    },
  ],
};
