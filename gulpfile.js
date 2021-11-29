const { src, dest, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist'));
};

function copyCss() {
    return src('./src/style.css').pipe(dest('./dist'));
};

function copyJs() {
    return src('./src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(dest('./dist'));
};

function cleanDist() {
    return src('./dist', { read: false }).pipe(clean());
};

module.exports = {
    build: series(cleanDist, parallel(copyHtml, copyJs, copyCss)),
};