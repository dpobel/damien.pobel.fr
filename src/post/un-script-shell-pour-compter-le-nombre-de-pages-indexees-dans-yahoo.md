---
title: "Un script shell pour compter le nombre de pages indexées dans Yahoo"
tags: yahoo, geek, xml, xslt, google, blog, référencement, shell
updated: 2007-02-01T23:31:09.000Z
lang: "fr"
node: "61128"
remoteId: "770b444515f9dc45cf1f5974506172d2"
published: 2006-09-05T22:22:03+02:00
---
 
Toute ressemblance avec un script déjà existant et publié sur ce site n'est **PAS** fortuite :). C'est la suite logique du [Script shell pour compter le nombre de pages indexées dans Google](/post/un-script-shell-pour-compter-le-nombre-de-pages-indexees-dans-google) et c'est encore plus simple puisqu'ici point de requête POST en XML mais une seule requête HTTP avec [wget](http://pwet.fr/man/linux/commandes/wget) et il n'y a plus qu'à passer le résultat dans du XSLT avec [xsltproc](http://pwet.fr/man/linux/commandes/xsltproc) et c'est fini. La seule subtilité réside dans la définition d'un espace de nom pour l'espace de nom par défaut des résultats de Yahoo. Le script est le suivant, il suffit de renseigner la variable APPID avec [un identifiant d'application créer chez Yahoo!](http://api.search.yahoo.com/webservices/register_application) et ça devrait marcher.

 ``` bash
#! /bin/sh

XSLT='<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:y="urn:yahoo:srch" version="1.0">
<xsl:output omit-xml-declaration="yes" /> 
<xsl:template match="/">
<xsl:value-of select="y:ResultSet/@totalResultsAvailable" />
</xsl:template>
</xsl:stylesheet>'

TMP_XML="/tmp/yahoo.xml"
TMP_XSL="/tmp/yahoo.xsl"
APPID="VOTRE_APP_ID_YAHOO"
URL="http://api.search.yahoo.com/WebSearchService/V1/webSearch?appid=$APPID&results=1"

if [ $# -ne 1 ] ; then
    echo "`basename $0` domaine.com"
    echo -e "    compte le nombre de résultats dans Yahoo Search pour domaine.com"
    exit 1
fi

QUERY="$URL&query=site:$1"
echo $XSLT > $TMP_XSL

wget --quiet "$QUERY" -O "$TMP_XML"
echo -n "`date +%Y-%m-%d` "
xsltproc "$TMP_XSL" "$TMP_XML"
rm -f "$TMP_XML" "$TMP_XSL"
```

 
Ce script me permettra de comparer la vitesse à laquelle ces moteurs indexent mon site. Actuellement ces scripts donnent le résultat suivant :

 ``` 
$ ./google_count.sh pwet.fr
2006-09-05 662
$ ./yahoo_count.sh pwet.fr
2006-09-05 621
```

 
J'espère pouvoir faire la même chose pour [MSN Search](http://search.msn.fr), mais il semble que pour utiliser l'API MSN, [il faut pouvoir installer un .msi](http://www.microsoft.com/downloads/details.aspx?FamilyId=C271309B-02DE-42A7-B23E-E19F68667197&amp;displaylang=en) ce qui sous Ubuntu n'est pas gagné d'avance, mais je vais enquêter.

