export const s2ab = s => {
  const buff = new ArrayBuffer(s.length)
  const view = new Uint8Array(buff)
  const sArr = [...Array(s.length)]

  sArr.forEach((_, i) => (view[i] = s.charCodeAt(i) & 0xff))

  return buff
}
