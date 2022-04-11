'use strict';
// Configuracion para gulp
/* const gulp = require('gulp');
const rename = require('gulp-rename'); */

//Configuraciones para el sass
var sass = require('gulp-dart-sass'),
    watch = require('gulp-watch');
const gulp = require('gulp');  
const { series } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
/* const sass = require('gulp-dart-sass');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer'); */


//Configuraciones para JS
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');
/* let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let gutil = require('gulp-util');
const babel = require('gulp-babel'); */

const minifyConfig = {
	css: [
		'src/**/*.scss',
		'!src/**/themes/_deprecated/*.scss',
		'!src/**/vendors/**/*.scss'
	],
	fonts: 'docs/fonts/**/*.*',
	js: [
		'src/lib/materialize/cash.js',
		'src/lib/materialize/component.js',
		'src/lib/materialize/global.js',
		'src/lib/materialize/anime.min.js',
		'src/lib/materialize/collapsible.js',
		'src/lib/materialize/dropdown.js',
		'src/lib/materialize/modal.js',
		'src/lib/materialize/materialbox.js',
		'src/lib/materialize/parallax.js',
		'src/lib/materialize/tabs.js',
		'src/lib/materialize/tooltip.js',
		'src/lib/materialize/waves.js',
		'src/lib/materialize/toasts.js',
		'src/lib/materialize/sidenav.js',
		'src/lib/materialize/scrollspy.js',
		'src/lib/materialize/autocomplete.js',
		'src/lib/materialize/forms.js',
		'src/lib/materialize/slider.js',
		'src/lib/materialize/cards.js',
		'src/lib/materialize/chips.js',
		'src/lib/materialize/pushpin.js',
		'src/lib/materialize/buttons.js',
		'src/lib/materialize/datepicker.js',
		'src/lib/materialize/timepicker.js',
		'src/lib/materialize/characterCounter.js',
		'src/lib/materialize/carousel.js',
		'src/lib/materialize/tapTarget.js',
		'src/lib/materialize/select.js',
		'src/lib/materialize/range.js',


		'src/lib/internal/index.js',
		'src/lib/internal/floating.js',
	],
	output: {
		css:     './dist/',
		fonts:   './dist/fonts/',
		js:      './dist/js/'
	},
	options: {
		includePaths: ['node_modules'],
		outputStyle: 'expanded'
	}
};

// Compile scss Files
 gulp.task('sass', function (cb) {

	
	gulp.src(minifyConfig.css)
		.pipe(sass().on('error', sass.logError)) //correr el archivo que está en sass/cal.scss 
		.pipe(autoprefixer('last 4 versions'))
		.pipe(cleanCSS({compatibility: 'last 4 versions'}))
		.pipe(gulp.dest(minifyConfig.output.css));
	cb();
});
/*
gulp.task('sass-build', function (cb) {
	gulp.src(minifyConfig.css)
		.pipe(sass(minifyConfig.options))
		.pipe(cleanCss())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(autoprefixer())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
		.pipe(gulp.dest(minifyConfig.output.css));
	cb();
});

// Compile fonts Files
gulp.task('fonts', function (cb) {
	gulp.src(minifyConfig.fonts)
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
		.pipe(gulp.dest(minifyConfig.output.fonts));
	cb();
});


// Concatenate JS Files
gulp.task('js', function (cb) {
	gulp.src(minifyConfig.js)
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(concat('abaccor.min.js'))
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
		.pipe(gulp.dest(minifyConfig.output.js));
	cb();
});

gulp.task('js-build', function (cb) {
	gulp.src(minifyConfig.js)
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(concat('abaccor.min.js'))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
		.pipe(gulp.dest(minifyConfig.output.js));
	cb();
});

gulp.task('production', gulp.series('sass-build', 'fonts','js-build', function(cb) {
	const { exec } = require("child_process");
	// exec("rm -rf "+minifyConfig.output.css+"", (error, stdout, stderr) => {
	// 	if (error) { console.log(`error: ${error.message}`); return; }
	// 	if (stderr) { console.log(`stderr: ${stderr}`); return; }
	// 	console.log(`remove folders`);
	// });
	gulp.src(minifyConfig.css, gulp.series('sass-build'));
	gulp.src(minifyConfig.fonts, gulp.series('fonts'));
	gulp.src(minifyConfig.js, gulp.series('js-build'));
	cb();
}));

gulp.task('build', gulp.series('sass-build', 'fonts','js-build', function (cb) {
	gulp.watch(minifyConfig.css, gulp.series('sass-build'));
	gulp.watch(minifyConfig.fonts, gulp.series('fonts'));
	gulp.watch(minifyConfig.js, gulp.series('js-build'));
	cb();
}));

gulp.task('dev', gulp.series('sass', 'fonts','js', function (cb) {
	gulp.watch(minifyConfig.css, gulp.series('sass'));
	gulp.watch(minifyConfig.fonts, gulp.series('fonts'));
	gulp.watch(minifyConfig.js, gulp.series('js')); 
	cb();
}));
 */
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watcher', function() {
    return watch(minifyConfig.css, series(sasss /* javascript */));
})


function sasss(cb) {
    
   /* gulp.src('./sass/*.scss') //aquí se le dice a la tarea en dónde va a buscar los archivos de sass. DEFINIENDO LA RUTA
            
        .pipe(sass().on('error', sass.logError)) //correr el archivo que está en sass/cal.scss 
        .pipe(autoprefixer('last 4 versions'))
        .pipe(cleanCSS({compatibility: 'last 4 versions'}))
            
        .pipe(gulp.dest('./dist/css'))

    cb();
 */
	gulp.src(minifyConfig.css)
		.pipe(sass().on('error', sass.logError)) //correr el archivo que está en sass/cal.scss 
		.pipe(autoprefixer('last 4 versions'))
		.pipe(cleanCSS({compatibility: 'last 4 versions'}))
		.pipe(gulp.dest(minifyConfig.output.css));
	cb();
}

function javascript(cb) {
   
   /*  gulp.src(['./scripts/cal.js', './scripts/index.js']) //aquí se le dice a la tarea en dónde va a buscar los archivos de sass. DEFINIENDO LA RUTA
                
        .pipe(concat('cal.js')) //junta archivos js en uno solo
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())//pone el código en una sola linea
            
        .pipe(gulp.dest('./dist/scripts')) //mandar lo trabajado a la dirección establecida    
   
    cb(); */


	gulp.src(minifyConfig.js)
		.pipe(concat('abaccor.min.js')) //junta archivos js en uno solo
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())//pone el código en una sola linea
			
		.pipe(gulp.dest(minifyConfig.output.js)); //mandar lo trabajado a la dirección establecida  
	cb();
}


/* exports.scripts = scripts; */
exports.default = series(/* javascript ,*/ sasss, 'watcher'); //Aquí se realiza el precompilado y una vez de que se le hagan cambios se irá al task watcher
