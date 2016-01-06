---
title: "How to make eZ Publish use override conditions when loading a template"
tags: ez publish, php, truc, pense bête, template
updated: 2010-07-01T14:28:16.000Z
node: "67919"
remoteId: "288bef9488410ea0e41b0e24b4ba8631"
published: 2009-08-26T20:13:34+02:00
---

I answered this question today [on IRC](http://ez.no/developer/irc) and a colleague asked me the same thing about two weeks ago... it's time to write down the solution :-)


Basically, you just need to tell what *design keys* you want to use and their value to the template engine of [eZ Publish](/tag/ez+publish). The *design keys* are the parameters you will be able to use in [an override condition](http://ez.no/doc/ez_publish/technical_manual/4_0/templates/the_template_override_system). Let's take an example with a simplistic PHP view (it lacks a lots of checkings) :

``` php
<?php
require_once 'kernel/common/template.php';
$NodeID = intval( $Params['NodeID'] );
$node = eZContentObjectTreeNode::fetch( $NodeID );
$tpl = templateInit();
$tpl->setVariable( 'node', $node );

// setting up the context to use override conditions
$res = eZTemplateDesignResource::instance();
$designKeys = array( array( 'class_identifier', $node->attribute( 'class_identifier' )),
                     array( 'parent_node_id', $node->attribute( 'parent_node_id' )) );
$res->setKeys( $designKeys );

$tpl->fetch( 'design:mymodule/myview.tpl' );
?>

```


In this code, I define two *design keys*: <code>class_identifier</code>
 and <code>parent_node_id</code>
, so I can write override rules that match on the class identifier or on the parent node id of the node or on both, for example :

``` ini
[myview_folder]
Source=mymodule/myview.tpl
MatchFile=myview/folder.tpl
Subdir=templates
Match[class_identifier]=folder

```


With this override condition, eZ Publish will use the template located in <code>override/templates/myview/folder.tpl</code>
 in the design when the node is a folder, otherwise it will use the default one (<code>templates/mymodue/myview.tpl</code>
).

