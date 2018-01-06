const gulp = require('gulp');
const ts = require('gulp-typescript');
const jasmine = require('gulp-jasmine');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const merge = require('merge2');
const initProject = (tsconfigPath) => {
    const tsProject = ts.createProject(tsconfigPath);
    var tsResult = tsProject.src()
    .pipe(tsProject());
    return merge([
        tsResult.dts.pipe(tsProject.config.compilerOptions.outDir),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
}

gulp.task('build', function() {
    const tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src()
    .pipe(tsProject());
    
    const p = tsProject.config.compilerOptions.outDir
    return merge([
        tsResult.dts.pipe(gulp.dest(p)),
        tsResult.js.pipe(gulp.dest(p))
    ]);
});
gulp.task('build:spec', function() {
    const tsProject = ts.createProject('tsconfig.spec.json');
    var tsResult = tsProject.src()
    .pipe(tsProject());
    
    const p = tsProject.config.compilerOptions.outDir
    return merge([
        tsResult.dts.pipe(gulp.dest(p)),
        tsResult.js.pipe(gulp.dest(p))
    ]);
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('test:run', function() {
    return gulp.src('dist/spec/**')
      .pipe(jasmine())
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/*.ts', ['default']);
});

gulp.task('test', [], function(cb) {
  runSequence('clean', 'build:spec', 'test:run', cb);
});

gulp.task('default', [], function(cb) {
    runSequence('clean', 'build', cb);
});
