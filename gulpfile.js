// JS
import concat from "gulp-concat";
import uglify from "gulp-uglify";
// Image
import imagemin from "gulp-imagemin";
// CSSS
import gulp from "gulp";
import sass from "sass";
import gulpsass from "gulp-sass";
import cssnano from "gulp-cssnano";
// webserver
import webserver from "gulp-webserver";
const scss = gulpsass(sass);

gulp.task("sass", function () {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(cssnano())
    .pipe(gulp.dest("app/css"));
});
gulp.task("js", function () {
  return gulp
    .src(["src/js/*.js"])
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});
gulp.task("image", function () {
  return gulp.src(["assets/*"]).pipe(imagemin()).pipe(gulp.dest("app/image"));
});
gulp.task("webserver", () => {
  return gulp.src("app").pipe(
    webserver({
      port: 3000,
      livereload: true,
      open: true,
    })
  );
});
gulp.task("watch", function () {
  gulp.watch("src/scss/*.scss", gulp.series("sass"));
  gulp.watch("src/js/*.js", gulp.series("js"));
});

gulp.task("default", gulp.series("webserver", "image", "watch"));
