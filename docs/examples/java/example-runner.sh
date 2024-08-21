#!/bin/bash

cd java
# get only file name from the path
filename=$(basename "$1" .java)

# run gradle task
./gradlew ${filename}