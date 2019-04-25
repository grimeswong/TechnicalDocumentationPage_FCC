/*
 * This is an gulp configuration file that setup tasks for automatically run
 * By convention, a default task(s) should be set with a 'default' keyword
 *
 **/

const { src, dest, watch, parallel, series} = require('gulp');  // plugin for task runner
const imagemin = require('gulp-imagemin');  // plugin for minify images
const cleancss = require('gulp-clean-css'); // plugin for minify css
const htmlmin = require('gulp-htmlmin'); // plugin for minify HTML
const autoprefixer = require('gulp-autoprefixer');  // plugin for prefix css
const sass = require('gulp-sass');  // plugin for convert sass/scss to css
const browsersync = require('browser-sync').create(); // plugin for live css reload & browser syncing
const rename = require('gulp-rename');  // plugin for rename the processed files
const uglify = require('gulp-uglify'); // plugin for minify javascript
const concat = require('gulp-concat'); // plugin for concate files
const sourcemaps = require('gulp-sourcemaps'); // plugin for getting the original codes for debugging

/*** Source and destination folders ***/
const srcImg = 'src/img/**/*';  // ** (wildcard) means include all file in current folders and its subfolders
const destImg = 'public/img';
const srcCss = 'src/css/**/*.css';
const srcScss = "src/css/**/style.scss";
const destCss = 'public/css';
const srcHtml = 'src/index.html';
const destHtml = 'public/';
const srcJs = 'src/js/**/*';
const destJs = 'public/js';


function compressimg() {
  return src(srcImg)
    .pipe(imagemin())
    .pipe(dest(destImg))
}

function compresscss() {
  return src(srcCss)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleancss({compatibility: 'ie8'}))   /* option for making compatibable with IE8 */
    .pipe(sourcemaps.write())
    .pipe(dest(destCss))
}

function convertsasstocss() {
  return src(srcScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: ".min"}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleancss({compatibility: 'ie8'}))   /* option for making compatibable with IE8 */
    .pipe(sourcemaps.write())
    .pipe(dest(destCss))
    .pipe(browsersync.stream());
}

function compresshtml() {
  return src(srcHtml)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(destHtml))
    .pipe(browsersync.stream());
}

function compressjs() {
  return src(srcJs)
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(concat('bundle.js'))  // bundle all the javascript files
  .pipe(sourcemaps.write())
  .pipe(dest(destJs))
  .pipe(browsersync.stream());
}

function watchchange() {
  watch([srcScss], convertsasstocss)
  .on('change', (path, stats) => {
    console.log(`Scss files in ${path} are converting to css file ...`);
  });
  watch([srcHtml], compresshtml)
  .on('change', (path, stats) => {
    console.log(`HTML files in ${path} are minifying ...`);
  });
  watch([srcJs], compressjs)
  .on('change', (path, stats) => {
    console.log(`Javascript files in ${path} are minifying ...`);
  });
}

/**
 *  Purpose: This function for reloading the webpage without manualy refresh the browser
 **/
function livereload() {
  browsersync.init({
    server: {
      baseDir: "./public"
    }
  });
}

exports.compressimg = compressimg;  // The name of the tasks runner and export it
exports.compresscss = compresscss;
exports.compresshtml = compresshtml;
exports.compressjs = compressjs;
exports.convertsasstocss = convertsasstocss;
exports.watchchange = watchchange;
exports.livereload = livereload;

/* series() - Combines task functions and/or composed operations into larger operations that will be executed one after another, in sequential order.
 * parallel() - Combines task functions and/or composed operations into larger operations that will be executed simultaneously.
 *
 **/

exports.build = series(parallel(compressimg, convertsasstocss, compressjs), compresshtml);
exports.watch = series(parallel(compressimg, convertsasstocss, compressjs), compresshtml ,parallel(watchchange, livereload));  // A watch task for tracking the change of html and css files
exports.default = series(watchchange, compressimg);  // Defined a default tasks for executing one after another by using the function "series"
