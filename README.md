# MAS - Management Agile System

TCC - Ciência da computação na USJT 

## Frase de Negócio
Ferramenta web para gestão de projetos, baseada em metodologias ágeis, e com estrutura para projetos modulares e integração com o GitHub.

## Problema
Quem vivencia o “mundo de projetos”, sabe que é fato, que o ambiente de desenvolvimento de software está mudando. Onde os projetos estão cada vez mais complexos, com clientes mais exigentes solicitando várias mudanças durante o desenvolvimento, e com prazos ainda mais curtos.
E no mercado atual, as ferramentas existentes ou são muito simples (cheias de limitações de requisitos e funcionalidades), ou muito complexas (com muitos recursos não utilizados, que dificulta o uso), além da inflexibilidade. Onde há a necessidade do projeto se adaptar ao estilo da ferramenta, e não uma ferramenta que se adapta ao projeto.

## Proposta de Solução de Negócio
Visto o cenário atual, como solução, desenvolvemos uma ferramenta para gestão de projetos, com uma proposta de ter: um ambiente fácil de usar e entender, recursos e funções mais utilizadas, uma estrutura que permite a flexibilidade para lidar com projetos diversos, e ampla visão do andamento do projeto.
Além do seu diferencial, por trazer as melhores funções da metodologia ágil, possibilidade de lidar com projetos modulares de forma eficiente, e sua integração com o GitHub.

<img alt="Banner de apresentação" src="https://github.com/joaquimsn/mas/raw/master/docs/banner.png">

# Desenvolvimento do Software 
##		Objetivo do Projeto
O MAS é uma plataforma desenvolvida para apoiar o gerenciamento de projetos ágeis em todas as suas etapas, desde o levantamento de requisitos até a entrega.
Possibilita melhor controle e visão do projeto de maneira centralizada e simples, proporcionando geração de métricas e indicadores de desempenho do projeto.
O conceito principal da plataforma é a criação do fluxo de gestão dos projetos apoiado pelos quadros kanban, de maneira integrada ao GitHub.
##	DETALHAMENTO DO ESCOPO (DESCRIÇÃO DETALHADA DO PROJETO A SER DESENVOLVIDO SOB O PONTO DE VISTA FUNCIONAL)
A adoção de práticas ágeis em gestão de projetos cresceu de maneira surpreendente nos últimos anos. Existem diversas ferramentas para se trabalhar com isso, porém, muitas vezes, estas ferramentas são difíceis de usar ou configurar, possuem alto custo, são inflexíveis e descentralizadas. Sabendo disso, pensamos em uma solução que busca englobar as funcionalidades necessárias para gestão ágil em uma única plataforma.

## Tais as principais funcionalidades:
*1 -*	Quadro kanban 
Quadro dinâmico, onde é possível criar livremente N colunas, e atribuir N tarefas a cada uma. As tarefas podem ser arrastadas de uma coluna para outra, conforme seu andamento no projeto. Por exemplo: foi criado duas colunas “Pendente” e “Em desenvolvimento”, e a tarefa “Cadastrar Livro” na coluna “Pendente”; João irá desenvolver a tarefa “Cadastrar Livro”, e arrasta ela para a coluna “Em Desenvolvimento”.
Inicialmente o quadro inicia com duas colunas: “To Do” (a fazer) e “Done” (feito), sendo que a coluna “Done” não tem como ser excluída, pois será usada para cálculos no sistema, para determinar o andamento do projeto, gerando os indicadores de desempenho.  
Terá um kanban para cada módulo do projeto.

*2 -*	Fechamento automático de tarefas através do Github 
Ao usuário realizar um commit no github, referente a uma tarefa do kanban, o sistema irá verificar automaticamente que aquela tarefa foi finalizada através desse commit, e atualizará o quadro kanban automaticamente. Por exemplo: uma tarefa que estava na seção do kanban “Em desenvolvimento”, será atualizado para “Done” (feito/ concluído.)


*3 -*	Gestão modular do projeto com N projetos simultâneos
No MAS é possível “quebrar” o projeto em pequenas partes, ou pequenos sub projetos, onde o sistema é capaz de gerir esses sub projetos, englobados no projeto maior. Assim, a gestão de módulos do projeto é feita de forma simultânea, onde as tarefas de cada sub projeto, podem ser atualizadas paralelemente.

*4 -*	Gráfico de Burndown
No gráfico Burndown, além de calcular o andamento do projeto, demonstrando o andamento esperado (o que foi definido na criação do projeto), e real (as margens de “atrasado” ou “adiantado”). É possível filtrar o tipo de gráfico, para visualizar: por dia, por semana e por tarefa.

*5 -*	Atribuição da dificuldade nas tarefas
Para cada tarefa, haverá um campo para atribuir uma “nota” (de 0 a 5 por exemplo), referente ao grau de dificuldade do seu desenvolvimento.
*Em implementações futuras para o MAS, será desenvolvido um aplicativo Planning Poker, onde, “conversando” com o sistema, os integrantes do projeto poderão votar, e chegar a um valor/média real do grau de dificuldade da tarefa.

*6 -*	Controle de equipe utilizando permissões
O usuário criador do projeto, atribui a cada integrante da sua equipe, quais permissões cada um vai ter no projeto, referente as funcionalidades do sistema. Por exemplo: acesso ao gráfico burndown, acesso a exclusão de tarefa, acesso a criação de módulo, e etc. 

*7 -*	Anexo de qualquer tipo de mídia
No MAS é possível anexar qualquer tipo de mídia na tarefa. Agregando em todos os projetos onde há a necessidade de guardar mais informações externas, com a versatilidade de suportar vários tipos.

##	Justificativa da Escolha do Tema
Na hora de escolher o tema, foi levado em consideração a construção de uma ferramenta útil no dia a dia para profissionais da nossa área (tecnologia), e que englobava conceitos estudados nas matérias do curso (Ciências da Computação, matérias: gestão de projetos, engenharia de software). 

A documentação completa do projeto pode ser acessada [clicando aqui](https://github.com/joaquimsn/mas/raw/master/docs/Trabalho.pdf).
