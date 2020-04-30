const initialData = {
  items: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' }
  },
  columns: {
    topLeft: {
      id: 'topLeft',
      title: 'Top Left',
      itemIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    topRight: {
      id: 'topRight',
      title: 'Top Right',
      itemIds: []
    },
    bottomLeft: {
      id: 'bottomLeft',
      title: 'Bottom Left',
      itemIds: []
    },
    bottomRight: {
      id: 'bottomRight',
      title: 'Bottom Right',
      itemIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
}

export default initialData
