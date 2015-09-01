/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js').pipe(reload({ stream: true, once: true })).pipe($.jshint()).pipe($.jshint.reporter('jshint-stylish')).pipe($['if'](!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*').pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  }))).pipe(gulp.dest('dist/images')).pipe($.size({ title: 'images' }));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  return gulp.src(['app/*', '!app/*.html', 'node_modules/apache-server-configs/dist/.htaccess'], {
    dot: true
  }).pipe(gulp.dest('dist')).pipe($.size({ title: 'copy' }));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/**']).pipe(gulp.dest('dist/fonts')).pipe($.size({ title: 'fonts' }));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src(['app/styles/*.scss', 'app/styles/**/*.css', 'app/styles/components/components.scss']).pipe($.sourcemaps.init()).pipe($.changed('.tmp/styles', { extension: '.css' })).pipe($.sass({
    precision: 10,
    onError: console.error.bind(console, 'Sass error:')
  })).pipe($.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })).pipe($.sourcemaps.write()).pipe(gulp.dest('.tmp/styles'))
  // Concatenate And Minify Styles
  .pipe($['if']('*.css', $.csso())).pipe(gulp.dest('dist/styles')).pipe($.size({ title: 'styles' }));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({ searchPath: '{.tmp,app}' });

  return gulp.src('app/**/*.html').pipe(assets)
  // Concatenate And Minify JavaScript
  .pipe($['if']('*.js', $.uglify({ preserveComments: 'some' })))
  // Remove Any Unused CSS
  // Note: If not using the Style Guide, you can delete it from
  // the next line to only include styles your project uses.
  .pipe($['if']('*.css', $.uncss({
    html: ['app/index.html', 'app/styleguide.html'],
    // CSS Selectors for UnCSS to ignore
    ignore: [/.navdrawer-container.open/, /.app-bar.open/]
  })))
  // Concatenate And Minify Styles
  // In case you are still using useref build blocks
  .pipe($['if']('*.css', $.csso())).pipe(assets.restore()).pipe($.useref())
  // Update Production Style Guide Paths
  .pipe($.replace('components/components.css', 'components/main.min.css'))
  // Minify Any HTML
  .pipe($['if']('*.html', $.minifyHtml()))
  // Output Files
  .pipe(gulp.dest('dist')).pipe($.size({ title: 'html' }));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], { dot: true }));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist'
  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
});

// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('example.com', {
    strategy: 'mobile'
  }, // By default we use the PageSpeed Insights free (no API key) tier.
  // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
  // key: 'YOUR_API_KEY'
  cb);
});

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Nhbm95Ly5hdG9tL3BhY2thZ2VzL3NldGktc3ludGF4L3NhbXBsZS1maWxlcy9HdWxwZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLFlBQVksQ0FBQzs7O0FBR2IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7QUFDdkMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDMUMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7O0FBRWhDLElBQUkscUJBQXFCLEdBQUcsQ0FDMUIsVUFBVSxFQUNWLGNBQWMsRUFDZCxVQUFVLEVBQ1YsY0FBYyxFQUNkLGFBQWEsRUFDYixhQUFhLEVBQ2IsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixVQUFVLENBQ1gsQ0FBQzs7O0FBR0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWTtBQUM5QixTQUFPLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUNoQixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUN6QyxJQUFJLENBQUMsQ0FBQyxNQUFHLENB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TUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDMUUsQ0FBQyxDQUFDOzs7QUFHSCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRTs7QUFFbkMsV0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7QUFDOUIsWUFBUSxFQUFFLFFBQVE7R0FJbkI7OztBQUFFLElBQUUsQ0FBQyxDQUFDO0NBQ1IsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9ob21lL3Nhbm95Ly5hdG9tL3BhY2thZ2VzL3NldGktc3ludGF4L3NhbXBsZS1maWxlcy9HdWxwZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqICBXZWIgU3RhcnRlciBLaXRcbiAqICBDb3B5cmlnaHQgMjAxNCBHb29nbGUgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHBzOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2VcbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJbmNsdWRlIEd1bHAgJiBUb29scyBXZSdsbCBVc2VcbnZhciBndWxwID0gcmVxdWlyZSgnZ3VscCcpO1xudmFyICQgPSByZXF1aXJlKCdndWxwLWxvYWQtcGx1Z2lucycpKCk7XG52YXIgZGVsID0gcmVxdWlyZSgnZGVsJyk7XG52YXIgcnVuU2VxdWVuY2UgPSByZXF1aXJlKCdydW4tc2VxdWVuY2UnKTtcbnZhciBicm93c2VyU3luYyA9IHJlcXVpcmUoJ2Jyb3dzZXItc3luYycpO1xudmFyIHBhZ2VzcGVlZCA9IHJlcXVpcmUoJ3BzaScpO1xudmFyIHJlbG9hZCA9IGJyb3dzZXJTeW5jLnJlbG9hZDtcblxudmFyIEFVVE9QUkVGSVhFUl9CUk9XU0VSUyA9IFtcbiAgJ2llID49IDEwJyxcbiAgJ2llX21vYiA+PSAxMCcsXG4gICdmZiA+PSAzMCcsXG4gICdjaHJvbWUgPj0gMzQnLFxuICAnc2FmYXJpID49IDcnLFxuICAnb3BlcmEgPj0gMjMnLFxuICAnaW9zID49IDcnLFxuICAnYW5kcm9pZCA+PSA0LjQnLFxuICAnYmIgPj0gMTAnXG5dO1xuXG4vLyBMaW50IEphdmFTY3JpcHRcbmd1bHAudGFzaygnanNoaW50JywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZ3VscC5zcmMoJ2FwcC9zY3JpcHRzLyoqLyouanMnKVxuICAgIC5waXBlKHJlbG9hZCh7c3RyZWFtOiB0cnVlLCBvbmNlOiB0cnVlfSkpXG4gICAgLnBpcGUoJC5qc2hpbnQoKSlcbiAgICAucGlwZSgkLmpzaGludC5yZXBvcnRlcignanNoaW50LXN0eWxpc2gnKSlcbiAgICAucGlwZSgkLmlmKCFicm93c2VyU3luYy5hY3RpdmUsICQuanNoaW50LnJlcG9ydGVyKCdmYWlsJykpKTtcbn0pO1xuXG4vLyBPcHRpbWl6ZSBJbWFnZXNcbmd1bHAudGFzaygnaW1hZ2VzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZ3VscC5zcmMoJ2FwcC9pbWFnZXMvKiovKicpXG4gICAgLnBpcGUoJC5jYWNoZSgkLmltYWdlbWluKHtcbiAgICAgIHByb2dyZXNzaXZlOiB0cnVlLFxuICAgICAgaW50ZXJsYWNlZDogdHJ1ZVxuICAgIH0pKSlcbiAgICAucGlwZShndWxwLmRlc3QoJ2Rpc3QvaW1hZ2VzJykpXG4gICAgLnBpcGUoJC5zaXplKHt0aXRsZTogJ2ltYWdlcyd9KSk7XG59KTtcblxuLy8gQ29weSBBbGwgRmlsZXMgQXQgVGhlIFJvb3QgTGV2ZWwgKGFwcClcbmd1bHAudGFzaygnY29weScsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGd1bHAuc3JjKFtcbiAgICAnYXBwLyonLFxuICAgICchYXBwLyouaHRtbCcsXG4gICAgJ25vZGVfbW9kdWxlcy9hcGFjaGUtc2VydmVyLWNvbmZpZ3MvZGlzdC8uaHRhY2Nlc3MnXG4gIF0sIHtcbiAgICBkb3Q6IHRydWVcbiAgfSkucGlwZShndWxwLmRlc3QoJ2Rpc3QnKSlcbiAgICAucGlwZSgkLnNpemUoe3RpdGxlOiAnY29weSd9KSk7XG59KTtcblxuLy8gQ29weSBXZWIgRm9udHMgVG8gRGlzdFxuZ3VscC50YXNrKCdmb250cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGd1bHAuc3JjKFsnYXBwL2ZvbnRzLyoqJ10pXG4gICAgLnBpcGUoZ3VscC5kZXN0KCdkaXN0L2ZvbnRzJykpXG4gICAgLnBpcGUoJC5zaXplKHt0aXRsZTogJ2ZvbnRzJ30pKTtcbn0pO1xuXG4vLyBDb21waWxlIGFuZCBBdXRvbWF0aWNhbGx5IFByZWZpeCBTdHlsZXNoZWV0c1xuZ3VscC50YXNrKCdzdHlsZXMnLCBmdW5jdGlvbiAoKSB7XG4gIC8vIEZvciBiZXN0IHBlcmZvcm1hbmNlLCBkb24ndCBhZGQgU2FzcyBwYXJ0aWFscyB0byBgZ3VscC5zcmNgXG4gIHJldHVybiBndWxwLnNyYyhbXG4gICAgJ2FwcC9zdHlsZXMvKi5zY3NzJyxcbiAgICAnYXBwL3N0eWxlcy8qKi8qLmNzcycsXG4gICAgJ2FwcC9zdHlsZXMvY29tcG9uZW50cy9jb21wb25lbnRzLnNjc3MnXG4gIF0pXG4gICAgLnBpcGUoJC5zb3VyY2VtYXBzLmluaXQoKSlcbiAgICAucGlwZSgkLmNoYW5nZWQoJy50bXAvc3R5bGVzJywge2V4dGVuc2lvbjogJy5jc3MnfSkpXG4gICAgLnBpcGUoJC5zYXNzKHtcbiAgICAgIHByZWNpc2lvbjogMTAsXG4gICAgICBvbkVycm9yOiBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSwgJ1Nhc3MgZXJyb3I6JylcbiAgICB9KSlcbiAgICAucGlwZSgkLmF1dG9wcmVmaXhlcih7YnJvd3NlcnM6IEFVVE9QUkVGSVhFUl9CUk9XU0VSU30pKVxuICAgIC5waXBlKCQuc291cmNlbWFwcy53cml0ZSgpKVxuICAgIC5waXBlKGd1bHAuZGVzdCgnLnRtcC9zdHlsZXMnKSlcbiAgICAvLyBDb25jYXRlbmF0ZSBBbmQgTWluaWZ5IFN0eWxlc1xuICAgIC5waXBlKCQuaWYoJyouY3NzJywgJC5jc3NvKCkpKVxuICAgIC5waXBlKGd1bHAuZGVzdCgnZGlzdC9zdHlsZXMnKSlcbiAgICAucGlwZSgkLnNpemUoe3RpdGxlOiAnc3R5bGVzJ30pKTtcbn0pO1xuXG4vLyBTY2FuIFlvdXIgSFRNTCBGb3IgQXNzZXRzICYgT3B0aW1pemUgVGhlbVxuZ3VscC50YXNrKCdodG1sJywgZnVuY3Rpb24gKCkge1xuICB2YXIgYXNzZXRzID0gJC51c2VyZWYuYXNzZXRzKHtzZWFyY2hQYXRoOiAney50bXAsYXBwfSd9KTtcblxuICByZXR1cm4gZ3VscC5zcmMoJ2FwcC8qKi8qLmh0bWwnKVxuICAgIC5waXBlKGFzc2V0cylcbiAgICAvLyBDb25jYXRlbmF0ZSBBbmQgTWluaWZ5IEphdmFTY3JpcHRcbiAgICAucGlwZSgkLmlmKCcqLmpzJywgJC51Z2xpZnkoe3ByZXNlcnZlQ29tbWVudHM6ICdzb21lJ30pKSlcbiAgICAvLyBSZW1vdmUgQW55IFVudXNlZCBDU1NcbiAgICAvLyBOb3RlOiBJZiBub3QgdXNpbmcgdGhlIFN0eWxlIEd1aWRlLCB5b3UgY2FuIGRlbGV0ZSBpdCBmcm9tXG4gICAgLy8gdGhlIG5leHQgbGluZSB0byBvbmx5IGluY2x1ZGUgc3R5bGVzIHlvdXIgcHJvamVjdCB1c2VzLlxuICAgIC5waXBlKCQuaWYoJyouY3NzJywgJC51bmNzcyh7XG4gICAgICBodG1sOiBbXG4gICAgICAgICdhcHAvaW5kZXguaHRtbCcsXG4gICAgICAgICdhcHAvc3R5bGVndWlkZS5odG1sJ1xuICAgICAgXSxcbiAgICAgIC8vIENTUyBTZWxlY3RvcnMgZm9yIFVuQ1NTIHRvIGlnbm9yZVxuICAgICAgaWdub3JlOiBbXG4gICAgICAgIC8ubmF2ZHJhd2VyLWNvbnRhaW5lci5vcGVuLyxcbiAgICAgICAgLy5hcHAtYmFyLm9wZW4vXG4gICAgICBdXG4gICAgfSkpKVxuICAgIC8vIENvbmNhdGVuYXRlIEFuZCBNaW5pZnkgU3R5bGVzXG4gICAgLy8gSW4gY2FzZSB5b3UgYXJlIHN0aWxsIHVzaW5nIHVzZXJlZiBidWlsZCBibG9ja3NcbiAgICAucGlwZSgkLmlmKCcqLmNzcycsICQuY3NzbygpKSlcbiAgICAucGlwZShhc3NldHMucmVzdG9yZSgpKVxuICAgIC5waXBlKCQudXNlcmVmKCkpXG4gICAgLy8gVXBkYXRlIFByb2R1Y3Rpb24gU3R5bGUgR3VpZGUgUGF0aHNcbiAgICAucGlwZSgkLnJlcGxhY2UoJ2NvbXBvbmVudHMvY29tcG9uZW50cy5jc3MnLCAnY29tcG9uZW50cy9tYWluLm1pbi5jc3MnKSlcbiAgICAvLyBNaW5pZnkgQW55IEhUTUxcbiAgICAucGlwZSgkLmlmKCcqLmh0bWwnLCAkLm1pbmlmeUh0bWwoKSkpXG4gICAgLy8gT3V0cHV0IEZpbGVzXG4gICAgLnBpcGUoZ3VscC5kZXN0KCdkaXN0JykpXG4gICAgLnBpcGUoJC5zaXplKHt0aXRsZTogJ2h0bWwnfSkpO1xufSk7XG5cbi8vIENsZWFuIE91dHB1dCBEaXJlY3Rvcnlcbmd1bHAudGFzaygnY2xlYW4nLCBkZWwuYmluZChudWxsLCBbJy50bXAnLCAnZGlzdC8qJywgJyFkaXN0Ly5naXQnXSwge2RvdDogdHJ1ZX0pKTtcblxuLy8gV2F0Y2ggRmlsZXMgRm9yIENoYW5nZXMgJiBSZWxvYWRcbmd1bHAudGFzaygnc2VydmUnLCBbJ3N0eWxlcyddLCBmdW5jdGlvbiAoKSB7XG4gIGJyb3dzZXJTeW5jKHtcbiAgICBub3RpZnk6IGZhbHNlLFxuICAgIC8vIEN1c3RvbWl6ZSB0aGUgQnJvd3NlclN5bmMgY29uc29sZSBsb2dnaW5nIHByZWZpeFxuICAgIGxvZ1ByZWZpeDogJ1dTSycsXG4gICAgLy8gUnVuIGFzIGFuIGh0dHBzIGJ5IHVuY29tbWVudGluZyAnaHR0cHM6IHRydWUnXG4gICAgLy8gTm90ZTogdGhpcyB1c2VzIGFuIHVuc2lnbmVkIGNlcnRpZmljYXRlIHdoaWNoIG9uIGZpcnN0IGFjY2Vzc1xuICAgIC8vICAgICAgIHdpbGwgcHJlc2VudCBhIGNlcnRpZmljYXRlIHdhcm5pbmcgaW4gdGhlIGJyb3dzZXIuXG4gICAgLy8gaHR0cHM6IHRydWUsXG4gICAgc2VydmVyOiBbJy50bXAnLCAnYXBwJ11cbiAgfSk7XG5cbiAgZ3VscC53YXRjaChbJ2FwcC8qKi8qLmh0bWwnXSwgcmVsb2FkKTtcbiAgZ3VscC53YXRjaChbJ2FwcC9zdHlsZXMvKiovKi57c2Nzcyxjc3N9J10sIFsnc3R5bGVzJywgcmVsb2FkXSk7XG4gIGd1bHAud2F0Y2goWydhcHAvc2NyaXB0cy8qKi8qLmpzJ10sIFsnanNoaW50J10pO1xuICBndWxwLndhdGNoKFsnYXBwL2ltYWdlcy8qKi8qJ10sIHJlbG9hZCk7XG59KTtcblxuLy8gQnVpbGQgYW5kIHNlcnZlIHRoZSBvdXRwdXQgZnJvbSB0aGUgZGlzdCBidWlsZFxuZ3VscC50YXNrKCdzZXJ2ZTpkaXN0JywgWydkZWZhdWx0J10sIGZ1bmN0aW9uICgpIHtcbiAgYnJvd3NlclN5bmMoe1xuICAgIG5vdGlmeTogZmFsc2UsXG4gICAgbG9nUHJlZml4OiAnV1NLJyxcbiAgICAvLyBSdW4gYXMgYW4gaHR0cHMgYnkgdW5jb21tZW50aW5nICdodHRwczogdHJ1ZSdcbiAgICAvLyBOb3RlOiB0aGlzIHVzZXMgYW4gdW5zaWduZWQgY2VydGlmaWNhdGUgd2hpY2ggb24gZmlyc3QgYWNjZXNzXG4gICAgLy8gICAgICAgd2lsbCBwcmVzZW50IGEgY2VydGlmaWNhdGUgd2FybmluZyBpbiB0aGUgYnJvd3Nlci5cbiAgICAvLyBodHRwczogdHJ1ZSxcbiAgICBzZXJ2ZXI6ICdkaXN0J1xuICB9KTtcbn0pO1xuXG4vLyBCdWlsZCBQcm9kdWN0aW9uIEZpbGVzLCB0aGUgRGVmYXVsdCBUYXNrXG5ndWxwLnRhc2soJ2RlZmF1bHQnLCBbJ2NsZWFuJ10sIGZ1bmN0aW9uIChjYikge1xuICBydW5TZXF1ZW5jZSgnc3R5bGVzJywgWydqc2hpbnQnLCAnaHRtbCcsICdpbWFnZXMnLCAnZm9udHMnLCAnY29weSddLCBjYik7XG59KTtcblxuLy8gUnVuIFBhZ2VTcGVlZCBJbnNpZ2h0c1xuZ3VscC50YXNrKCdwYWdlc3BlZWQnLCBmdW5jdGlvbiAoY2IpIHtcbiAgLy8gVXBkYXRlIHRoZSBiZWxvdyBVUkwgdG8gdGhlIHB1YmxpYyBVUkwgb2YgeW91ciBzaXRlXG4gIHBhZ2VzcGVlZC5vdXRwdXQoJ2V4YW1wbGUuY29tJywge1xuICAgIHN0cmF0ZWd5OiAnbW9iaWxlJyxcbiAgICAvLyBCeSBkZWZhdWx0IHdlIHVzZSB0aGUgUGFnZVNwZWVkIEluc2lnaHRzIGZyZWUgKG5vIEFQSSBrZXkpIHRpZXIuXG4gICAgLy8gVXNlIGEgR29vZ2xlIERldmVsb3BlciBBUEkga2V5IGlmIHlvdSBoYXZlIG9uZTogaHR0cDovL2dvby5nbC9Sa04wdkVcbiAgICAvLyBrZXk6ICdZT1VSX0FQSV9LRVknXG4gIH0sIGNiKTtcbn0pO1xuXG4vLyBMb2FkIGN1c3RvbSB0YXNrcyBmcm9tIHRoZSBgdGFza3NgIGRpcmVjdG9yeVxuLy8gdHJ5IHsgcmVxdWlyZSgncmVxdWlyZS1kaXInKSgndGFza3MnKTsgfSBjYXRjaCAoZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgfVxuIl19