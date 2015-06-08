gulp = require "gulp"
less = require "gulp-less"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
gulpif = require "gulp-if"
minCss = require "gulp-minify-css"

gulp.task "dev-less", ->
   gulp.src(["src/less/dataMaker/dataMaker.less"])
   .pipe less()
   .pipe minCss()
   .pipe gulp.dest "dist/css"

gulp.task "dev-jade", ->
   gulp.src "src/jade/dataMaker.jade", {base: "src/jade"}
   .pipe(jade {pretty: true})
   .pipe(gulp.dest "dist/html")