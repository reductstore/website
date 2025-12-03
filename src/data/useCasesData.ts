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
    image: require("@site/static/img/use-cases/robot.webp").default,
  },
  {
    title: "Data Acquisition for Manufacturing",
    description:
      "Learn how to store and manage data for edge computing and AI application in manufacturing.",
    link: "/blog/daq-manufacture-system",
    image:
      require("@site/static/img/use-cases/ai-workflows/ai-labels-and-metadata-for-every-record.webp")
        .default,
  },
  {
    title: "Computer Vision",
    description:
      "Explore how to implement computer vision applications in industrial settings with practical examples.",
    link: "/blog/computer-vision-applications",
    image: require("@site/static/img/use-cases/computer-vision.webp").default,
  },
  {
    title: "Vibration Data",
    description:
      "Strategies for reducing and storing vibration sensor data effectively.",
    link: "/blog/how-to-store-vibration-sensor-data",
    image:
      require("@site/static/img/use-cases/vibration-sensors/reduction-strategy.webp")
        .default,
  },
  {
    title: "MQTT Data Storage",
    description:
      "Best practices for storing and managing MQTT data in IIoT applications.",
    link: "/blog/advice/database/mqtt-data-storage",
    image: require("@site/static/img/use-cases/mqtt.webp").default,
  },
  {
    title: "Kafka Data Sink",
    description:
      "Learn how to set up a data sink using Apache Kafka for data streaming applications.",
    link: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
    image: require("@site/static/img/use-cases/kafka.webp").default,
  },
  {
    title: "Anomaly Detection",
    description:
      "Implement open-source AI anomaly detection at the edge with practical examples.",
    link: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
    image: require("@site/static/img/use-cases/anomaly-detection.webp").default,
  },
  {
    title: "Pytorch Data Streaming",
    description:
      "Techniques for streaming database data into PyTorch for machine learning applications.",
    link: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
    image: require("@site/static/img/use-cases/pytorch.webp").default,
  },
];

export default useCases;
