#! /bin/sh

[ ! -d "$SITE" ] && echo "SITE environment variable is incorrect ('$SITE')" && exit 1

CACHE_IMAGES=`find $SITE/web/images -mindepth 1 -type d`

if [ ! -z "$CACHE_IMAGES" ] ; then
    echo "Restoring $CACHE_IMAGES"
    cp -r $CACHE_IMAGES $SITE/src/images/
else
    echo "No image cache to restore"
fi
