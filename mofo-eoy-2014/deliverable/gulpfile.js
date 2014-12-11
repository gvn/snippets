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
    .pipe(replace('{{ donationFormURL|safe }}', 'https://sendto.mozilla.org/page/contribute/givenow-seq?ref=EOYFR2014&amp;utm_campaign=EOYFR2014&amp;utm_source=firefox&amp;utm_medium=snippet&amp;utm_content=SelectAMT_test2&amp;sample_rate=0.1&amp;snippet_name=4807'))
    .pipe(replace('{{ paypalURL|safe }}', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=44ZHAVWJHTK2N&amp;locale=US&amp;item_name=Mozilla%20Foundation&amp;no_note=1&amp;no_shipping=1&amp;rm=1&amp;custom=20140923%20eoy14%20sequential&amp;currency_code=USD&amp;amount='))
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
