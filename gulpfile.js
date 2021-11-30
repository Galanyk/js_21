const { src, dest, series, parallel, watch } = require('gulp');
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

function createVendorJs() {
    return src(["./node_modules/jquery/dist/jquery.min.js"]).pipe(concat("vendorJs.js")).pipe(dest('./dist'));
};

function watchFiles() {
    return watch(['./src/**/*.js', './src/style.css'], { events: 'all' }, () => {
        copyCss();
        return copyJs();
    });
};

module.exports = {
    build: series(cleanDist, parallel(createVendorJs, copyHtml, copyJs, copyCss)),
    serve: series(cleanDist, parallel(createVendorJs, copyHtml, copyJs, copyCss), watchFiles),
};