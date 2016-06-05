#!/bin/bash

# cellRTR.sh: send RTR messages to trigger transmission of cell voltages from BIMs
# Aaron Bonnell-Kangas, for Buckeye Current, June 2015

# Requires cansend (from can-utils) to be installed on $PATH

cangen can0 -R -I 310 -L 8 -n 1
cangen can0 -R -I 311 -L 8 -n 1
cangen can0 -R -I 312 -L 8 -n 1
cangen can0 -R -I 313 -L 8 -n 1
cangen can0 -R -I 314 -L 8 -n 1
cangen can0 -R -I 315 -L 8 -n 1
cangen can0 -R -I 316 -L 8 -n 1
cangen can0 -R -I 317 -L 8 -n 1
cangen can0 -R -I 318 -L 8 -n 1
cangen can0 -R -I 319 -L 8 -n 1
cangen can0 -R -I 31A -L 8 -n 1
cangen can0 -R -I 31B -L 8 -n 1
cangen can0 -R -I 31C -L 8 -n 1
cangen can0 -R -I 31D -L 8 -n 1
cangen can0 -R -I 31E -L 8 -n 1
cangen can0 -R -I 31F -L 8 -n 1
cangen can0 -R -I 320 -L 8 -n 1
cangen can0 -R -I 321 -L 8 -n 1
cangen can0 -R -I 322 -L 8 -n 1
cangen can0 -R -I 323 -L 8 -n 1
cangen can0 -R -I 324 -L 8 -n 1
cangen can0 -R -I 325 -L 8 -n 1
cangen can0 -R -I 326 -L 8 -n 1
cangen can0 -R -I 327 -L 8 -n 1
cangen can0 -R -I 328 -L 8 -n 1
cangen can0 -R -I 329 -L 8 -n 1
cangen can0 -R -I 32A -L 8 -n 1