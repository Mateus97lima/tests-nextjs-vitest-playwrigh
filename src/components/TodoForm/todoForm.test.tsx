
import userEvent from "@testing-library/user-event"

import { TodoForm } from "."
import { render, screen, waitFor } from "@testing-library/react"

const user = userEvent.setup()



describe('<TodoForm /> (integration)', () => {
  test('deve renderizar todos os componentes do formulário', async () => {
    const {btn, input} = renderForm();

    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  })

  test('deve chamr a action com os valores corretos', async () => {
    const {btn, input, action} = renderForm();
    await user.type(input, 'New Todo'); // usando o userEvent para digita no input//
    await user.click(btn); // usando o userEvent para clicar no botão//

    expect(action).toHaveBeenCalledWith('New Todo'); // usando ToHaveBeenCalledWith para verificar se a ação foi chamada com o valor correto//

  })

  test('deve cortar espaços em branco do inicio e fim da description (trim) ', async () => {
    const {btn, input, action} = renderForm();
    await user.type(input, '    New Todo    '); // usando o userEvent para digita no input//
    await user.click(btn); // usando o userEvent para clicar no botão//

    expect(action).toHaveBeenCalledWith('New Todo'); // usando ToHaveBeenCalledWith para verificar se a ação foi chamada com o valor correto//

  })


  test('deve limpar o input se o form retorna successo', async () => {
      const {btn, input} = renderForm();
      await user.type(input, 'New Todo');
      await user.click(btn);

    expect(input).toHaveValue(''); //verifica se o input está vazio//
  })

  test('deve desativa o botão enquanto envia action', async () => {
      const {btn, input,} = renderForm({delay: 10}); // adiciona um delay para simular o envio//
      await user.type(input, 'New Todo');
      await user.click(btn);

      await waitFor(() => expect(btn).toBeDisabled())//verifica se o botão está desativado//
      await waitFor(() => expect(btn).toBeEnabled());//verifica se o botão está ativado//
  })

  test('deve desativa o input enquanto envia action', async () => {
    const {btn, input,} = renderForm({delay: 12}); // adiciona um delay para simular o envio//
    await user.type(input, 'New Todo');
    await user.click(btn);

    await waitFor(() => expect(input).toBeDisabled()); //verifica se o input está desativado//
    await waitFor(() => expect(input).toBeEnabled());//verifica se o input está ativado//
  })

  test('deve troca o texto do botão enquanto envia action', async () => {
    const { btn, input } = renderForm({ delay: 5 });
    await user.type(input, 'tarefa');
    await user.click(btn);


    await waitFor(() => expect(btn).toHaveAccessibleName('Criar tarefa')); //verifica se o texto do botão mudou//
  })

  test('deve mostra a mensagem de erro se a action falhar', async () =>{
    const {btn, input,} = renderForm({success: false});
    await user.type(input, 'New Todo');
    await user.click(btn);

    const errorMessage = await screen.findByRole('alert'); //pega a mensagem de erro//

    expect(errorMessage).toHaveTextContent('Erro ao criar todo'); //verifica se a mensagem de erro está correta//
    expect(input).toHaveAttribute('aria-describedby', errorMessage.id); //verifica se o input está associado a mensagem de erro//
  })

  test('deve manter a mensagem digitada  se action falha', async () =>{
    const {btn, input} = renderForm({success: false});
    await user.type(input, 'New Todo');
    await user.click(btn);

    expect(input).toHaveValue('New Todo');//verifica se o input mantém o valor digitado//
  })
})


type RenderForm ={ //tipo para configurar a renderização do formulário
  delay?: number,
  success?:boolean
}

function renderForm ({delay = 0, success = true}: RenderForm = {}) {  //função para renderizar o formulário com diferentes configurações de teste
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

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult); //ação sem delay
const actionDelayed = vi.fn().mockImplementation( async() => { //ação com delay
 await new Promise((r => setTimeout(r, delay))); //simulação de delay
 return actionResult;
});
 const action = delay > 0 ? actionDelayed : actionNoDelay; //Se houver delay (> 0), usa a action com delay; caso contrário, sem delay


render(<TodoForm action={action} />);

 const input = screen.getByLabelText('Tarefas'); //pega o input do formulário
const btn = screen.getByRole('button'); //pega o botão do formulário

return {
  action,
  input,
  btn
}
}

