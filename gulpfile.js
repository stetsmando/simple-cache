const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const OUTPUT_DIR = 'dist';

gulp.task('babel', (done) =>
  gulp.src('src/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename('simple-cache.js'))
    .pipe(gulp.dest(OUTPUT_DIR))
    .pipe(uglify())
    .pipe(rename('simple-cache.min.js'))
    .pipe(gulp.dest(OUTPUT_DIR))
    .on('end', () => {
      done();
    })
);

gulp.task('add-comment', (done) => {
  gulp.src([ 'src/comment.txt', 'dist/simple-cache.js' ])
    .pipe(concat('simple-cache.js'))
    .pipe(gulp.dest(OUTPUT_DIR))
    .on('end', () => {
      gulp.src([ 'src/comment.txt', 'dist/simple-cache.min.js' ])
        .pipe(concat('simple-cache.min.js'))
        .pipe(gulp.dest(OUTPUT_DIR))
        .on('end', () => {
          done();
        })
    })
});

gulp.task('deps', (done) => {
  gulp.src(['src/lib/*.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(OUTPUT_DIR + '/lib'))
    .on('end', () => done())
});

gulp.task('default', gulp.series('babel', 'add-comment', 'deps', (done) => {
  done();
}));
