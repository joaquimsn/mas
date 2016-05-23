#!/bin/bash

(mongoimport -d coletivo-educacao -c classes --file populate/classes.json --drop) &
(mongoimport -d coletivo-educacao -c courses --file populate/courses.json --drop) &
(mongoimport -d coletivo-educacao -c cores --file populate/cores.json --drop) &
(mongoimport -d coletivo-educacao -c news --file populate/news.json --drop) &
(mongoimport -d coletivo-educacao -c categories --file populate/categories.json --drop) &
