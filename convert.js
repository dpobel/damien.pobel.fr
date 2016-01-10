#! /usr/bin/env node

var metalsmith = require('metalsmith');

function getPublishedDate(filePath) {
    var filename = filePath.replace('post/', ''),
        tmp = filename.split('-');

    return tmp[0] + '-' + tmp[1] + '-' + tmp[2];
}

function renameFile(filePath, files, done) {
    var file = files[filePath],
        publishedDate = getPublishedDate(filePath),
        newPath = filePath.replace('post/' + publishedDate + '-', 'post/');

    file.published = publishedDate;
    delete files[filePath];
    if ( files[newPath] ) {
        done(new Error('Name collision on ' + newPath));
    }
    files[newPath] = file;
}

function renameFiles(files, metalsmith, done) {
    Object.keys(files).forEach(function (filePath) {
        if ( filePath.startsWith("post/20") ) {
            renameFile(filePath, files, done);
        }
    });
    done();
}

function metadataToString(data) {
    var str;

    if ( Array.isArray(data) ) {
        return data.join(', ');
    } else if ( data instanceof Date ) {
        return data.toJSON();
    }
    str = data.toString();
    if ( str.match(/^20[01][0-9]/) ) {
        return str;
    }
    return '"' + str.replace(/"/g, '\\"') + '"';
}

function keepMetadata(files, metalsmith, done) {
    var excludeProps = ['contents', 'stats', 'mode'];

    Object.keys(files).forEach(function (filePath) {
        var file = files[filePath],
            line = "---\n";

        if ( filePath.endsWith('.md') || filePath.endsWith('.html') ) {
            Object.keys(file).forEach(function (key) {
                if ( excludeProps.indexOf(key) === -1 ) {
                    line += key + ": " + metadataToString(file[key]) + "\n";
                }
            });
            line += "---\n";
            file.contents = line + file.contents;
        }
    });
    done();
}

metalsmith(__dirname)
    .source('src')
    .use(renameFiles)
    .use(keepMetadata)
    .destination('result')
    .build(function (error, res) {
        if ( error ) {
            console.error("Build failed: " + error.message);
            console.log(error.stack);
            process.exit(1);
        }
        console.log('Build successful:');
        Object.keys(res).forEach(function (key) {
            console.log('- ' + key);
        });
    });
