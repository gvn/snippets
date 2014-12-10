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
    .pipe(replace('{{ text|safe }}', '<b>Dear Firefox users:</b> Firefox puts the public good and user privacy before profit. If Firefox is useful to you, take one minute to support the non-profit behind it. <em>If everyone reading this donates $3, Mozilla\'s fundraiser would be over within an hour.</em> <i>Thank you.</i>'))
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
