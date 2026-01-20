import { render } from "@testing-library/react";
import { Button } from ".";

describe('<Button />',  () => {

  describe('props padrão em jsx ', () => {
    test('deve renderizar o botão com props padrão', async () => {
    render(<Button>Enviar formulario</Button>)


    })

        test('verificar  se as propriedade padrão JSX funcionam corretamente', async () => {

    })
  });
//     describe('variants (cores)', () => {
//       test('checa se default aplicar a cor correta', async () => {

//       })

//         test('checa se danger aplicar a cor correta', async () => {

//       })

//         test('checa se ghost aplicar a cor correta', async () => {

//       })
//     })

//     describe('size (tamanhos)', () => {
//       test('tamanho do sm deve ser menor', async () => {})
//       test('tamanho do md deve ser medio', async () => {})
//       test('tamanho do lg deve ser grande', async () => {})

//     })

//     describe('disabled', () => {
//     test('classes para estado desativado estão corretas', async () => {});

// })
})
