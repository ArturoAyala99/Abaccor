'use strict';

var sass = require('gulp-dart-sass');
const gulp = require('gulp');  
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//al momento de correr el comando gulp, pondré el nombre del task
gulp.task('sass', ()=> //el primer parametro('sass) es el nombre de cómo lo vamos a llamar, puede llamarse distinto, el segundo parametro es la funcionalidad

    //buscará todos los archivos con extension .scss, (tambien le puedo poner el nombre del archivo)
    gulp.src('./sass/*.scss') //aquí se le dice a la tarea en dónde va a buscar los archivos de sass. DEFINIENDO LA RUTA
        
        .pipe(sass().on('error', sass.logError)) //correr el archivo que está en sass/cal.scss 
        .pipe(autoprefixer('last 4 versions'))
        .pipe(cleanCSS({compatibility: 'last 4 versions'}))
        .pipe(gulp.dest('./dist/css')) //mandar lo trabajado a la dirección establecida

);

//task de scripts
gulp.task('js', ()=>

    gulp.src(['./scripts/cal.js', './scripts/index.js']) 
            
        .pipe(concat('cal.js'))
        
        .pipe(gulp.dest('./dist/scripts')) //mandar lo trabajado a la dirección establecida

);