cmake_minimum_required(VERSION 3.18)

project(cpp_examples CXX)
set(CMAKE_CXX_STANDARD 20)

find_package(ZLIB)
find_package(OpenSSL)
find_package(ReductCpp 1.8.0)

## Buckets

add_executable(
        buckets_create.cxx
        src/buckets_create.cc
)
target_link_libraries(buckets_create.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(
        buckets_browse.cxx
        src/buckets_browse.cc
)
target_link_libraries(buckets_browse.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(
        buckets_change.cxx
        src/buckets_change.cc
)
target_link_libraries(buckets_change.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(
        buckets_remove.cxx
        src/buckets_remove.cc
)
target_link_libraries(buckets_remove.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

# Data Ingestion
add_executable(data_ingestion_simple.cxx
    src/data_ingestion_simple.cc
)
target_link_libraries(data_ingestion_simple.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_ingestion_streaming.cxx
        src/data_ingestion_streaming.cc
)
target_link_libraries(data_ingestion_streaming.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_ingestion_annotating.cxx
        src/data_ingestion_annotating.cc
)
target_link_libraries(data_ingestion_annotating.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_ingestion_batch.cxx
        src/data_ingestion_batch.cc
)
target_link_libraries(data_ingestion_batch.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

# Data Querying
add_executable(data_querying_time_range.cxx
        src/data_querying_time_range.cc
)
target_link_libraries(data_querying_time_range.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_querying_timestamp.cxx
        src/data_querying_timestamp.cc
)
target_link_libraries(data_querying_timestamp.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_querying_filter.cxx
        src/data_querying_filter.cc
)
target_link_libraries(data_querying_filter.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

# Data Replication
add_executable(data_replication_create.cxx
        src/data_replication_create.cc
)
target_link_libraries(data_replication_create.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_replication_browse.cxx
        src/data_replication_browse.cc
)
target_link_libraries(data_replication_browse.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(data_replication_remove.cxx
        src/data_replication_remove.cc
)
target_link_libraries(data_replication_remove.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

# Access Control
add_executable(access_control_create_token.cxx
        src/access_control_create_token.cc
)
target_link_libraries(access_control_create_token.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(access_control_browser_tokens.cxx
        src/access_control_browse_tokens.cc
)
target_link_libraries(access_control_browser_tokens.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

add_executable(access_control_remove_token.cxx
        src/access_control_remove_token.cc
)
target_link_libraries(access_control_remove_token.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

# Quick Start
add_executable(quick_start.cxx
        src/quick_start.cc
)
target_link_libraries(quick_start.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)

# Data Management
add_executable(data_management_update_labels.cxx
        src/data_management_update_labels.cc
)
target_link_libraries(data_management_update_labels.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)