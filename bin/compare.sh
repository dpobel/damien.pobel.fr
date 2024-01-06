#! /bin/sh

mkdir production/
cd production

PR_URL="$1"
ONLINE_URL="https://damien.pobel.fr"

echo "URL: $1"
echo "### Stats"

DIFF_SUMMARY=""

format_html () {
  cat "$1"|sed "s/>/>\n/g"
}

format_xml () {
  xmllint --format "$1"
}

format_css () {
  cat "$1"|npx prettier --stdin-filepath style.css
}

format_pdf () {
  pdftohtml -s -stdout "$1" | grep -v '<title>' | grep -v '<meta name="date" '
}

no_format () {
  cat "$1"
}

check_css () {
  ONLINE_CSS_FILE=`wget --quiet $ONLINE_URL/ -O - | sed -e 's@.*<link rel=stylesheet href=/\(.*\)><title>.*@\1@g'`
  LOCAL_CSS_FILE=`cat ../web/index.html | sed -e 's@.*<link rel=stylesheet href=/\(.*\)><title>.*@\1@g'`
  wget --quiet "$ONLINE_URL/$ONLINE_CSS_FILE"
  SIZE_ONLINE=`stat -c "%s" "$ONLINE_CSS_FILE"`
  SIZE_LOCAL=`stat -c "%s" "../web/$LOCAL_CSS_FILE"`
  IDENTICAL="✅️"
  CSS_DIFF_SUMMARY=""
  if [ "$ONLINE_CSS_FILE" != "$LOCAL_CSS_FILE" ] ; then
    IDENTICAL="❌️"
    CSS_DIFF_SUMMARY="\`$ONLINE_CSS_FILE\` ⮕ \`$LOCAL_CSS_FILE\`"
  fi
  format_css "$ONLINE_CSS_FILE" > "$ONLINE_CSS_FILE.pretty"
  format_css "$LOCAL_CSS_FILE" > "$LOCAL_CSS_FILE.pretty"
  DIFF=`diff -u "$ONLINE_CSS_FILE.pretty" "$LOCAL_CSS_FILE.pretty"`
  if [ ! -z "$DIFF" ] ; then
    IDENTICAL="❌️"
    CSS_DIFF_SUMMARY="$CSS_DIFF_SUMMARY\n\n\`\`\`diff\n$DIFF\n\`\`\`\n"
  fi
  if [ ! -z "$CSS_DIFF_SUMMARY" ] ; then
    DIFF_SUMMARY="$DIFF_SUMMARY\n\n#### CSS\n\n$CSS_DIFF_SUMMARY"
  fi
  echo "CSS | [Open]($ONLINE_URL$ONLINE_CSS_FILE) | [Open]($PR_URL$LOCAL_CSS_FILE) | $SIZE_ONLINE | $SIZE_LOCAL | $IDENTICAL"
}

check_file () {
  NAME=$1
  WEB_PATH=$2
  BUILD_LOCAL=$3
  DIFF_OPERATION=$4
  TEMPORARY=`basename $BUILD_LOCAL`
  FORMATER=$5

  wget --quiet "$ONLINE_URL/$WEB_PATH" -O "$TEMPORARY"
  SIZE_ONLINE=`stat -c "%s" "$TEMPORARY"`
  SIZE_LOCAL=`stat -c "%s" "$BUILD_LOCAL"`
  IDENTICAL="✅️"
  if [ "$DIFF_OPERATION" = "diff" ] ; then
    $FORMATER "$TEMPORARY" > "$TEMPORARY.pretty"
    $FORMATER "$BUILD_LOCAL" > "$BUILD_LOCAL.pretty"
    DIFF=`diff -u "$TEMPORARY.pretty" "$BUILD_LOCAL.pretty"`
    if [ ! -z "$DIFF" ] ; then
      IDENTICAL="❌️"
      DIFF_SUMMARY="$DIFF_SUMMARY\n\n#### $NAME\n\n\`\`\`diff\n$DIFF\n\`\`\`\n"
    fi
    rm "$TEMPORARY.pretty" "$BUILD_LOCAL.pretty"
  else
    cmp --silent -- "$BUILD_LOCAL" "$TEMPORARY"
    if [ $? -ne 0 ] ; then
      IDENTICAL="❌️"
    fi
  fi
  echo "$NAME | [Open]($ONLINE_URL$WEB_PATH) | [Open]($PR_URL$WEB_PATH) | $SIZE_ONLINE | $SIZE_LOCAL | $IDENTICAL"
  rm "$TEMPORARY"
}


echo " Page | Online | PR version | Size online | Size local | Identical?"
echo " ---- | :---: | :---: | ----------- | ---------- | :---:"

check_file "Homepage" "/" "../web/index.html" "diff" "format_html"
check_css
echo " **Blog** "
check_file "Blog" "/posts/" "../web/posts/index.html" "diff" "format_html"
check_file "RSS" "/rss.xml" "../web/rss.xml" "diff" "format_xml"
check_file "RSS tag" "/rss/métier.xml" "../web/rss/métier.xml" "diff" "format_xml"
check_file "RSS tag fr" "/rss/linux/fr.xml" "../web/rss/linux/fr.xml" "diff" "format_xml"
check_file "Post" "/post/custom-hooks-react/" "../web/post/custom-hooks-react/index.html" "diff" "format_html"
check_file "Tag page (veille)" "/tag/veille/" "../web/tag/veille/index.html" "diff" "format_html"
check_file "Tag page pagination (javascript, page 5)" "/tag/javascript/5/" "../web/tag/javascript/5/index.html" "diff" "format_html"
check_file "Tag page (lecteur d'écran)" "/tag/lecteur-d'écran/" "../web/tag/lecteur-d'écran/index.html" "diff" "format_html"
check_file "Tags" "/tags/" "../web/tags/index.html" "diff" "format_html"
echo " **CV** "
check_file "CV fr" "/page/cv-fr/" "../web/page/cv-fr/index.html" "diff" "format_html"
check_file "CV fr pdf" "/page/cv-fr/cv-fr-damien-pobel.pdf" "../web/page/cv-fr/cv-fr-damien-pobel.pdf" "diff" "format_pdf"
check_file "CV" "/page/cv/" "../web/page/cv/index.html" "diff" "format_html"
check_file "CV en pdf" "/page/cv/cv-damien-pobel.pdf" "../web/page/cv/cv-damien-pobel.pdf" "diff" "format_pdf"
echo " **Pages** "
check_file "Page list" "/pages/" "../web/pages/index.html" "diff" "format_html"
check_file "About" "/page/about/" "../web/page/about/index.html" "diff" "format_html"
echo " **Misc** "
check_file "Github profile", "/github/README.md" "../web/github/README.md" "diff" "no_format"
check_file "Github page", "/github/page/" "../web/github/page/index.html" "diff" "format_html"
echo " **Photos** "
check_file "Resized Photo (660x)" "/images/660x/syrphe-phacelie.jpg" "../web/images/660x/syrphe-phacelie.jpg"
check_file "Resized Photo (200x)" "/images/200x/syrphe-au-coeur-coquelicot.jpg" "../web/images/200x/syrphe-au-coeur-coquelicot.jpg"

if [ ! -z "$DIFF_SUMMARY" ] ; then
  echo "---"
  echo "### Diffs"
  echo "$DIFF_SUMMARY"
fi

cd ..
