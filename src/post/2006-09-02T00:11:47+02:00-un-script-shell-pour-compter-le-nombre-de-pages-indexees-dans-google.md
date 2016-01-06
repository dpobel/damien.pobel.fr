---
title: "Un script shell pour compter le nombre de pages indexées dans Google"
tags:
    - geek
    - xml
    - xslt
    - debian
    - bash
    - ubuntu
    - google
    - référencement
    - shell
updated: 2006-12-01T14:07:20+01:00
lang: fr
node: 60935
remoteId: 1ec19d903b7ad0368a47169ba34aa526
---
 
Comme je l'ai écrit [dans mon premier billet](/post/ouverture), ce site me sert de laboratoire de tests. Mon premier test va être d'observer comment Google (et les autres) indexe ce site. Pour cela, il suffit d'écrire un script qui sera lancé tous les jours à l'aide d'un [crontab](http://pwet.fr/man/linux/formats/crontab) sur un serveur.

 
Ma première idée pour atteindre ce but était d'écrire un simple script shell qui utiliserait [wget](http://pwet.fr/man/linux/commandes/wget) pour récupèrer la première page de résultats et n'en prendre que la partie qui m'intéresse à l'aide [sed](http://pwet.fr/man/linux/commandes/sed__1) et d'une [expression rationnelle](http://pwet.fr/man/linux/conventions/regex) adéquate. Mais après une petite réflexion et la lecture des [conditions d'utilisation de Google](http://www.google.fr/accounts/TOS), il est interdit d'utiliser Google de manière automatique. Petite note en passant, Google interdit l'accès à ses pages à wget lorsque celui-ci utilise son user agent par défaut...

 
Finalement, la solution est d'utiliser la fameuse [API SOAP de Google](http://www.google.com/apis/) avec un clef valide (c'est gratuit et mais limité à 1000 requêtes/jour). Cette solution est légèrement plus complexe que la précédente, il faut juste trouver le moyen d'envoyer une requête HTTP POST contenant une requête SOAP bien formée et ensuite analyser le document XML retourné pour en extraire le nombre de résultats. Le requête est effectuée à l'aide [curl](http://pwet.fr/man/linux/commandes/curl) qui est un outil capable de transfèrer des données sur plusieurs protocoles dont le protocole HTTP. Ensuite les données du XML sont analysées à l'aide d'une feuille XSLT et de [xsltproc](http://pwet.fr/man/linux/commandes/xsltproc). Le but final étant de tracer une courbe à l'aide de plot, il reste à dater l'enregistrement.

 
Ce qui donne le script suivant :

 ``` bash
#! /bin/sh

XML='<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
        xmlns:xsd="http://www.w3.org/1999/XMLSchema">
  <SOAP-ENV:Body>
    <ns1:doGoogleSearch xmlns:ns1="urn:GoogleSearch" 
         SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <key xsi:type="xsd:string">%s</key>
      <q xsi:type="xsd:string">%s</q>
      <start xsi:type="xsd:int">0</start>
      <maxResults xsi:type="xsd:int">10</maxResults>
      <filter xsi:type="xsd:boolean">true</filter>
      <restrict xsi:type="xsd:string"></restrict>
      <safeSearch xsi:type="xsd:boolean">false</safeSearch>
      <lr xsi:type="xsd:string"></lr>
      <ie xsi:type="xsd:string">latin1</ie>
      <oe xsi:type="xsd:string">latin1</oe>
    </ns1:doGoogleSearch>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>'

XSLT='<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
                xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"
                xmlns:xsd="http://www.w3.org/1999/XMLSchema"
                xmlns:ns1="urn:GoogleSearch">
<xsl:output omit-xml-declaration="yes" /> 
<xsl:template match="/SOAP-ENV:Envelope">
<xsl:value-of select="SOAP-ENV:Body/ns1:doGoogleSearchResponse/return/estimatedTotalResultsCount/text()" />
</xsl:template>
</xsl:stylesheet>'

TMP_XSL="/tmp/google.xsl"
TMP_XML="/tmp/google.xml"
KEY="VOTRE_CLEF_GOOGLE"
URL="http://api.google.com/search/beta2"

if [ $# -ne 1 ] ; then
    echo "`basename $0` domaine.com"
    echo -e "    compte le nombre de résultats dans Google pour domaine.com"
    exit 1
fi

QUERY="site:$1"
echo $XSLT > $TMP_XSL
SOAP=$(printf "$XML" "$KEY" "$QUERY")
curl -H "Content-Type: text/xml" -d "$SOAP" $URL > /tmp/google.xml 2> /dev/null
echo -n "`date +%Y-%m-%d` "
xsltproc "$TMP_XSL" "$TMP_XML"
rm -f "$TMP_XSL" "$TMP_XML"
```

 
Il ne reste plus qu'à configurer la tâche planifier et à atteindre quelques jours pour pouvoir tracer un joli graphique. Ce script a été testé sur Debian Sarge et Ubuntu Dapper Drake, mais devrait fonctionner sans aucun problème avec toute version relativement récente de curl et xsltproc, pour les installer il suffit de taper :

 ``` bash
sudo apt-get install xsltproc curl
```

 
Pour le moment, ce script donne le résultat suivant :

 ``` 
> tigrou@Lorien[192.168.0.243]:~$ ./google_count.sh pwet.fr
2006-09-02 30
```

