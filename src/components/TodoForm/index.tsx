'use client'

import { CreateTodoAction } from "@/core/todo/actions/todo.actions.types"
import { sanitizeStr } from "@/utils/sanitize-str";
import { useRef, useState, useTransition } from "react";
import { InputText } from "../InputText";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "../Button";

export type TodoFormProps = {
  action: CreateTodoAction;
}

export function TodoForm({ action }: TodoFormProps) {
 const [pending, startTransition] = useTransition();
 const [inputErro, setInputError] = useState('');
 const ref= useRef<HTMLInputElement>(null)

 function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); // Evitar o reload da página//

  const input = ref.current;

  if(!input ) return;

  const description = sanitizeStr(input.value); // limpa os espaços em branco//

  startTransition(async() => {
    const result = await action(description)

    if(!result.success) {  // se o resultado for falso
      setInputError(result.errors[0]) //
        return;
    }

    input.value = '' ;// limpado o campo do input //
    setInputError('')

  })
}

return (
  <form onSubmit={handleCreateTodo}  className="flex flex-col flex-1 gap-6">
    <InputText
    name="description"
    labelText="Tarefas"
    placeholder="Digite sua Tarefa..."
    disabled={pending}
    errorMessage={inputErro}
    ref={ref}/>

    <Button type="submit" disabled={pending}>
      <CirclePlusIcon/>
        {!pending && <span>Criar tarefa</span>}
        {pending && <span>Criando tarefa...</span>}
    </Button>
  </form>
)
}
