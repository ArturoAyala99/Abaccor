/* 'use strict';

var sass = require('gulp-dart-sass'),
    watch = require('gulp-watch');
const gulp = require('gulp');  
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');

//al momento de correr el comando gulp, pondré el nombre del task
gulp.task('sass', ()=> //el primer parametro('sass) es el nombre de cómo lo vamos a llamar, puede llamarse distinto, el segundo parametro es la funcionalidad
{
    watch(['./sass/*.scss'], function() {
        
        gulp.src('./sass/*.scss') //aquí se le dice a la tarea en dónde va a buscar los archivos de sass. DEFINIENDO LA RUTA
            
            .pipe(sass().on('error', sass.logError)) //correr el archivo que está en sass/cal.scss 
            .pipe(autoprefixer('last 4 versions'))
            .pipe(cleanCSS({compatibility: 'last 4 versions'}))
            
            .pipe(gulp.dest('./dist/css'))
        });

});

//task de scripts
gulp.task('js', ()=>
{
    gulp.src(['./scripts/cal.js', './scripts/index.js']) 

        watch(['./scripts/cal.js', './scripts/index.js'], function() {
        
            gulp.src(['./scripts/cal.js', './scripts/index.js']) //aquí se le dice a la tarea en dónde va a buscar los archivos de sass. DEFINIENDO LA RUTA
                
                .pipe(concat('cal.js')) //junta archivos js en uno solo
                .pipe(babel({
                    presets: ['@babel/env'],//preajuste?
                    plugins: ['@babel/plugin-transform-arrow-functions', //Compila ES2015 funciones flecha a ES5
                        '@babel/plugin-transform-block-scoping',//Compile el alcance del bloque ES2015 (const y let) a ES5
                        '@babel/plugin-transform-classes', //Compilar clases de ES2015 a ES5
                        '@babel/plugin-transform-object-super', //Compilar objeto ES2015 super a ES5
                        '@babel/plugin-transform-template-literals' //Compile los literales de la plantilla ES2015 a ES5
                    ]
                }))
                .pipe(uglify())//pone el código en una sola linea
            
                .pipe(gulp.dest('./dist/scripts')) //mandar lo trabajado a la dirección establecida
            });

});





 */

const { series } = require('gulp');

function function1(cb) {
    console.log("funcion 1");
    cb();
}

function function2(cb) {
    console.log("funcion 2");
    cb();
}

function function3(cb) {
    console.log("funcion 3");
    cb();
}

exports.default = series(compilarSass, compilarJs, watch);
exports.export = series(compilarSass, compilarJs, minificarSass, minificarJs);