export interface UseCase {
  title: string;
  description: string;
  link: string;
  image: string;
}

const useCases: UseCase[] = [
  {
    title: "Robotics Data",
    description:
      "A database purpose built for robotics data pipelines (AMRs, drones, ROS, physical-AI systems) with practical examples.",
    link: "/blog/database-for-robotics",
    image: require("@site/blog/2025-10-22-database-for-robotics/img/intro-image.png")
      .default,
  },
  {
    title: "Data Acquisition for Manufacturing",
    description:
      "Learn how to store and manage data for edge computing and AI application in manufacturing.",
    link: "/blog/daq-manufacture-system",
    image: require("@site/blog/2025-03-17-daq-manufacture-system/img/daq.png")
      .default,
  },
  {
    title: "Computer Vision",
    description:
      "Explore how to implement computer vision applications in industrial settings with practical examples.",
    link: "/blog/computer-vision-applications",
    image:
      require("@site/blog/2025-07-08-3-ways-store-data-for-computer-vision-applications/img/reductStore-usage.png")
        .default,
  },
  {
    title: "Vibration Data",
    description:
      "Strategies for reducing and storing vibration sensor data effectively.",
    link: "/blog/how-to-store-vibration-sensor-data",
    image:
      require("@site/blog/2024-12-05-data-flow-with-vibration-data/img/vibration_data_flow_intro.webp")
        .default,
  },
  {
    title: "MQTT Data Storage",
    description:
      "Best practices for storing and managing MQTT data in IIoT applications.",
    link: "/blog/advice/database/mqtt-data-storage",
    image: require("@site/blog/2025-05-08-mqtt-data-storage/img/social-card.jpg")
      .default,
  },
  {
    title: "Kafka Data Sink",
    description:
      "Learn how to set up a data sink using Apache Kafka for data streaming applications.",
    link: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
    image:
      require("@site/blog/2024-02-04-kafka-tutorial-data-sink/img/kafka-reductstore.webp")
        .default,
  },
  {
    title: "Anomaly Detection",
    description:
      "Implement open-source AI anomaly detection at the edge with practical examples.",
    link: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
    image:
      require("@site/blog/2023-10-15-Implementing-open-source-ai-anomaly-detection/img/randy-fath-chess.webp")
        .default,
  },
  {
    title: "Pytorch Data Streaming",
    description:
      "Techniques for streaming database data into PyTorch for machine learning applications.",
    link: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
    image:
      require("@site/blog/2024-01-13-implement-data-streaming-pytorch/img/pytorch-iterabledataset.webp")
        .default,
  },
];

export default useCases;
