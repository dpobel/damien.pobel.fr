---
title: "Problème réseau Dedibox"
tags: réseau, dedibox
updated: 2007-09-02T11:57:55.000Z
lang: "fr"
node: "65224"
remoteId: "0c8c13a32b112d9dc3de84c5a347f6fe"
published: 2007-05-05T19:21:56+02:00
---
 
Le réseau Dédibox n'était visiblement pas en grande forme cet après midi... Le paquet numéro 1 arrive en 6ième position après le paquet 24, inutile de dire que ce n'est pas très normal...

 ``` bash
$ ping pwet.fr
PING pwet.fr (88.191.30.29) 56(84) bytes of data.
64 bytes from dedibox.pwet.fr (88.191.30.29): icmp_seq=20 ttl=54 time=43.5 ms
64 bytes from dedibox.pwet.fr (88.191.30.29): icmp_seq=21 ttl=54 time=41.2 ms
64 bytes from dedibox.pwet.fr (88.191.30.29): icmp_seq=22 ttl=54 time=40.2 ms
64 bytes from dedibox.pwet.fr (88.191.30.29): icmp_seq=23 ttl=54 time=44.3 ms
64 bytes from dedibox.pwet.fr (88.191.30.29): icmp_seq=24 ttl=54 time=40.7 ms
64 bytes from dedibox.pwet.fr (88.191.30.29): icmp_seq=1 ttl=54 time=38254 ms
```

 ``` bash
$ tracepath pwet.fr
 1:  Lorien (192.168.0.243)                                 0.230ms pmtu 1500
 1:  192.168.0.1 (192.168.0.1)                              1.629ms 
 2:  82.225.188.254 (82.225.188.254)                       41.563ms 
 3:  montpellier-6k-1-a5.routers.proxad.net (213.228.12.62) asymm  4  41.176ms 
 4:  marseille-6k-1-v802.intf.routers.proxad.net (212.27.50.94) asymm  5  44.069ms 
 5:  no reply
 6:  no reply
 7:  bzn-6k-4-po3-t.intf.routers.proxad.net (212.27.58.42) asymm  8  57.881ms 
 8:  88.191.2.25 (88.191.2.25)                            asymm  9  56.838ms 
 9:  88.191.2.21 (88.191.2.21)                            asymm 10  55.103ms 
10:  no reply
[...]
18:  no reply
12:  dedibox.pwet.fr (88.191.30.29)                       asymm 11 21558.447ms reached
     Resume: pmtu 1500 hops 12 back 11
```

