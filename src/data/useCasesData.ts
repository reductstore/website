import type { ComponentType, SVGProps } from "react";
import type { IconType } from "react-icons";
import {
  LuActivity,
  LuBot,
  LuBrain,
  LuBrainCircuit,
  LuCamera,
  LuCloud,
  LuFactory,
  LuLayers,
  LuPlane,
  LuRadioTower,
  LuRoute,
  LuScanSearch,
  LuVideo,
} from "react-icons/lu";
import IndustrialEdgeDiagram from "@site/static/img/use-cases/industrial-edge.svg";
import MobileRobotsDiagram from "@site/static/img/use-cases/mobile-robots.svg";
import RosDiagram from "@site/static/img/use-cases/ros.svg";
import PhysicalAiDiagram from "@site/static/img/use-cases/physical-ai.svg";
import DronesDiagram from "@site/static/img/use-cases/drones.svg";
import CloudDiagram from "@site/static/img/use-cases/cloud.svg";
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
  icon: IconType;
  data: string;
  featured?: boolean;
  diagram?: ComponentType<SVGProps<SVGSVGElement>>;
}

const useCases: UseCase[] = [
  {
    title: "Industrial Edge",
    description:
      "Store PLC, DAQ, and vibration data on the shop floor and replicate what matters to central storage or the cloud.",
    link: "/blog/daq-manufacture-system",
    icon: LuFactory,
    data: "PLCs, vibration, DAQ",
    featured: true,
    diagram: IndustrialEdgeDiagram,
  },
  {
    title: "Mobile Robots",
    description:
      "Record LiDAR scans, camera frames, and telemetry on every robot and move the right data off a fleet of AMRs.",
    link: "/blog/amr-fleet-data-infrastructure",
    icon: LuRoute,
    data: "LiDAR scans, cameras",
    featured: true,
    diagram: MobileRobotsDiagram,
  },
  {
    title: "ROS Robots",
    description:
      "Record ROS 1 and ROS 2 topics with ReductBridge, query them by time and labels, and export MCAP.",
    link: "/docs/ros",
    icon: LuBot,
    data: "ROS 1, ROS 2, MCAP",
    featured: true,
    diagram: RosDiagram,
  },
  {
    title: "Physical AI",
    description:
      "Keep the raw sensor episodes behind your models, labeled and time-indexed, ready for training and replay.",
    link: "/blog/database-for-robotics",
    icon: LuBrainCircuit,
    data: "episodes for training",
    featured: true,
    diagram: PhysicalAiDiagram,
  },
  {
    title: "Drones and Defense",
    description:
      "Capture everything on the drone in air-gapped environments and sync it when a trusted link is available.",
    link: "/blog/air-gapped-drone-data",
    icon: LuPlane,
    data: "air-gapped, sync later",
    featured: true,
    diagram: DronesDiagram,
  },
  {
    title: "Cloud Backbone",
    description:
      "Replicate from the edge to ReductStore in the cloud on S3 or Azure Blob, and query everything with SQL.",
    link: "/solutions/cloud",
    icon: LuCloud,
    data: "replication, S3, SQL",
    featured: true,
    diagram: CloudDiagram,
  },
  {
    title: "Computer Vision",
    description:
      "Explore how to implement computer vision applications in industrial settings with practical examples.",
    link: "/blog/computer-vision-applications",
    icon: LuCamera,
    data: "frames, detections",
    diagram: ComputerVisionDiagram,
  },
  {
    title: "H.264 Video Storage",
    description:
      "Store an H.264 camera stream as time-indexed records and export playable MP4 episodes with ReductVideo.",
    link: "/blog/store-h264-camera-stream-export-mp4",
    icon: LuVideo,
    data: "camera streams, MP4",
    diagram: H264VideoDiagram,
  },
  {
    title: "Vibration Data",
    description:
      "Strategies for reducing and storing vibration sensor data effectively.",
    link: "/blog/how-to-store-vibration-sensor-data",
    icon: LuActivity,
    data: "waveforms, FIFO",
    diagram: VibrationDiagram,
  },
  {
    title: "MQTT Data Storage",
    description:
      "Best practices for storing and managing MQTT data in IIoT applications.",
    link: "/blog/advice/database/mqtt-data-storage",
    icon: LuRadioTower,
    data: "topics, IIoT",
    diagram: MqttDiagram,
  },
  {
    title: "Kafka Data Sink",
    description:
      "Learn how to set up a data sink using Apache Kafka for data streaming applications.",
    link: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
    icon: LuLayers,
    data: "partitions, sink",
    diagram: KafkaDiagram,
  },
  {
    title: "Anomaly Detection",
    description:
      "Implement open-source AI anomaly detection at the edge with practical examples.",
    link: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
    icon: LuScanSearch,
    data: "images, scores",
    diagram: AnomalyDetectionDiagram,
  },
  {
    title: "PyTorch Data Streaming",
    description:
      "Techniques for streaming database data into PyTorch for machine learning applications.",
    link: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
    icon: LuBrain,
    data: "datasets, DataLoader",
    diagram: PytorchDiagram,
  },
];

export default useCases;
