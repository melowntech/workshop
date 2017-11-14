cmake_minimum_required(VERSION 3.0)
project(vts-example CXX)
set(CMAKE_CXX_STANDARD 11)

find_package(VtsBrowser REQUIRED)
include_directories(${VtsBrowser_INCLUDE_DIR})
find_package(VtsRenderer REQUIRED)
include_directories(${VtsRenderer_INCLUDE_DIR})
find_package(SDL2 REQUIRED)
include_directories(${SDL2_INCLUDE_DIR})

add_executable(vts-example main.cpp)
target_link_libraries(vts-example ${VtsBrowser_LIBRARIES} ${VtsRenderer_LIBRARIES} SDL2)




