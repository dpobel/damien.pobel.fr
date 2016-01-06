---
title: PHP5 et Google SOAP Search API
tags: xml, amusant, google, php
updated: 2007-05-17T09:46:27.000Z
lang: fr
node: 63024
remoteId: 2a2911915a6591978b28a019c0fa0f9d
published: 2006-11-08T00:54:18+01:00
---
 
Aaaaaah ça fait deux soirs de suite que je m'arrache les cheveux avec [l'extension SOAP de PHP5](http://fr.php.net/manual/en/ref.soap.php). Suite à mon billet sur [les idées de développements](/post/des-idees-plein-d-idees-trop-d-idees), je me suis dit que le logiciel de suivi de référencement pouvait être un projet intéressant. Je me suis donc mis en tête de voir la faisabilité du code et comment je pourrais organiser tout ça en PHP. Dans un premier temps, il faut pouvoir un interroger les moteurs de recherche pour reccueillir des informations. Je me documente donc un peu sur l'extension SOAP de PHP5 ainsi que sur [l'API Google SOAP Search](http://code.google.com/apis/soapsearch/), *a priori* rien de très compliqué surtout que pour le moment, je cherche à peu de choses près à reproduire ce que fait (très salement :) [mon script shell](/post/un-script-shell-pour-compter-le-nombre-de-pages-indexees-dans-google), comme je cherche à faire *propre* je n'utilise pas de requêtes [HTTP POST avec curl](http://fr.php.net/manual/en/ref.curl.php) voire une socket... Il y a une API, autant l'utiliser.

 
J'en suis donc là :

 ``` php
<?php
include_once( 'settings/global.php' );
include_once( 'lib/autoload_components.php' );
include_once( 'lib/interface.php' );

class GoogleAPI extends SearchEngine
{
    static $name='Google API';
    private $cache;
    private $googleKey;
    
    function __construct()
    {
        $this->cache = array();
        $this->loadKey();
    }

    private function loadKey()
    {
        $cfg = ezcConfigurationManager::getInstance();
        $cfg->init( 'ezcConfigurationIniReader', 'settings/' );
        $this->googleKey = $cfg->getStringSetting( 'settings', 'GoogleAPI', 'GoogleKey' );
    }

    private function query($query)
    {
        $keyCache = self::key($query);
        $options = array('soap_version'  => SOAP_1_1, 'trace' => true, 'exceptions' => true);
        $soap = new SOAPClient("settings/GoogleSearch.wsdl", $options);
        try 
        {
            $result = $soap->doGoogleSearch($this->googleKey, $query, 0, 100, false, '',false, '','','');
        }
        catch(SOAPFault $e)
        {
            print_r($e);
            echo $soap->__getLastRequestHeaders();
            echo $soap->__getLastRequest();
            echo $soap->__getLastResponseHeaders();
            echo $soap->__getLastResponse();
            $this->cache[$keyCache] = null;
            return ;
        }
        $this->cache[$keyCache] = $result;
    }

    private function cacheValid($query)
    {
        $key = self::key($query);
        return (array_key_exists($key, $this->cache) && !is_null($this->cache[$key]));
    }

    public function position($query)
    {
        if ( !$this->cacheValid($query))
            $this->query($query);
        print_r($this->cache);
        // TODO
    }

    public function count($query)
    {
        if ( !$this->cacheValid($query))
            $this->query($query);
    // TODO
    }
}
```

 
Mais ça ne marche pas :(

Après beaucoup d'essais avec différentes syntaxes, je tombe invariablement sur l'erreur suivante [et je ne suis pas le seul](http://groups.google.com/groups/search?q=No%20Deserializer%20found%20to%20deserialize%20key&amp;qt_s=Search) :

 ``` php
No Deserializer found to deserialize a ':key' using encoding style 'http://schemas.xmlsoap.org/soap/encoding/'.
```

 
En comparant le message SOAP fait dans le script shell et celui générer par PHP, je me suis rendu compte que les paramètres dans la requête PHP ne sont pas typés (avec l'attribute xsi:type) et du coup le web service chez Google n'est pas capable de décoder les paramètres qu'il reçoit... Je ne suis pas un spécialiste SOAP, mais ces paramètres étant définis dans [le fichier WSDL](http://api.google.com/GoogleSearch.wsdl), il paraîtrait logique que par défaut le web service les prenne tel que définit dans celui-ci, mais ce n'est pas le cas...

 
En tout cas [ce bug a déjà été reporté](http://bugs.php.net/bug.php?id=37523) et même corrigé dans [la version 5.2.0 de PHP](http://fr.php.net/ChangeLog-5.php). Pour en revenir au code, si je veux qu'il fonctionne à nouveau en l'état, il me faut passer à cette nouvelle version.

 
Une dernier truc amusant en passant, mêmes les ingénieurs de chez Google font des fautes de frappe, la preuve dans les entêtes HTTP renvoyées par leur serveur on peut lire :

 ``` 
HTTP/1.1 500 Internal Server Error
Content-Type: text/xml; charset=utf-8
Cache-control: private
Transfer-Encoding: chunked
Date: Tue, 07 Nov 2006 23:19:49 GMT
Server: GFE/1.3
Cneonction: Close
```

