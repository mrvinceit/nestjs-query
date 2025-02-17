import { Connection } from 'typeorm'

import { executeTruncate } from '../../../examples/helpers'
import { TodoItemEntity } from '../src/todo-item/todo-item.entity'

const tables = ['todo_item']
export const truncate = async (connection: Connection): Promise<void> => executeTruncate(connection, tables)

export const refresh = async (connection: Connection): Promise<void> => {
  await truncate(connection)

  const todoRepo = connection.getRepository(TodoItemEntity)
  await todoRepo.save([
    { title: 'Create Nest App', completed: true },
    { title: 'Create Entity', completed: false },
    { title: 'Create Entity Service', completed: false },
    { title: 'Add Todo Item Resolver', completed: false },
    { title: 'How to create item With Sub Tasks', completed: false }
  ])
}
