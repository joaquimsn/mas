module.exports = [
  {
    name: 'Kanban - Modulo',
    amountOfSection: 3,
    sections: [
      {
        title: 'Backlog',
        amountOfTasks: '10',
        tasks: [
          {
            name : 'Tarefa 1',
            details: 'Fazer a tarefa 1'
          },
          {
            name : 'Tarefa 2',
            details: 'Desenvolvimento rapido'
          }
        ]
      },
      {
        title: 'Em progresso',
        amountOfTasks: '5',
        tasks: [
          {
            name : 'Tarefa 5',
            details: 'Fazer a tarefa 5'
          }
        ]
      },
      {
        title: 'Finalizada',
        amountOfTasks: '3',
        tasks: [
          {
            name : 'Tarefa 3',
            details: 'Fazer a tarefa 3'
          }
        ]
      }
    ]
  }
];