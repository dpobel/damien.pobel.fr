#! /bin/bash

LAST_DATE_FILE=".veille-date"
LAST_DATE=`cat $LAST_DATE_FILE`
POST_FILENAME="src/post/veille-semaine-`date +%V-%Y`.md"
BRANCH_NAME="veille_`date +%V-%Y`"

git checkout master
git pull
git checkout -b $BRANCH_NAME
./bin/generate-post-veille.js --from-date "$LAST_DATE" > "$POST_FILENAME"
date +%s > $LAST_DATE_FILE
git add $LAST_DATE_FILE
git add $POST_FILENAME
git push origin $BRANCH_NAME
git checkout master
