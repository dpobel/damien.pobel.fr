---
title: "Video FLV Datatype extension"
tags: ezvideoflv, ez publish, vidéo, logiciels libres, php
updated: 2008-10-30T08:38:49.000Z
node: "66321"
remoteId: "f882331a6fe19d8b292bb36ba6ed2395"
published: 2007-10-02T14:08:04+02:00
---

Yesterday, I released the first version of [eZVideoFLV](http://ez.no/developer/contribs/datatypes/video_flv_datatype), a new extension providing a datatype to store, handle and convert to FLV video files. It's based on [the default ezmedia datatype](http://ez.no/doc/ez_publish/technical_manual/3_9/reference/datatypes/media). It mainly adds three features :

* generate an image preview for each video file using [ffmpeg-php](http://ffmpeg-php.sourceforge.net/) and [GD](http://ffmpeg-php.sourceforge.net/apidoc.php#ffmpeg_frame)
* detect and store video size width ffmpeg-php too
* convert video file to FLV on upload or with a cronjob script in order to be readable with a flash FLV player (like on Youtube or Dailymotion) using [ffmpeg](http://ffmpeg.mplayerhq.hu/) program

The extension is bundled with [FLV Player](http://flv-player.net/) which is released under the MPL 1.1 license. The rest of the extension is released under the GNU GPL licence 2. All information (requirements, installation, [screenshots](http://projects.ez.no/ezvideoflv/gallery/screenshots),...) can be found in [the project page](http://projects.ez.no/ezvideoflv) on [projects.ez.no](http://projects.ez.no/) and I put [an example on this site](http://pwet.fr/media/multimedia/test_video_flv_datatype).

