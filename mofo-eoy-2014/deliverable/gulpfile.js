var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// Construct demo html pages
gulp.task('build', function () {
  gulp.src('eoy2-wrapped.html')
    .pipe(rename('eoy2-wrapped-built.html'))
    .pipe(replace('{{ snippet_id }}', '666'))
    .pipe(replace('{{ donationAmountLeft|safe }}', '10'))
    .pipe(replace('{{ donationAmountRight|safe }}', '3'))
    .pipe(replace('{{ donationAmountMiddle|safe }}', '5'))
    .pipe(replace('{{ donationFormURL|safe }}', 'http://example.org'))
    .pipe(replace('{{ text|safe }}', 'Mozilla, the non-profit behind Firefox, relies on grants and donations from people like you. If everyone reading this donates a few dollars, we can be fully funded for another year.'))
    .pipe(replace('{{ highlightColor }}', 'yellow'))
    .pipe(gulp.dest('./'));
})

gulp.task('watch', function () {
  var watcher = gulp.watch(['eoy2-wrapped.html'], ['build']);
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 2014
  });
});

gulp.task('default', ['build', 'connect', 'watch']);
