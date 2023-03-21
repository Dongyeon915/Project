export function myRequestGenerator(path) {
  // http://localhost:8080/schedule
  return `${process.env.REACT_APP_BASE_SERVER_URL}${path}`
}