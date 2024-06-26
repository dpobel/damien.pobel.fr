---
title: "Symlink to the eZ Publish var directory, a good idea?"
tags: ez publish, cache, truc, apache
node: "69792"
remoteId: "5076a4d23339a88b527dd6fdae96c9ef"
published: 2012-07-06T17:49:12+02:00
---

## Symlink based directory layout


On most of my sites, I tend to adopt the following folder layout:

``` bash
/web/sites/planet-ezpublish.fr$ find . -maxdepth 2 -name www\* -o -name var -ls | tr -s ' ' | cut -d ' ' -f 11-14
./wwwnewdesign/var -> ../var/
./www44/var -> ../var
./var
./www2012.5/var -> ../var
./www -> wwwnewdesign
```


As you can see, <code>www</code>
 (the Apache document root) and <code>www&lt;version&gt;/var</code>
 are symlinks. The main idea behind this organization is to ease upgrades from an eZ Publish version to another, after upgrading on my developer machine and uploading the code to <code>/web/sites/mywebsite.com/www&lt;version&gt;</code>
, I just have to change the symlinks on the disk and I'm done!


## Cache issues


I know that some others are using a quite similar setup but [Nicolas](https://twitter.com/npanau) and [Arnaud](http://www.arnaudlafon.com/) seem [to encounter caching issues with it](https://twitter.com/arnaudlafon/status/215755953675567104). At first, [I answered that this is working as expected for me](https://twitter.com/dpobel/status/215774405547147264), but a while after, I discovered that I also have some cache issues on Planet eZ Publish.fr (mainly <code>cache-block</code>
 not being expired) while the same setup on [pwet.fr](http://pwet.fr)/t-ka.net does not seem to be affected.


Actually, this comes from the configured file handler. pwet.fr/t-ka.net eZ Publish instance is configured with the <code>eZFS2FileHandler</code>
 while Planet eZ Publish.fr was configured with <code>eZFSFileHandler</code>
. And there is a big difference between those file handlers: when a cache file is outdated, <code>eZFSFileHandler</code>
 will try to remove it while <code>eZFS2FileHandler</code>
 just sets a specific last modified time to mark it as expired (this is the base of the stale cache mechanism). In addition, a protection had been added in eZ Publish (and [it's enabled by default](https://github.com/ezsystems/ezpublish-legacy/commit/33439b3d)) to not let it remove files that are outside of the eZ Publish directory, and of course, this is the case with the symlink layout above. *So the cache issue is not a bug, it's a feature* ;-)


So if you want to use this kind of setup, you have to configure your eZ Publish instance with the <code>eZFS2FileHandler</code>. But keep in mind, that <code>eZFS2FileHandler</code>
 is still a bit experimental and that 2012.4 and 2012.5 community releases were affected by this bug, so you'd better apply [this patch](https://github.com/ezsystems/ezpublish-legacy/commit/ca5f2805ab179d7426697d9d5d32d8f0701fbc1f) to keep your images!

