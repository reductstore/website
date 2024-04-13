cmake_minimum_required(VERSION 3.18)

project(examples, CXX)
set(CMAKE_CXX_STANDARD 20)

find_package(ZLIB)
find_package(OpenSSL)
find_package(ReductCpp 1.8.0)

add_executable(
        buckets_crate.cxx
        src/buckets_crate.cc
)

target_link_libraries(buckets_crate.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)