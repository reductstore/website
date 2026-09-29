import type { ComponentType, SVGProps } from "react";
import RoboticsDiagram from "@site/static/img/use-cases/robotics.svg";
import DaqDiagram from "@site/static/img/use-cases/daq.svg";
import ComputerVisionDiagram from "@site/static/img/use-cases/computer-vision.svg";
import H264VideoDiagram from "@site/static/img/use-cases/h264-video.svg";
import VibrationDiagram from "@site/static/img/use-cases/vibration.svg";
import MqttDiagram from "@site/static/img/use-cases/mqtt.svg";
import KafkaDiagram from "@site/static/img/use-cases/kafka.svg";
import AnomalyDetectionDiagram from "@site/static/img/use-cases/anomaly-detection.svg";
import PytorchDiagram from "@site/static/img/use-cases/pytorch.svg";

export interface UseCase {
  title: string;
  description: string;
  link: string;
  diagram?: ComponentType<SVGProps<SVGSVGElement>>;
}

const useCases: UseCase[] = [
  {
    title: "Robotics Data",
    description:
      "A database purpose built for robotics data pipelines (AMRs, drones, ROS, physical-AI systems) with practical examples.",
    link: "/blog/database-for-robotics",
    diagram: RoboticsDiagram,
  },
  {
    title: "Data Acquisition for Manufacturing",
    description:
      "Learn how to store and manage data for edge computing and AI application in manufacturing.",
    link: "/blog/daq-manufacture-system",
    diagram: DaqDiagram,
  },
  {
    title: "Computer Vision",
    description:
      "Explore how to implement computer vision applications in industrial settings with practical examples.",
    link: "/blog/computer-vision-applications",
    diagram: ComputerVisionDiagram,
  },
  {
    title: "H.264 Video Storage",
    description:
      "Store an H.264 camera stream as time-indexed records and export playable MP4 episodes with ReductVideo.",
    link: "/blog/store-h264-camera-stream-export-mp4",
    diagram: H264VideoDiagram,
  },
  {
    title: "Vibration Data",
    description:
      "Strategies for reducing and storing vibration sensor data effectively.",
    link: "/blog/how-to-store-vibration-sensor-data",
    diagram: VibrationDiagram,
  },
  {
    title: "MQTT Data Storage",
    description:
      "Best practices for storing and managing MQTT data in IIoT applications.",
    link: "/blog/advice/database/mqtt-data-storage",
    diagram: MqttDiagram,
  },
  {
    title: "Kafka Data Sink",
    description:
      "Learn how to set up a data sink using Apache Kafka for data streaming applications.",
    link: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
    diagram: KafkaDiagram,
  },
  {
    title: "Anomaly Detection",
    description:
      "Implement open-source AI anomaly detection at the edge with practical examples.",
    link: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
    diagram: AnomalyDetectionDiagram,
  },
  {
    title: "Pytorch Data Streaming",
    description:
      "Techniques for streaming database data into PyTorch for machine learning applications.",
    link: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
    diagram: PytorchDiagram,
  },
];

export default useCases;
