import { revalidatePath } from 'next/cache';
import { createTodoUseCase } from '../usecases/create-todo.usecase';
import { devOnlyDelay } from '@/utils/dev-only-delay';

export async function createTodoAction(description: string) {
  'use server';

  await devOnlyDelay(100); // delay de 1s para simular o tempo de criação do TODO, só em ambiente de e2e
  const createResult = await createTodoUseCase(description);

  if (createResult.success) {
    revalidatePath('/');
  }

  return createResult;
}
