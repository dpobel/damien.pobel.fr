#! /bin/sh

OPML="$1"
PAGE="src/page/flux-rss-tech.html"
OPML_TECH="src/files/tech.opml"

help() {
    echo "Please export the feed list as an OPML file and then pass the file path as the first parameter"
    echo ""
    echo "$0" path/to/file.opml
    echo ""
}

[ ! -f "$OPML" ] && help "$0" && exit 1

LAST_CHANGE=`stat -c "%Y" $OPML`
EXPORT_DATE=`date --date=@$LAST_CHANGE '+%d/%m/%Y'`

echo '---' > $PAGE
echo 'title: Sites et flux RSS techniques' >> $PAGE
date "+updated: %Y-%m-%d %H:%M:%S" >> $PAGE
echo '---' >> $PAGE

xsltproc --stringparam text Tech ./node_modules/opml-utils/filter.xsl $OPML > $OPML_TECH
xsltproc --stringparam exportDate "$EXPORT_DATE" templates/xslt/opml2doc.xsl $OPML_TECH >> $PAGE
