#! /bin/sh

PAGE="src/page/flux-rss-tech.html"
OPML="src/files/feeds.opml"
OPML_TECH="src/files/tech.opml"

[ ! -f "$OPML" ] && echo "Please export the OPML file to $OPML before running this script" && exit 1

echo '---' > $PAGE
echo 'title: Sites et flux RSS techniques' >> $PAGE
date "+updated: %Y-%m-%d %H:%M:%S" >> $PAGE
echo '---' >> $PAGE


xsltproc --stringparam text Tech ./node_modules/opml-utils/filter.xsl $OPML > $OPML_TECH
xsltproc templates/xslt/opml2doc.xsl $OPML_TECH >> $PAGE
