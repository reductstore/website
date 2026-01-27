# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION ${CMAKE_VERSION}) # this file comes with cmake

# If CMAKE_DISABLE_SOURCE_CHANGES is set to true and the source directory is an
# existing directory in our source tree, calling file(MAKE_DIRECTORY) on it
# would cause a fatal error, even though it would be a no-op.
if(NOT EXISTS "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-src")
  file(MAKE_DIRECTORY "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-src")
endif()
file(MAKE_DIRECTORY
  "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-build"
  "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix"
  "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix/tmp"
  "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix/src/reductcpp-populate-stamp"
  "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix/src"
  "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix/src/reductcpp-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix/src/reductcpp-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/runner/work/website/website/docs/examples/cpp/build/_deps/reductcpp-subbuild/reductcpp-populate-prefix/src/reductcpp-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
