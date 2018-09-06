#! /usr/bin/env node

const feedUrl = 'https://my.framasoft.org/u/dpobel/?do=rss';

const FeedMe = require('feedme');
const https = require('https');
const dateFormat = require('dateformat');
const striptags = require('striptags');

const offTopicTag = "offtopic";
const veillePhotoNumber = 8;

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
    return category.map((element) => element.text.replace(/-/g, ' ')).filter((element) => (element !== lang && element !== offTopicTag));
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
        if (description) {
            postContent = `* [${title}](${url}) (${lang})&nbsp;: ${description}\n${postContent}`;
        } else {
            postContent = `* [${title}](${url}) (${lang})\n${postContent}`;
        }
        postTags = [...new Set([...postTags,...tags])];
    });
    parser.on('end', () => {
        const date = new Date();
        const photoNr = (Math.floor(Math.random() * Math.floor(veillePhotoNumber + 1)));

        console.log('---');
        console.log(`title: "Veille de la semaine #${dateFormat(date, 'W')} de ${dateFormat(date, 'yyyy')}"`);
        console.log(`tags: ${postTags.join(', ')}`);
        console.log('lang: fr');
        console.log(`published: ${dateFormat(date, 'isoUtcDateTime')}`);
        console.log('photos:');
        console.log(`    - images/veille_${photoNr}.jpg`);
        console.log('---');
        console.log(postContent);
        if ( off.length ) {
            console.log("Et un peu hors-sujet&nbsp;:\n");
            off.map((item) => {
                let desc = '';

                if (item.description) {
                    desc = `&nbsp;: ${item.description}`;
                }
                console.log(`* [${item.title}](${item.url}) (${item.lang})${desc}`);
            });
        }
        console.log("\n(En plus du [flux RSS global](/rss.xml), les billets *veille*");
        console.log("et uniquement ceux là sont listés dans le [flux RSS correspondant](/rss/veille.xml))");
    });
    res.pipe(parser);
}).on('error', () => {
    process.exit(1);
});
