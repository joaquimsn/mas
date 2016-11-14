#!/bin/bash

(mongoimport --db mas-tg --collection funcionalidades  --file populate/funcionalidades.json) &
(mongoimport --db mas-tg --collection kanbans  --file populate/kanbans.json) &
(mongoimport --db mas-tg --collection modulos  --file populate/modulos.json) &
(mongoimport --db mas-tg --collection projetos  --file populate/projetos.json) &
(mongoimport --db mas-tg --collection tags  --file populate/tags.json) &
(mongoimport --db mas-tg --collection usuarios  --file populate/usuarios.json) &