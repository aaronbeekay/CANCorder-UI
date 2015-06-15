#!/bin/sh
# fake_can_data.sh - simulate CAN traffic to test applications that
# 	read from the CAN cache

# Test if we're running on the right system
if ! grep 'ARM' /proc/cpuinfo; then
	echo "Please run this script on the BeagleBone." 1>&2
	exit 1
fi

# Set up Socket CAN
sudo modprobe can
sudo modprobe can_raw
sudo modprobe vcan
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0

# Generate data
echo 'Spitting out CAN data on vcan0...'
/home/cancorder/can-utils/cangen vcan0 \
	-I i	\	# increment through all CAN IDs
	-L 8	\	# use DLC 8
	-g 1		# send every 1  ms
