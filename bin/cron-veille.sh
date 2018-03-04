#! /bin/bash

LAST_DATE_FILE=".veille-date"
POST_FILENAME="src/post/veille-semaine-`date +%V-%Y`.md"
BRANCH_NAME="veille_`date +%V-%Y`"
COMMIT_MSG="Veille `date +%V-%Y`"

git checkout master
git pull
git checkout -b $BRANCH_NAME
node ./bin/generate-post-veille.js --from-date `cat $LAST_DATE_FILE` > "$POST_FILENAME"
date +%s > $LAST_DATE_FILE
git add $LAST_DATE_FILE
git add $POST_FILENAME
git commit -m "$COMMIT_MSG"
git push origin $BRANCH_NAME
git checkout master

curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST \
    -d "{\"title\": \"$COMMIT_MSG\", \"head\": \"$BRANCH_NAME\", \"base\": \"master\", \"body\": \"ping @dpobel\"}" \
    "https://api.github.com/repos/dpobel/damien.pobel.fr/pulls"
