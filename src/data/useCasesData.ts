export interface UseCase {
  title: string;
  description: string;
  link: string;
}

const useCases: UseCase[] = [
  {
    title: "Robotics Data",
    description:
      "A database purpose built for robotics data pipelines (AMRs, drones, ROS, physical-AI systems) with practical examples.",
    link: "/blog/database-for-robotics",
  },
  {
    title: "Data Acquisition for Manufacturing",
    description:
      "Learn how to store and manage data for edge computing and AI application in manufacturing.",
    link: "/blog/daq-manufacture-system",
  },
  {
    title: "Computer Vision",
    description:
      "Explore how to implement computer vision applications in industrial settings with practical examples.",
    link: "/blog/computer-vision-applications",
  },
  {
    title: "Vibration Data",
    description:
      "Strategies for reducing and storing vibration sensor data effectively.",
    link: "/blog/how-to-store-vibration-sensor-data",
  },
  {
    title: "MQTT Data Storage",
    description:
      "Best practices for storing and managing MQTT data in IIoT applications.",
    link: "/blog/advice/database/mqtt-data-storage",
  },
  {
    title: "Kafka Data Sink",
    description:
      "Learn how to set up a data sink using Apache Kafka for data streaming applications.",
    link: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
  },
  {
    title: "Anomaly Detection",
    description:
      "Implement open-source AI anomaly detection at the edge with practical examples.",
    link: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
  },
  {
    title: "Pytorch Data Streaming",
    description:
      "Techniques for streaming database data into PyTorch for machine learning applications.",
    link: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
  },
];

export default useCases;
