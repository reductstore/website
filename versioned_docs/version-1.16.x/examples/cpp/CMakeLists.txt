cmake_minimum_required(VERSION 3.22)

project(cpp_examples CXX)
set(CMAKE_CXX_STANDARD 20)

include(FetchContent)

# Enable using fetchcontent for reductcpp dependencies
set(REDUCT_CPP_USE_FETCHCONTENT ON CACHE BOOL "" FORCE)
FetchContent_Declare(
        reductcpp
        GIT_REPOSITORY https://github.com/reductstore/reduct-cpp
        GIT_TAG main
)
FetchContent_MakeAvailable(reductcpp)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

## Buckets

add_executable(
        buckets_create.cxx
        src/buckets_create.cc
)
target_link_libraries(buckets_create.cxx reductcpp::reductcpp)

add_executable(
        buckets_browse.cxx
        src/buckets_browse.cc
)
target_link_libraries(buckets_browse.cxx reductcpp::reductcpp)

add_executable(
        buckets_change.cxx
        src/buckets_change.cc
)
target_link_libraries(buckets_change.cxx reductcpp::reductcpp)

add_executable(
        buckets_remove.cxx
        src/buckets_remove.cc
)
target_link_libraries(buckets_remove.cxx reductcpp::reductcpp)

# Data Ingestion
add_executable(data_ingestion_simple.cxx
    src/data_ingestion_simple.cc
)
target_link_libraries(data_ingestion_simple.cxx reductcpp::reductcpp)

add_executable(data_ingestion_streaming.cxx
        src/data_ingestion_streaming.cc
)
target_link_libraries(data_ingestion_streaming.cxx reductcpp::reductcpp)

add_executable(data_ingestion_annotating.cxx
        src/data_ingestion_annotating.cc
)
target_link_libraries(data_ingestion_annotating.cxx reductcpp::reductcpp)

add_executable(data_ingestion_batch.cxx
        src/data_ingestion_batch.cc
)
target_link_libraries(data_ingestion_batch.cxx reductcpp::reductcpp)

# Data Querying
add_executable(data_querying_time_range.cxx
        src/data_querying_time_range.cc
)
target_link_libraries(data_querying_time_range.cxx reductcpp::reductcpp)

add_executable(data_querying_timestamp.cxx
        src/data_querying_timestamp.cc
)
target_link_libraries(data_querying_timestamp.cxx reductcpp::reductcpp)

add_executable(data_querying_filter.cxx
        src/data_querying_filter.cc
)
target_link_libraries(data_querying_filter.cxx reductcpp::reductcpp)

# Data Replication
add_executable(data_replication_create.cxx
        src/data_replication_create.cc
)
target_link_libraries(data_replication_create.cxx reductcpp::reductcpp)

add_executable(data_replication_browse.cxx
        src/data_replication_browse.cc
)
target_link_libraries(data_replication_browse.cxx reductcpp::reductcpp)

add_executable(data_replication_remove.cxx
        src/data_replication_remove.cc
)
target_link_libraries(data_replication_remove.cxx reductcpp::reductcpp)

# Access Control
add_executable(access_control_create_token.cxx
        src/access_control_create_token.cc
)
target_link_libraries(access_control_create_token.cxx reductcpp::reductcpp)

add_executable(access_control_browser_tokens.cxx
        src/access_control_browse_tokens.cc
)
target_link_libraries(access_control_browser_tokens.cxx reductcpp::reductcpp)

add_executable(access_control_remove_token.cxx
        src/access_control_remove_token.cc
)
target_link_libraries(access_control_remove_token.cxx reductcpp::reductcpp)

# Quick Start
add_executable(quick_start.cxx
        src/quick_start.cc
)
target_link_libraries(quick_start.cxx reductcpp::reductcpp)

# Data Management
add_executable(data_management_update_labels.cxx
        src/data_management_update_labels.cc
)
target_link_libraries(data_management_update_labels.cxx reductcpp::reductcpp)

add_executable(data_management_delete_data.cxx
        src/data_management_delete_data.cc
)
target_link_libraries(data_management_delete_data.cxx reductcpp::reductcpp)

add_executable(data_management_delete_records.cxx
        src/data_management_delete_records.cc
)
target_link_libraries(data_management_delete_records.cxx reductcpp::reductcpp)

add_executable(data_management_delete_query.cxx
        src/data_management_delete_query.cc
)
target_link_libraries(data_management_delete_query.cxx reductcpp::reductcpp)
