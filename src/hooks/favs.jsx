import React, {createContext, useContext, useEffect, useReducer} from "react";

const Ctx = createContext();
const KEY = "sw-favs";

function reducer(state, a) {
  if (a.type === "load") return a.payload;
  if (a.type === "toggle") {
    const id = `${a.item.type}-${a.item.uid}`;
    return state.some(x => `${x.type}-${x.uid}` === id)
      ? state.filter(x => `${x.type}-${x.uid}` !== id)
      : [...state, a.item];
  }
  if (a.type === "remove") {
    const id = `${a.item.type}-${a.item.uid}`;
    return state.filter(x => `${x.type}-${x.uid}` !== id);
  }
  if (a.type === "clear") return [];
  return state;
}

export function FavsProvider({children}) {
  const [favs, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) dispatch({type:"load", payload: JSON.parse(s)}); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(favs)); } catch {} }, [favs]);

  const toggle = (item) => dispatch({type:"toggle", item});
  const remove = (item) => dispatch({type:"remove", item});
  const clear  = () => dispatch({type:"clear"});

  return <Ctx.Provider value={{favs, toggle, remove, clear}}>{children}</Ctx.Provider>;
}

export const useFavs = () => useContext(Ctx);
