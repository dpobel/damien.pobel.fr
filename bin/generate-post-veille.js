#! /usr/bin/env node

const feedUrl = 'https://my.framasoft.org/u/dpobel/?do=rss';

const FeedMe = require('feedme');
const https = require('https');
const dateFormat = require('dateformat');
const striptags = require('striptags');

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

function getTags(category, lang) {
    return category.map((element) => element.text.replace('-', ' ')).filter((element) => (element !== lang));
}

function help() {
    console.log(`${__filename} --from-date <date>`);
    console.log(` --from-date <timestamp>`);
}

let postContent = '';
let postTags = ['veille'];
let fromDate = parseInt(argv['from-date'], 10);

if ( argv.h || argv.help || isNaN(fromDate) ) {
    help();
    process.exit(isNaN(fromDate) ? 1 : 0);
}

https.get(feedUrl, (res) => {
    const parser = new FeedMe();

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
    });
    res.pipe(parser);
}).on('error', () => {
    process.exit(1);
});
