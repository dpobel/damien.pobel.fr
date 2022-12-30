#! /bin/sh

CACHE_IMAGES=`find web/images -mindepth 1 -type d`

if [ ! -z "$CACHE_IMAGES" ] ; then
    echo "Restoring $CACHE_IMAGES"
    cp -r $CACHE_IMAGES src/images/
else
    echo "No image cache to restore"
fi
