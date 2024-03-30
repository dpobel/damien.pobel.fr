#! /bin/sh

[ ! -d "$SITE"] && echo "SITE environment variable is incorrect ('$SITE')" && exit 1

# ⚠️ ENCRYPT_KEY and PERSONAL_TOKEN are defined in both Actions secrets **and** Dependabot secrets
# so when updating it don't forget to set both.
echo $ENCRYPT_KEY|gpg --batch --yes --passphrase-fd 0 --output ssh/id_ecdsa --decrypt ssh/id_ecdsa.enc
chmod 600 ssh/id_ecdsa

SSH_CMD="ssh -i ssh/id_ecdsa -o 'StrictHostKeyChecking no'"
if [ "$GITHUB_EVENT_NAME" != "pull_request" ] ; then
    echo "## Pushing main site"
    rsync -avcz --delete -e "$SSH_CMD" "$SITE/web/" dp@damien.pobel.fr:prod/
    # trigger refresh of github profile README
    curl -H "Authorization: token $PERSONAL_TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST -d "{\"ref\": \"main\"}" "https://api.github.com/repos/dpobel/dpobel/actions/workflows/main.yml/dispatches"
    # trigger refresh of my github page
    curl -H "Authorization: token $PERSONAL_TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST -d "{\"ref\": \"main\"}" "https://api.github.com/repos/dpobel/dpobel.github.io/actions/workflows/main.yml/dispatches"
else
    PR_ID=`echo $GITHUB_REF_NAME|cut -d '/' -f 1`
    echo "## Pushing to ${PR_ID}.damien.pobel.fr"
    rsync -avcz --delete -e "$SSH_CMD" "$SITE/web/" dp@damien.pobel.fr:testing/${PR_ID}.damien.pobel.fr
    ./bin/compare.sh "https://${PR_ID}.damien.pobel.fr" > comparison.txt
    jq -n --rawfile BODY comparison.txt '{body: $BODY}' > payload.json
    curl -H "Authorization: token $PERSONAL_TOKEN" -X POST -d @payload.json https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${PR_ID}/comments
fi
