---
title: "Graphique d'indexation avec le module Graph d'eZ components"
tags: ez publish, yahoo, ez components, google, blog, php, référencement
lang: "fr"
node: "62547"
remoteId: "612b67a015d219bbbb3fb0cc3171868b"
published: 2006-11-01T23:37:42+01:00
updated: 2016-02-10 08:21
---

eZ components est
un framework sous license BSD développé par eZ systems qui, à terme, devrait
servir de base au futur eZ publish, nom de code
Telemark (ez.no/community/articles/platform_and_solutions_strategy/ez_platform,
page hors ligne depuis…)
La dernière version (2006 2 beta1) de ce framework vient de sortir en version
beta, c'est donc un bon
moyen de tester cet outil prometteur qui semble particulièrement bien conçu.

[Le tutoriel sur le module
Graph](http://ezcomponents.org/docs/tutorials/Graph)
détaille les types de graphique disponible. *A priori*, pour mes données, un
*Line Chart* est le plus adapté. J'ai donc à ma disposition mes deux fichiers
dont chaque ligne comporte deux champs : une date et un nombre, l'exploitation
est très simple et le script PHP permettant de génèrer ce graphique est lui
aussi simple :

 ``` php
<?php
set_include_path( "trunk/" . ini_get( "include_path" )  );
require_once "Base/src/base.php";
function __autoload( $className )
{
    ezcBase::autoload( $className );
}

function getIndexedPages($file)
{
    $file_array = file($file);
    $result_data = array();
    foreach ( $file_array as  $line_data )
    {
        $array_line = explode(' ', $line_data);
        $date = $array_line[0];
        $indexed_pages = $array_line[1];
        $result_data[$date] = $indexed_pages;
    }
    return $result_data;
}

$graph = new ezcGraphLineChart();
$graph->title = 'Pages indexées dans Google et Yahoo!';
$graph->palette = new ezcGraphPaletteBlack();
$graph->data['Google'] = new ezcGraphArrayDataSet( getIndexedPages( 'google_count.dat' ));
$graph->data['Yahoo!'] = new ezcGraphArrayDataSet( getIndexedPages( 'yahoo_count.dat' ));
$graph->yAxis->label = 'Nombre de pages indexées';
// following line makes PHP CLI 5.1.2 on Ubuntu segfault not yet tested with 5.1.6
//$graph->driver = new ezcGraphGdDriver();
$graph->render( 800, 800, 'indexed_page.svg' );
?>
```

L'avant dernière ligne du script est commentée car visiblement l'utilisation du
moteur de rendu basé sur la bibliothèque GD permettant de génèrer des PNG fait
planter le programme. Comme je n'ai que la version 5.1.2 de PHP alors que la
dernière version est la 5.1.6, je n'ai pas encore rapporté un éventuel bug, mais
je vais essayer d'enquêter la dessus… Ce petit script permet d'obtenir un SVG
dont voici une version PNG&nbsp;:

<figure class="object-center"><a href="/images/comparaison-de-l-indexation-dans-google-et-dans-yahoo.png"><img loading="lazy" src="/images//comparaison-de-l-indexation-dans-google-et-dans-yahoo.png" alt="Comparaison de l'indexation dans Google et dans Yahoo!">
</a></figure>
