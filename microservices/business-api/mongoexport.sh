#!/bin/bash

(mongoexport --db coletivo-educacao --collection classes  --out populate/classes.json) &
(mongoexport --db coletivo-educacao --collection courses  --out populate/courses.json) &
(mongoexport --db coletivo-educacao --collection cores  --out populate/cores.json) &
(mongoexport --db coletivo-educacao --collection news  --out populate/news.json) &
(mongoexport --db coletivo-educacao --collection categories  --out populate/categories.json) &