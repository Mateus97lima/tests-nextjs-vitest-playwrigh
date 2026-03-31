import {test, } from '@playwright/test';


test.describe('< Home /> (E2E)', () => {

 // Renderização de componente

  test.describe('Renderização de componente', () => {
    test('Deve ter o title html correto', async ({page}) => {
      await page.goto('/');
      await page.waitForTimeout(5000)
    });
  });
})
