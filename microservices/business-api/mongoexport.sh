#!/bin/bash

(mongoexport --db mas-tg --collection funcionalidades  --out populate/funcionalidades.json) &
(mongoexport --db mas-tg --collection kanbans  --out populate/kanbans.json) &
(mongoexport --db mas-tg --collection modulos  --out populate/modulos.json) &
(mongoexport --db mas-tg --collection projetos  --out populate/projetos.json) &
(mongoexport --db mas-tg --collection tags  --out populate/tags.json) &
(mongoexport --db mas-tg --collection usuarios  --out populate/usuarios.json) &