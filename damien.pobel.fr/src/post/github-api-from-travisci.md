---
title: Comment a Github pull request from Travis CI
tags:  travis ci, github, shell, rest
published: 2017-11-04 14:51
lang: en
photos:
    - images/hubot.jpg
---

<figure class="object-left bordered">
    <img loading="lazy" src="/images/330x/hubot.jpg" alt="Hubot">
</figure>

[Travis CI is a continuous integration
platform](https://docs.travis-ci.com/user/for-beginners/) which means it is used
to run various processes after code changes like unit tests, code style checks,
build releases… Most of the time, you are only interested in the end result
(ie did unit/code style/whatever tests pass?) and in that case Github displays
that nicely in the page (and even in the page icon lately). However, from time
to time, it might be useful to get a little more info for instance to see an
overview of the code coverage of the tests or where you don't respect the
expected code styles without having to load the full build log which is usually
quite long, hard to read and slow to load.

In my own case, for each pull request, Travis CI builds and pushes this website
so that I can see my changes in a kind of *staging* environment, so in addition
to the build result, I would like to have a link to click on to see my changes.
Doing that is not super complicated but requires some steps to get a working
solution.

## Trigger a script at a given build step

First, you need to change your `.travis.yml` to trigger a script at [a Travis CI
build
step](https://docs.travis-ci.com/user/customizing-the-build/#The-Build-Lifecycle)
suitable for your need. In my case, I do that in the `after_success` step
because I only want to comment if the build was successful, so in my
`.travis.yml` file I have something like:

```yml
after_success:
    - ./path/to/script.sh
```

## Detect a pull request build

Then in this script, I have to detect whether Travis CI is building a pull
request or not. There are various ways of doing that, but [the Travis CI
documentation advices to use the `TRAVIS_PULL_REQUEST` environment
variable](https://docs.travis-ci.com/user/pull-requests)
which directly gives this information. So the script will contain a condition
like:

```sh
if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
   # hey that's a pull request
fi
```

## Post a comment with the Github API

Remains to actually post the comment. For that, I use [the Github REST API
v3](https://developer.github.com/v3/) because when I set up this system, it was
the only available solution. To use the API, you'll need to create a *Personal
access token* as described in [the user a
documentation](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
The token is associated with one or several scopes. The scopes define what you
can do with the token. To post a comment, the token needs to have the scope
`repo/public_repo`, at least this is what I learned after various tries :)

Once you get a token, you need to make it available to the build process. For
such a sensible information (remember a token is like a password), Travis CI
offers two options:

1. [define an encrypted environment variable in
   `.travis.yml`](https://docs.travis-ci.com/user/environment-variables#Defining-encrypted-variables-in-.travis.yml)
1. [define an environment variable in Repository
   settings](https://docs.travis-ci.com/user/environment-variables#Defining-Variables-in-Repository-Settings)

In both cases, the environment variable is made available in the build process
in a *secured* way (at least it's not displayed in the build log). I use the
second option and the environment variable is called  `GITHUB_TOKEN`.

With that in place, we can now call the Github API. If you look at [the API
documentation for pull requests](https://developer.github.com/v3/pulls/), you
won't find any resource to post a comment, but there's [one to comment an
issue](https://developer.github.com/v3/issues/comments/#create-a-comment) which
happens to also work for a pull request.

For instance the following `curl` based command line will create a *Hello world*
comment on a pull request build in Travis CI:

```bash
curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST \
-d "{\"body\": \"Hello world\"}" \
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
```

Of course, the content of the comment can be customized as long as the request
body is a valid JSON document.

And that's it, as an example, you can look at [the pull
request](https://github.com/dpobel/damien.pobel.fr/pull/62) I created to write
this blog post, [Travis CI kindly commented for me the
URL](https://github.com/dpobel/damien.pobel.fr/pull/62#issuecomment-341838198)
of the staging website to view it online thanks to [those two lines in my
`deploy.sh`
script](https://github.com/dpobel/damien.pobel.fr/blob/comment_from_travisci/bin/deploy.sh#L9-L10).
