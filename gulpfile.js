const { src, dest, parallel, watch, series } = require('gulp'), 
concat = require('gulp-concat'), 
sass = require('gulp-sass'), 
pug = require('gulp-pug'), 
browserSync = require('browser-sync').create()

const FilesPath = {
    sassFiles : 'src/sass/*.scss', 
    jsFiles: 'src/js/*.js', 
    htmlFiles : 'src/pug/pages/*.pug'
};

const { sassFiles, jsFiles, htmlFiles } = FilesPath;


function sassTask() { 
    return src(sassFiles) 
    .pipe(sass()) 
    .pipe(concat('style.css')) 
    .pipe(dest('public/css')) 
    .pipe(browserSync.stream()); 
}

function htmlTask() { 
    return src(htmlFiles) 
    .pipe(pug({ pretty: true })) 
    .pipe(dest('public'))  
    .pipe(browserSync.stream()); 
} 

function jsTask() { 
    return src(jsFiles) 
    .pipe(concat('script.js')) 
    .pipe(dest('public/js')) 
}

function assetsTask() { 
    return src('src/assets/**') .pipe(dest('public/assets')) 
}

function serve() {  
    browserSync.init({ 
        server: { 
            baseDir: 'public',
        } 
    }) 
    watch(sassFiles, sassTask); 
    watch(jsFiles, jsTask); 
    watch(htmlFiles, htmlTask); 
}
    
exports.js = jsTask; 
exports.sass = sassTask; 
exports.html = htmlTask;
exports.assets = assetsTask; 
exports.default = series(parallel(htmlTask, sassTask, jsTask,assetsTask)); 
exports.serve = series(serve, parallel(htmlTask, sassTask, jsTask,assetsTask))
