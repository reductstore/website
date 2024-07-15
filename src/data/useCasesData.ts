export interface UseCase {
  title: string;
  description: string;
  link: string;
  image: string;
}

const useCases: UseCase[] = [
  {
    title: "The Fastest Time Series Object Store for Edge AI",
    description:
      "Learn how to store and manage data for edge computing and AI applications.",
    link: "/use-cases/ai-workflows",
    image:
      require("@site/static/img/use-cases/ai-workflows/ai-labels-and-metadata-for-every-record.webp")
        .default,
  },
  {
    title: "High Frequency Vibration Data Storage",
    description: "Learn how to store and manage high-frequency vibration data.",
    link: "/use-cases/vibration-sensors",
    image:
      require("@site/static/img/use-cases/vibration-sensors/reduction-strategy.webp")
        .default,
  },
  {
    title: "Computer Vision Applications",
    description: "Learn how to store data for computer vision applications.",
    link: "/blog/tutorials/computer-vision/3-ways-stora-data-for-computer-vision-applications",
    image: require("@site/static/img/use-cases/computer-vision.webp").default,
  },
  {
    title: "MQTT Data Storage",
    description: "Learn how to store and manage MQTT data.",
    link: "/blog/advice/database/mqtt-data-storage",
    image: require("@site/static/img/use-cases/mqtt.webp").default,
  },
  {
    title: "Robot Operating System (ROS)",
    description:
      "Learn how to store and manage image data for ROS-based computer vision applications.",
    link: "/blog/tutorials/ros/optimal-image-storage-solutions-for-ros-based-computer-vision",
    image: require("@site/static/img/use-cases/robot.webp").default,
  },
  {
    title: "Kafka Data Sink",
    description: "Learn how to implement a Kafka data sink.",
    link: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
    image: require("@site/static/img/use-cases/kafka.webp").default,
  },
  {
    title: "Anomaly Detection",
    description:
      "Learn how to implement an open-source AI anomaly detection system.",
    link: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
    image: require("@site/static/img/use-cases/anomaly-detection.webp").default,
  },
  {
    title: "Pytorch Data Streaming",
    description: "Learn how to implement database data streaming with Pytorch.",
    link: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
    image: require("@site/static/img/use-cases/pytorch.webp").default,
  },
];

export default useCases;
