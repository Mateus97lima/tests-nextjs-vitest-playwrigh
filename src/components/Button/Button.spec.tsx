import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

const VARIANT_DEFAULT_CLASSES =
  'bg-blue-600 hover:bg-blue-700 text-blue-100'
const VARIANT_DANGER_CLASSES =
  'bg-red-600 hover:bg-red-700 text-red-100'
const VARIANT_GHOST_CLASSES =
  'bg-slate-300 hover:bg-slate-400 text-slate-950'

const DISABLED_CLASSES =
  'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed'

const SIZE_MD_CLASSES =
  'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2'
const SIZE_SM_CLASSES =
  'text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1'
const SIZE_LG_CLASSES =
  'text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3'

describe('<Button />', () => {
  describe('props padrão em jsx', () => {
    test('deve renderizar o botão com props padrão', () => {
      render(<Button>Enviar formulário</Button>)

      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      })

      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES)
      expect(button).toHaveClass(SIZE_MD_CLASSES)
    })

    test('propriedades JSX funcionam corretamente', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Button onClick={handleClick} type="submit" aria-hidden="false">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      })

      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(2)
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('aria-hidden', 'false')
    })
  })

  describe('variants (cores)', () => {
    test('default aplica a cor correta', () => {
      render(
        <Button variant="default" title="o botão">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByTitle(/o botão/i)
      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES)
    })

    test('danger aplica a cor correta', () => {
      render(
        <Button variant="danger" title="o botão">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByTitle(/o botão/i)
      expect(button).toHaveClass(VARIANT_DANGER_CLASSES)
    })

    test('ghost aplica a cor correta', () => {
      render(
        <Button variant="ghost" title="o botão">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByTitle(/o botão/i)
      expect(button).toHaveClass(VARIANT_GHOST_CLASSES)
    })
  })

  describe('size (tamanhos)', () => {
    test('sm deve ser menor', () => {
      render(
        <Button size="sm" data-testid="botao">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByTestId('botao')
      expect(button).toHaveClass(SIZE_SM_CLASSES)
    })

    test('md deve ser médio', () => {
      render(
        <Button size="md" data-testid="botao">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByTestId('botao')
      expect(button).toHaveClass(SIZE_MD_CLASSES)
    })

    test('lg deve ser grande', () => {
      render(
        <Button size="lg" data-testid="botao">
          Enviar formulário
        </Button>,
      )

      const button = screen.getByTestId('botao')
      expect(button).toHaveClass(SIZE_LG_CLASSES)
    })
  })

  describe('disabled', () => {
    test('classes para estado desativado estão corretas', () => {
      render(<Button disabled>Enviar formulário</Button>)

      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      })

      expect(button).toHaveClass(DISABLED_CLASSES)
    })
  })
})
