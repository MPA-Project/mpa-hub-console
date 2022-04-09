export const LsSetData = <T> (key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const LsGetData = <T> (key: string): T | null => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export const LsRemoveData = (key: string) => {
  localStorage.removeItem(key)
}