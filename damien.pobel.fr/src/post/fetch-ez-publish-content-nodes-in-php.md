---
title: "Fetch eZ Publish content nodes in PHP"
tags: ez publish, truc, php, pense bête
updated: 2007-10-01T21:51:05.000Z
node: "66235"
remoteId: "b1f35362162c589ed9b1e3d9ce1d861c"
published: 2007-09-08T00:21:47+02:00
lang: "en"
---

*This short article is a reminder for me, I hope it will save me hours next time.*


In a PHP script, to fetch content object nodes you can use eZContentObjectTreeNode::subtree or eZFunctionHandler::execute. The second is very practical because its syntax is similar to content fetch functions in templates. But there's one difference: when writing an attribute filter condition you have to put your condition array in another array even if there's only one condition. For example, in templates you can write :

 ```
{def $tree=fetch(content, tree, hash(parent_node_id, 2,
                      attribute_filter, array( 'name', 'like', '*ez publish*' )) )}
```


So, in a PHP script, I was thinking that I could write :

 ``` php
$tree = eZFunctionHandler::execute('content','tree', array('parent_node_id' => 2,
                      'attribute_filter' => array( 'name', 'like', '*ez publish*' )) );
```


But it does not work, you have to use this instead :

 ``` php
$tree = eZFunctionHandler::execute('content','tree', array('parent_node_id' => 2,
                      'attribute_filter' => array( array( 'name', 'like', '*ez publish*' )) ));
```


In fact, in the documentation of the template fetch list function about attribute filtering (parameters for fetch list and fetch tree are mostly the same), you can read:

 <blockquote>
The &quot;attribute_filter&quot; parameter must be an array. The first element may be set to either &quot;and&quot; or &quot;or&quot; - this controls how the matching specified in the upcoming elements should be carried out. If this parameter is omitted, the system will default to &quot;and&quot;. The rest of the elements are arrays, each array specifies a match.
</blockquote>


So, the first and the second examples are not correct even if the first works in templates ! Damn, this took me almost 2 hours…

