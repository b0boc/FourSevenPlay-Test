var gulp  = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
 

var scssSRC = './src/app/app.component.scss';
var cssFolder = './src/app/css';

gulp.task('scss', function(done) {
  gulp.src(scssSRC)
        .pipe(sass({outputStyle: 'compressed'})) // {outputStyle: 'compressed'} - minify the output
        .on('error', console.error.bind(console) )
        .pipe( rename({ suffix:'.min'}))
        .pipe( gulp.dest( cssFolder ));
        done();
});

gulp.watch('./src/app/app.component.scss', gulp.series(['scss']));
