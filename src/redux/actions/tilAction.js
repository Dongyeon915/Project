
export const TILL_PAGE_VALUE = "TILL_PAGE_VALUE"
export function setTillPageValue(pageValue){
  return {
    type: TILL_PAGE_VALUE,
    tilPageValue : pageValue
  }
}