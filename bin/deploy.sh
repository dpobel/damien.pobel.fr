#! /bin/sh

SSH_CMD="ssh -i ssh/id_dsa -o 'StrictHostKeyChecking no'"

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
    echo "## Pushing main site"
    rsync -avcz --delete -e "$SSH_CMD" web/ dp@damien.pobel.fr:~/web/
    # trigger refresh of github profile README
    curl -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST -d "{\"ref\": \"main\"}" "https://api.github.com/repos/dpobel/dpobel/actions/workflows/main.yml/dispatches"
    # trigger refresh of my github page
    curl -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST -d "{\"ref\": \"main\"}" "https://api.github.com/repos/dpobel/dpobel.github.io/actions/workflows/main.yml/dispatches"
else
    echo "## Pushing to ${TRAVIS_PULL_REQUEST}.damien.pobel.fr"
    rsync -avcz --delete -e "$SSH_CMD" web/ dp@damien.pobel.fr:~/testing/${TRAVIS_PULL_REQUEST}.damien.pobel.fr
    COMPARE=`./bin/compare.sh`
    COMMENT=`echo "Test it at https://${TRAVIS_PULL_REQUEST}.damien.pobel.fr/\n\n---\n\n$COMPARE"`
    PAYLOAD=`jq -n --arg BODY "$COMMENT" '{body: $BODY}'`
    curl -H "Authorization: token $GITHUB_TOKEN" -X POST -d "$PAYLOAD" https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments
fi
