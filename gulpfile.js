const gulp = require("gulp");
const sass = require("gulp-sass");
const prefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function style(cb) {
  gulp
    .src("./sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(prefixer())
    .pipe(gulp.dest("./css"))
    //stream to Browser
    .pipe(browserSync.stream());
  cb();
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./sass/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.style = gulp.series(style);
exports.watch = watch;
