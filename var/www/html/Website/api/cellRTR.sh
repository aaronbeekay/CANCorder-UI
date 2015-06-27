#!/bin/bash

# cellRTR.sh: send RTR messages to trigger transmission of cell voltages from BIMs
# Aaron Bonnell-Kangas, for Buckeye Current, June 2015

# Requires cansend (from can-utils) to be installed on $PATH

cansend can0 310\#R
cansend can0 311\#R
cansend can0 312\#R
cansend can0 313\#R
cansend can0 314\#R
cansend can0 315\#R
cansend can0 316\#R
cansend can0 317\#R
cansend can0 318\#R
cansend can0 319\#R
cansend can0 31A\#R
cansend can0 31B\#R
cansend can0 31C\#R
cansend can0 31D\#R
cansend can0 31E\#R
cansend can0 31F\#R
cansend can0 320\#R
cansend can0 321\#R
cansend can0 322\#R
cansend can0 323\#R
cansend can0 324\#R
cansend can0 325\#R
cansend can0 326\#R
cansend can0 327\#R
cansend can0 328\#R
cansend can0 329\#R
cansend can0 32A\#R

