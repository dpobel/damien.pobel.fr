---
title: "Benchmark between eZ Publish 4 and eZ Publish 3.10 with or without a PHP opcode cache"
tags: ez publish, apache, mysql, linux, php, debian, shell, performances
updated: 2010-07-16T08:04:42.000Z
node: "66538"
remoteId: "34473393e5dd4aa89a9ba7206cc4aad6"
published: 2007-12-02T19:36:00+01:00
---

After [2 alphas](/post/ez-publish-4-alpha-1-et-beaucoup-d-autres-choses) and one beta release, [eZ Publish](/tag/ez+publish) 4 rc1 [has been released last week](http://lists.ez.no/pipermail/sdk-public/2007-November/002696.html). I'm trying to upgrade but [I'm facing an encoding problem](http://ez.no/developer/forum/install_configuration/ez_publish_4_upgrade_3_10_0_site_with_a_latin1_database). In the meantime, I made a benchmark between eZ Publish 4rc1 with PHP 5.2.5 and eZ Publish 3.10.0 with PHP 4.4.7 on a Debian Etch system using [the Dotdeb packages](http://dotdeb.org/). I also tested the performances of [APC](http://pecl.php.net/package/APC), [eAccelerator](http://www.eaccelerator.net/) and [XCache](http://xcache.lighttpd.net/) opcode cache modules in those configurations.


## Protocol


I'm using [the recommended configuration for Virtual Host setup of eZ Publish](http://ez.no/doc/ez_publish/technical_manual/3_10/installation/virtual_host_setup/virtual_host_example). I wrote this shell script to test performances of eZ Publish.

``` bash
#! /bin/sh

REQUESTS=100
CONCURRENCY=2
TESTS=5
PAUSE_TESTS=90
URL='http://dev.pwet.fr/blog'
DATA_LOG_DIR=~/tests/results_php4_blog/
CONF_DIR=~/tests/conf
PAUSE_CONF=180

PHP_CONFD=/etc/php4/apache/conf.d/

[ ! -d $DATA_LOG_DIR ] && mkdir -p $DATA_LOG_DIR

for ini in $CONF_DIR/* ; do
    INI_BASE=`basename $ini`
    echo $INI_BASE
    DATA_LOG="$DATA_LOG_DIR/$INI_BASE.dat"
    [ -f $DATA_LOG ]  && rm -f $DATA_LOG
    touch $DATA_LOG
    # active extension
    ln -s $ini $PHP_CONFD/$INI_BASE
    /etc/init.d/apache restart > /dev/null  2>&1 
    sleep 2

    # initialize cache
    wget $URL -O /dev/null > /dev/null 2>&1
    sleep 2

    # tests
    for i in `seq 1 $TESTS` ; do
        echo "  Test $i"
        ab -c $CONCURRENCY -n $REQUESTS $URL | grep 'Requests per' | tr -s ' ' | cut -d ' ' -f 4 >> $DATA_LOG
        sleep $PAUSE_TESTS
    done
    sleep $PAUSE_CONF

    rm -f $PHP_CONFD/$INI_BASE
    /etc/init.d/apache restart
done
```


I've run this shell script with a PHP4 setup (eZ Publish 3.10) and then with a PHP5 setup (eZ Publish 4.0rc1) sharing the same database. The script uses 4 configurations of PHP (no opcode cache, apc, eaccelerator, xcache), for each it makes 5 series of 100 requests with a concurrency of 2 with [ab (Apache Benchmark)](http://pwet.fr/man/linux/administration_systeme/ab) and it logs the mean number of requests per second. There are pauses between tests. I've run those tests on two pages of this site on a dedicated test server, the first one is the [/blog](/) page with view cache et cache-block enabled and the second one is [/man/linux](http://pwet.fr/man/linux) but with no view cache and no cache-block at all in order to see how eZ Publish 4 and 3.10 performs on retrieving its cache or on building a page from scratch. The first one makes 6 SQL queries and uses 2 cache-block and its view cache. The second one, without content related caches, makes about 100 SQL queries an displays about 10 XML blocks and 3 dynamic lists.


## Result with a cached page

<figure class="object-center"><a href="/images/benchmark-ez-publish-4-and-3-10-on-a-cached-page.png">![Benchmark eZ Publish 4 and 3.10 on a cached page](/images//benchmark-ez-publish-4-and-3-10-on-a-cached-page.png)
</a></figure>


Without an opcode cache on cached page, **eZ Publish 4 is about 10% quicker than eZ Publish 3.10** but with an opcode cache system, **the difference is about 50%** ! It's interesting to note that with PHP4, [eAccelerator seems to be the faster yet](/post/eaccelerator-avec-ez-publish), about 10% more than APC or XCache but with PHP5 there's almost no difference (more or less 2%).


## Result with a page without content related cache

<figure class="object-center"><a href="/images/benchmark-ez-publish-4-and-3-10-on-a-page-without-cache.png">![Benchmark eZ Publish 4 and 3.10 on a page without cache](/images//benchmark-ez-publish-4-and-3-10-on-a-page-without-cache.png)
</a></figure>


In this test, without an opcode cache, **eZ Publish 4 is 85% faster than eZ Publish 3.10**. And with an opcode, **eZ Publish 4 using PHP 5.2.5 is about 150% faster than eZ Publish 3.10** !


## Conclusion


No doubt, eZ Publish 4 is really faster than eZ Publish 3.10 and even more with an opcode cache.


I think I'm going to test eZ Publish 4 and 3.10 with apache 1.3 and apache 2.2 and perhaps with different configuration of MySQL 5.0, stay tuned :)

