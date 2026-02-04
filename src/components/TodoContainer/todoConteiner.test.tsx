import { render, screen, within } from "@testing-library/react"
import { TodoContainer } from "."
import { insertTestTodos, makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";

describe("< TodoContainer /> (integration" , () => {

    beforeEach(async () => {
      const { deleteTodoNoWhere } = await makeTestTodoRepository();
      await deleteTodoNoWhere();
      await insertTestTodos();
    });

    afterAll(async () => {
      const { deleteTodoNoWhere } = await makeTestTodoRepository();
      await deleteTodoNoWhere();
    });

  test('deve renderizar todoList e a todoForm' , async () => {
  render(await TodoContainer())

  const heandingAccessibleName = 'Lista de tarefas'
  const heanding = screen.getByRole('heading',{name: heandingAccessibleName})
  const list = screen.getByRole("list", {name: heandingAccessibleName})
  const listItems = within(list).getAllByRole('listitem')
  const input = screen.getByLabelText('Tarefas')
  const btn = screen.getByRole('button', {name: 'Criar tarefa'})

expect(heanding).toHaveTextContent(heandingAccessibleName)
expect(list).toHaveAttribute('aria-labelledby', heanding.id)
expect(listItems).toHaveLength(5);
expect(input).toHaveAttribute('placeholder', 'Digite sua Tarefa...');
expect(btn).toHaveAttribute('type', 'submit')

  })
})
