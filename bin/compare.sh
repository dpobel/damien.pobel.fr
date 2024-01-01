#! /bin/sh

mkdir production/
cd production

echo "### Homepage"
echo ""
wget https://damien.pobel.fr/ -O index.html > /dev/null 2>&1
echo '```diff'
diff -us index.html ../web/index.html
echo '```'

echo "### style.css"
echo ""
CSS_FILE=`cat index.html|sed -e 's@.*<link rel=stylesheet href=/\(.*\)><title>.*@\1@g'`
wget https://damien.pobel.fr/$CSS_FILE > /dev/null 2>&1
du -sb $CSS_FILE ../web/style*.css
echo '```diff'
diff -us $CSS_FILE ../web/style*.css
echo '```'

echo "### CV"
echo ""
wget https://damien.pobel.fr/page/cv-fr/ -O cv.html > /dev/null 2>&1
echo '```diff'
diff -us cv.html ../web/page/cv-fr/index.html
echo '```'

echo "### Tag page"
echo ""
wget https://damien.pobel.fr/tag/veille/ -O tag-veille.html > /dev/null 2>&1
echo '```diff'
diff -us tag-veille.html ../web/tag/veille/index.html
echo '```'

echo "### Post"
echo ""
wget https://damien.pobel.fr/post/custom-hooks-react/ -O custom-hooks-react.html > /dev/null 2>&1
echo '```diff'
diff -us custom-hooks-react.html ../web/post/custom-hooks-react/index.html
echo '```'

echo "### CV"
echo ""
wget https://damien.pobel.fr/page/cv-fr/cv-fr-damien-pobel.pdf -O cv-fr.pdf > /dev/null 2>&1
du -sb cv-fr.pdf ../web/page/cv-fr/cv*pdf
wget https://damien.pobel.fr/page/cv/cv-damien-pobel.pdf -O cv-en.pdf > /dev/null 2>&1
du -sb cv-en.pdf ../web/page/cv/cv*pdf

cd ..
