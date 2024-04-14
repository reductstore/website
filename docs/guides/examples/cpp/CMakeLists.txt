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