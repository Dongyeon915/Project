import {useState} from "react";

export function useJoin() {
  const [state,setState] = useState();


  return [state]
}