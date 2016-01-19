#! /bin/sh

SSH_CMD="ssh -i ssh/id_dsa -o 'StrictHostKeyChecking no'"

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
    rsync -avcz --delete -e "$SSH_CMD" web/ dp@damien.pobel.fr:~/web/
else
    rsync -avcz --delete -e "$SSH_CMD" web/ dp@damien.pobel.fr:~/testing/${TRAVIS_PULL_REQUEST}.damien.pobel.fr
fi
