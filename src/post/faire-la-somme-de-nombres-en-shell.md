---
title: "Faire la somme de nombres en shell"
tags: shell, bash, linux, mysql, pense bête, truc
updated: 2009-03-11T13:05:20.000Z
lang: "fr"
node: "67665"
remoteId: "8499431c7d905086b47ebf712cbc9564"
published: 2009-03-11T14:03:28+01:00
---

Petit pense bête pour la prochaine fois où j'aurai besoin de faire la somme d'une liste de nombres en shell (un nombre par ligne) :

``` bash
cat my_file | awk '{total+=$1}END{print total}'
```


Par exemple, pour obtenir la taille totale des tables dans une base de données [MySQL](/tag/mysql) :

``` bash
mysqlshow -i my_db '*' | tr -s ' ' | cut -d ' ' -f 14 | grep [0-9] | awk '{total+=$1}END{print total}'
```

