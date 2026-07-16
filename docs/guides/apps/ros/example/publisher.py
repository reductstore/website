import math

import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image, Imu, NavSatFix, NavSatStatus


class DemoRosPublisher(Node):
    def __init__(self):
        super().__init__('demo_ros_publisher')
        self.camera_pub = self.create_publisher(Image, '/camera/image_raw', 10)
        self.gps_pub = self.create_publisher(NavSatFix, '/gps/fix', 10)
        self.imu_pub = self.create_publisher(Imu, '/imu/data', 10)
        self.seq = 0
        self.create_timer(0.5, self.publish_messages)

    def publish_messages(self):
        stamp = self.get_clock().now().to_msg()
        self.camera_pub.publish(self.make_image(stamp))
        self.gps_pub.publish(self.make_gps(stamp))
        self.imu_pub.publish(self.make_imu(stamp))
        self.seq += 1

        if self.seq % 10 == 0:
            self.get_logger().info('Published demo camera, GPS, and IMU messages')

    def make_image(self, stamp):
        width = 64
        height = 48
        color = [self.seq % 256, 80, 180]

        msg = Image()
        msg.header.stamp = stamp
        msg.header.frame_id = 'camera'
        msg.height = height
        msg.width = width
        msg.encoding = 'rgb8'
        msg.is_bigendian = 0
        msg.step = width * 3
        msg.data = bytes(color * width * height)
        return msg

    def make_gps(self, stamp):
        msg = NavSatFix()
        msg.header.stamp = stamp
        msg.header.frame_id = 'gps'
        msg.status.status = NavSatStatus.STATUS_FIX
        msg.status.service = NavSatStatus.SERVICE_GPS
        msg.latitude = 52.520008 + math.sin(self.seq / 20.0) * 0.0001
        msg.longitude = 13.404954 + math.cos(self.seq / 20.0) * 0.0001
        msg.altitude = 35.0 + math.sin(self.seq / 10.0)
        msg.position_covariance_type = NavSatFix.COVARIANCE_TYPE_UNKNOWN
        return msg

    def make_imu(self, stamp):
        msg = Imu()
        msg.header.stamp = stamp
        msg.header.frame_id = 'imu'
        msg.orientation.w = 1.0
        msg.angular_velocity.z = math.sin(self.seq / 10.0) * 0.1
        msg.linear_acceleration.x = math.sin(self.seq / 15.0) * 0.2
        msg.linear_acceleration.z = 9.81
        return msg


def main():
    rclpy.init()
    node = DemoRosPublisher()

    try:
        rclpy.spin(node)
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
