cmake_minimum_required(VERSION 3.18)

project(cpp_examples CXX)
set(CMAKE_CXX_STANDARD 20)

find_package(ZLIB)
find_package(OpenSSL)
find_package(ReductCpp 1.8.0)

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

add_executable(data_ingestion_simple.cxx
    src/data_ingestion_simple.cc
)

target_link_libraries(data_ingestion_simple.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)
