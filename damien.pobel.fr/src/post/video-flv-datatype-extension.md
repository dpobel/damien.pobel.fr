---
title: "Video FLV Datatype extension"
tags: ezvideoflv, ez publish, vidéo, logiciels libres, php
node: "66321"
remoteId: "f882331a6fe19d8b292bb36ba6ed2395"
published: 2007-10-02T14:08:04+02:00
updated: 2016-02-12 12:32
lang: "en"
---

Yesterday, I released the first version of
eZVideoFLV, a
new extension providing a datatype to store, handle and convert to FLV video
files. It's based on the default ezmedia
datatype.
It mainly adds three features:

* generate an image preview for each video file using
  [ffmpeg-php](http://ffmpeg-php.sourceforge.net/) and
  [GD](http://ffmpeg-php.sourceforge.net/doc/api/ffmpeg_frame.php)
* detect and store video size width ffmpeg-php to
* convert video file to FLV on upload or with a cronjob script in order to be
  readable with a flash FLV player (like on Youtube or Dailymotion) using
  [ffmpeg](http://ffmpeg.mplayerhq.hu/) program

The extension is bundled with [FLV Player](http://flv-player.net/) which is
released under the MPL 1.1 license. The rest of the extension is released under
the GNU GPL licence 2. All information  can be
found on
[projects.ez.no](http://projects.ez.no/).
