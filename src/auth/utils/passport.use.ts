import passport, { Strategy } from 'passport';

type TypeStrategy<T, U, X> = { new (params: U, callback: X): T };


// EL T es el tipo de la estrategia, U es el tipo de los parametros y X es el tipo de la funcion callback
// El tipo de la funcion es una funcion que recibe un usuario y un callback y devuelve un void
export function PassPortUse<T extends Strategy, U, X>(
  name: string,
  Strategy: TypeStrategy<T, U, X>,
  params: U,
  callback: X,
) {
    passport.use(name, new Strategy(params, callback));
}
