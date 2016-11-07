#!/bin/bash

(mongoexport --db mas-tg --collection funcionalidades  --file populate/funcionalidades.json) &
(mongoexport --db mas-tg --collection kanbans  --file populate/kanbans.json) &
(mongoexport --db mas-tg --collection modulos  --file populate/modulos.json) &
(mongoexport --db mas-tg --collection projetos  --file populate/projetos.json) &
(mongoexport --db mas-tg --collection tags  --file populate/tags.json) &
(mongoexport --db mas-tg --collection usuarios  --file populate/usuarios.json) &