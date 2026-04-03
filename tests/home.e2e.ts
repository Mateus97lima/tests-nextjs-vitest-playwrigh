import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';
import {test, expect, Page } from '@playwright/test';

const HOME_URL = '/';
const HEADING = 'Lista de tarefas';
const INPUT = 'Tarefas ';
const BUTTON = 'Criar tarefa'
const BUTTON_BUSY = 'Criando tarefa...';
const NEW_TODO_TEXT = 'New Todo'

const getHeading = (p: Page) => p.getByRole('heading', {name: HEADING})
const getInput = (p: Page) => p.getByRole('textbox', {name: INPUT})
const getBtn = (p: Page) => p.getByRole('button', {name: BUTTON});
const getBtnBusy = (p: Page) => p.getByRole('button', {name: BUTTON_BUSY});

const getAll = (p: Page) => ({
  heading: getHeading(p),
  input: getInput(p),
  btn: getBtn(p),
  btnBusy: getBtnBusy(p),
})

test.beforeEach(async ({page}) => {
const {deleteTodoNoWhere} = await makeTestTodoRepository();
await deleteTodoNoWhere();

await page.goto(HOME_URL);

});

test.afterAll(async () => {
  const {deleteTodoNoWhere} = await makeTestTodoRepository();
await deleteTodoNoWhere();
})

test.describe('< Home /> (E2E)', () => {

 // Renderização de componente

  test.describe('Renderização de componente', () => {
    test('Deve ter o title html correto', async ({page}) => {
    await expect(page).toHaveTitle('Testes com Vitest e Playwright')
    });
  });

  test('Deve renderizar o cabeçalho, o input e o botão para criar todos', async ({page}) => {

    await expect(getHeading(page)).toBeVisible()
    await expect(getInput(page)).toBeVisible()
    await expect(getBtn(page)).toBeVisible()
  })
})
