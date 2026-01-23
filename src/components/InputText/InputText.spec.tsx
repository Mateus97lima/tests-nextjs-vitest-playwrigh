import { render, screen } from "@testing-library/react";
import { InputText, InputTextProps } from ".";
import userEvent from "@testing-library/user-event";
import clsx from "clsx";

type Props =  Partial<InputTextProps>

const makeInput = (p: Props = {}) => {
  return(
  <InputText
  labelText="label"
  placeholder="placeholder"
  type="text"
  disabled={false}
  required={true}
  readOnly={false}
  {...p}/>) // função para facilita a criação de compornentes//
}

const renderInput = (p?: Props ) => {
  const renderResult =  render(makeInput(p));
  const input = screen.getByRole('textbox');
  return { renderResult, input};
};

const input = (p?: Props) => renderInput(p).input;

const classDesabilitado =
(clsx(" disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300 "));

const classReadOnly =
(clsx(" read-only:bg-slate-100 "));

describe('<InputText />', () => {
  describe('comportamento padrão ', () => {
    test('deve renderizar com label ', async () => {

      const el = input({labelText: 'labelOne'})
      expect(el).toBeInTheDocument(); // Verificar se o labelText está sendo renderizado //


    })

    test('deve renderizar com placeholder', async () => {
      const el = input({placeholder: 'placeholdertwo'})
      expect(el).toHaveAttribute('placeholder', 'placeholdertwo')  // Verificar se o placeholder está sendo renderizado //
    })

    test('deve renderizar sem placeholder', async () => {
      const el = input({placeholder: undefined})
      expect(el).not.toHaveAttribute('placeholder') // Verificar se o placeholder não está sendo renderizado //
    })

    test('deve renderizar sem labelText', async () => {
    input({labelText: undefined})
      const label = screen.queryByRole('label');
      expect(label).not.toBeInTheDocument(); // Verificar se o labelText não está sendo renderizado //
    })

    test('deve usar labelText com aria-label quando possivel', async () => {
      expect(input()).toHaveAttribute('aria-label', 'label')
    })

    test('deve usar placeholder como fallback de aria-label', async () => {
      expect(input({labelText: undefined})).toHaveAttribute('aria-label', 'placeholder')
    })

    test('deve exibir com os valores padrão', async () => {
      expect(input({defaultValue: 'default'})).toHaveValue('default')
    })

    test('aceita outras props JSX (name, maxlength)', async () => {
      const el = input({name: 'name', maxLength:10})
      expect(el).toHaveAttribute('name', 'name')
      expect(el).toHaveAttribute('maxlength', '10')
    })
});

describe('accessibilidade', () => {
  test('não exibe mensagem de erro por padrão', async () => {
    const el = input();
    expect(el).toHaveAttribute('aria-invalid', 'false');
    expect(el).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // Verifica se não há mensagem de erro renderizada //
  })

  test('não marca o input como inválido por padrão', async () => {
      const el = input();
    expect(el).toHaveAttribute('aria-invalid', 'false');
  })

  test('renderizar a mensagem de error quando errorMessage for passada', async () => {
    const el = input({errorMessage: 'Tem erro aqui'});
    const error = screen.getByRole('alert')
    const errorId = error.getAttribute('id');
    expect(el).toHaveAttribute('aria-invalid', 'true');
    expect(el).toHaveAttribute('aria-describedby', errorId);
    expect(error).toBeInTheDocument();
  })
});

describe('comportamento interativo', () => {
  test('atualiza o valor conforme o usuário digita', async () => {
    const user = userEvent.setup();
    const el = input();

    await user.type(el, 'hello world'); // Simulando o usuário digitando//
    expect(el).toHaveValue('hello world');
  })
});

describe('comportamentos visuais', () => {
  test('aplica  classes visuais quando desabilitado  ', async () => {
    const el = input({disabled: true});
    expect(el).toHaveClass(classDesabilitado)
  })

  test('aplica  classes visuais quando  readOnly ', async () => {
    const el = input({readOnly: true});
    expect(el).toHaveClass(classReadOnly)
  })

  test('adiciona classes de erro (ring vermelho) quando inválido ', async () => {
    const el = input({errorMessage: 'Erro'});
    expect(el).toHaveClass('ring-red-500 focus:ring-red-700')
  })

  test('mantém classes personalizadas do desenvolvedor ', async () => {
      const el = input({className: 'custom'});
    expect(el).toHaveClass('bg-white')
  })
})
})
