var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var inlinesource = require('gulp-inline-source');

// Inline external CSS and JS for snippet partials
gulp.task('inline', function () {
  var options = {
    compress: true
  };

  return gulp.src('*.partial')
    .pipe(rename(function (path) {
      path.extname = '.html'
    }))
    .pipe(inlinesource(options))
    .pipe(gulp.dest('./build'));
});

// Construct demo html pages
gulp.task('build-pages', ['inline'], function () {
  var builtSnippet = fs.readFileSync('build/snippet.html');
  var builtSnippetAlt = fs.readFileSync('build/snippet-alt.html');
  var builtSnippetDisruptive = fs.readFileSync('build/snippet-disruptive.html');

  function buildPage(snippet, filename) {
    gulp.src('index.template')
      .pipe(rename(filename))
      .pipe(replace('{{ SNIPPET }}', snippet))
      .pipe(gulp.dest('./build/'));
  }

  buildPage(builtSnippet, 'index.html');
  buildPage(builtSnippetAlt, 'index-alt.html');
  buildPage(builtSnippetDisruptive, 'index-disruptive.html');
})

gulp.task('watch', function () {
  var watcher = gulp.watch(['*.partial', '*.template', '*.js', '*.css'], ['build']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 2014
  });
});

gulp.task('build', ['build-pages']);
gulp.task('default', ['build', 'connect', 'watch']);
