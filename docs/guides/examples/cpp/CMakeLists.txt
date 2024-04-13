cmake_minimum_required(VERSION 3.18)

project(examples, CXX)
set(CMAKE_CXX_STANDARD 20)

find_package(ZLIB)
find_package(OpenSSL)
find_package(ReductCpp 1.8.0)

add_executable(
        create_bucket.cxx
        src/create_bucket.cc
)

target_link_libraries(create_bucket.cxx ${REDUCT_CPP_LIBRARIES} ${ZLIB_LIBRARIES} OpenSSL::SSL OpenSSL::Crypto)