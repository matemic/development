let gulp = require('gulp');
let sass = require('gulp-sass');
let plumber = require('gulp-plumber');

/* Creating a task "sass" to compile SCSS -> CSS */

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber()) // using plumber to fix issues with node pipes
    .pipe(sass())
    .pipe(gulp.dest('css/'))
});

/* Creating a task "watch" to track any changes in sass folder */

gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['sass']); 
})
