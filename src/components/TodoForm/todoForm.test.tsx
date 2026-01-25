
import userEvent from "@testing-library/user-event"

const user = userEvent.setup()



describe('<TodoForm /> (integration)', () => {
  test('deve renderizar todos os componentes do formulário', async () => {})

  test('deve chamr a action com os valores corretos', async () => {})

  test('deve cortar espaços em branco do inicio e fim da description (trim) ', async () => {})

  test('deve limpar o input se o form retorna successo', async () => {})

  test('deve desativa o botão enquanto envia action', async () => {})

  test('deve desativa o input enquanto envia action', async () => {})

  test('deve troca o texto do botão enquanto envia action', async () => {})

  test('deve mostra a mensagem de erro se a action falhar', async () =>{})

  test('deve manter a mensagem digitada  se action falha', async () =>{})
})

type RenderForm ={
  delay?: number,
  success?:boolean
}

function renderForm ({delay = 0, success = true}: RenderForm = {}) {
  const actionSuccessResult = {
  success: true,
  todo: {
    id: '1',
    description: 'New Todo',
    createdAt: 'created-At',
  }
  }

    const actionErrorResult = {
  success: false,
  errors: ['Erro ao criar todo']

  }

  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
}

