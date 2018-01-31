#! /usr/bin/env node

const feedUrl = 'https://my.framasoft.org/u/dpobel/?do=rss';

const FeedMe = require('feedme');
const https = require('https');
const dateFormat = require('dateformat');
const striptags = require('striptags');

const offTopicTag = "offtopic";

const argv = require('minimist')(process.argv.slice(2), {
    "string": ['from-date'],
    "boolean": ['help', 'h'],
});

function cleanDescription(description) {
    // strip tags because shaarli autolink description and this does not play
    // well with markdown description
    return striptags(description.split("\n<br>")[0]);
}

function getLang(category) {
    return category.some((element) => element.text === 'fr') ? 'fr' : 'en';
}

function isOffTopic(category) {
    return category.find((element) => element.text === offTopicTag);
}

function getTags(category, lang) {
    return category.map((element) => element.text.replace('-', ' ')).filter((element) => (element !== lang && element !== offTopicTag));
}

function help() {
    console.log(`${__filename} --from-date <date>`);
    console.log(` --from-date <timestamp> (timestamp in second)`);
}

let postContent = '';
let postTags = ['veille'];
let fromDate = parseInt(argv['from-date'], 10);

if ( argv.h || argv.help || isNaN(fromDate) ) {
    help();
    process.exit(isNaN(fromDate) ? 1 : 0);
}

fromDate = fromDate * 1000;

https.get(feedUrl, (res) => {
    const parser = new FeedMe();
    const off = [];

    parser.on('item', (item) => {
        const date = Date.parse(item.pubdate);

        if ( date < fromDate ) {
            return;
        }
        const title = item.title;
        const url = item.link;
        const description = cleanDescription(item.description);
        const lang = getLang(item.category);
        const tags = getTags(item.category, lang);

        if ( isOffTopic(item.category) ) {
            off.push({title, url, description, lang});
            return;
        }
        postContent = `* [${title}](${url}) (${lang})&nbsp;: ${description}\n${postContent}`;
        postTags = [...new Set([...postTags,...tags])];
    });
    parser.on('end', () => {
        console.log('---');
        console.log(`title: "Veille semaine #${dateFormat(new Date(), 'W yyyy')}"`);
        console.log(`tags: ${postTags.join(', ')}`);
        console.log('lang: fr');
        console.log(`published: ${dateFormat(new Date(), 'isoUtcDateTime')}`);
        console.log('---');
        console.log(postContent);
        if ( off.length ) {
            console.log("Et un peu hors-sujet&nbsp;:\n");
            off.map((item) => {
                console.log(`* [${item.title}](${item.url}) (${item.lang})&nbsp;: ${item.description}`);
            });
        }
        console.log("\n(En plus du [flux RSS global](/rss.xml), les billets *veille*");
        console.log("et uniquement ceux là sont listés dans le [flux RSS *veille*](/rss/veille.xml))");
    });
    res.pipe(parser);
}).on('error', () => {
    process.exit(1);
});
