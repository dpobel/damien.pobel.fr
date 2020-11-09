#! /bin/sh

SSH_CMD="ssh -i ssh/id_dsa -o 'StrictHostKeyChecking no'"

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
    echo "## Pushing main site"
    rsync -avcz --delete -e "$SSH_CMD" web/ dp@damien.pobel.fr:~/web/
else
    echo "## Pushing to ${TRAVIS_PULL_REQUEST}.damien.pobel.fr"
    rsync -avcz --delete -e "$SSH_CMD" web/ dp@damien.pobel.fr:~/testing/${TRAVIS_PULL_REQUEST}.damien.pobel.fr
    COMMENT="Test it at https://${TRAVIS_PULL_REQUEST}.damien.pobel.fr/"
    curl -H "Authorization: token $GITHUB_TOKEN" -X POST -d "{\"body\": \"$COMMENT\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi
