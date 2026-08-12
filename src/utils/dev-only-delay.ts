import { getFullEnv } from "@/env/configs";


export async function devOnlyDelay( delay: number = 1000): Promise<void> { // delay em ms, default 1s

  const {currentEnv} = getFullEnv(); // pega o env atual do projeto, se é dev, prod ou e2e

  const envsToDelay = ['e2e']; // array com os envs que devem ter delay, nesse caso só o e2e, pq é o unico que precisa de delay

  const shouldDelay = delay > 0 && envsToDelay.includes(currentEnv); // se o delay for maior que 0 e o env atual estiver no array de envs que devem ter delay, então deve ter delay

  if(shouldDelay) {// se deve ter delay, então cria uma promise que resolve depois do delay
    return new Promise(resolve => {
      setTimeout(resolve, delay)
    })
  }
  return;
}
