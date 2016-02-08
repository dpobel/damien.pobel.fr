---
title: "Générer des URL significatives en PHP"
tags: ez publish, truc, cms, windows, microsofterie, php, web
updated: 2008-10-31T08:41:20.000Z
lang: "fr"
node: "66631"
remoteId: "134041734a784d250939028157609383"
published: 2008-02-03T14:34:07+01:00
---

Il existe beaucoup de types d'URL possible pour une application web et encore plus de codes pour les générer. Une bonne URL devrait être assez courte mais significative. Par exemple [le CMS eZ Publish](/tag/ez-publish) depuis [sa version 3.10](/post/url-aliases-transformed-into-numbers-when-upgrading-to-ez-publish-3-10-0) utilise un système assez complexe (en code) mais très souple permettant de produire [des URLs selon le format de son choix](http://ez.no/doc/ez_publish/technical_manual/3_10/features/multi_language_support_for_url_aliases) (avec ou sans majuscule, en conservant ou non les accents, les espaces, choix du séparateur, ...). Si, on ne trouve pas son bonheur on peut même écrire une extension pour un formatage sur mesure, voir par exemple [celle de Damien Pitard sur ez.no](http://ez.no/developer/contribs/applications/dpgnu_dp_google_news_url) optimisant [les URLs pour l'indexation de contenu dans Google Actualités](http://www.google.fr/support/news_pub/bin/answer.py?answer=70725).


Quand on écrit une application simple en tout cas, moins générique qu'un <abbr title="Content Management System">CMS</abbr>  comme eZ Publish, on peut faire plus simple. Personnellement, j'aime les URLs de la forme &quot;generer-des-url-en-php&quot;, c'est à dire en minuscule sans caractère spécial ni accent avec un tiret comme séparateur, c'est *a priori* la forme la plus simple et [optimisée pour les moteurs de recherche](http://www.webrankinfo.com/actualites/200704-pas-undescore-dans-les-url.htm).


Pour produire, une URL de ce type j'utilise une fonctionnalité assez peu connue de la fonction [iconv()](http://fr.php.net/iconv) : la **translittération**. En gros, iconv() est capable lors de la conversion d'un jeu de caractères à un autre de trouver des équivalences si un caractère ne peut être représenté dans le jeu de caractères cible. Par exemple, si on convertit un é en ASCII, iconv() proposera un e à la place avec l'option TRANSLIT, le symbole € sera lui remplacé par &quot;eur&quot;... C'est d'ailleurs aussi très pratique pour traiter des chaînes de caractères issues de copier coller de traitement de texte comme Word qui insère pas mal de bizarreries.


Le code que j'utilise est le suivant :

``` php
<?php
class MonApplicationTools
{
    const LOCALE = 'fr_FR.UTF-8';
    const CHARSET = 'UTF-8';
    const SEPARATOR = '-';

    static function initLocale( $locale = self::LOCALE )
    {
        setlocale( LC_ALL, $locale );
    }

    static function URLize( $str, $fromCharset = self::CHARSET, $separator = self::SEPARATOR )
    {
        $tmp = iconv( $fromCharset, 'ASCII//TRANSLIT', trim( $str ));
        $pattern = array( '/[^a-z0-9]/',
                            '/' . $separator . $separator . '+/',
                            '/^' . $separator . '/',
                            '/' . $separator . '$/' );
        $replacement = array( $separator, $separator, '', '' );
        return preg_replace( $pattern, $replacement, strtolower( $tmp ));
    }
}

MonApplicationTools::initLocale();
$url1 = MonApplicationTools::URLize( 'Générer des URL en PHP' );
$url2 = MonApplicationTools::URLize( 'Fraude sur des milliards d\'€ à la Société Générale !!' );
echo $url1 . '<br />' . $url2;
// renvoie
// generer-des-url-en-php
// fraude-sur-des-milliards-d-eur-a-la-societe-generale
?>

```


Le seul inconvénient de cette méthode est qu'il faut initialiser la [locale](http://pwet.fr/man/linux/conventions/locale) utilisée par l'application par une locale existante sur le système et reconnaissant les caractères à transformer, ce qui est rarement le cas par défaut mais peut être très utile par ailleurs si on veut par exemple utiliser des formats de dates normalisés et localisés avec [strftime()](http://fr.php.net/strftime). L'appel de la méthode initLocale() (qui appelle [setlocale()](http://fr.php.net/setlocale)) réalise ce travail et aura sa place dans un fichier d'intilialisation globale (connexion à la base de données, définition du __autoload, ...) inclus dans tous les scripts. Il faut également prêter attention au fait que sous [Windows, les locales ne s'écrivent pas de la même manière](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/vclib/html/_crt_language_strings.asp), évidemment, c'eut été trop simple sinon !

