#!/bin/sh
# push_www: Copy files from the local machine to the BeagleBone.

CURRENTDIR=`pwd`
BASEDIR=$(dirname $0)

cd "$BASEDIR"
cd ../../../var/www/

echo 'Copying website files to CANCorder... '
rsync -rz html/Website/ cancorder@192.168.4.1:/var/www/html/Website

cd "$CURRENTDIR"
