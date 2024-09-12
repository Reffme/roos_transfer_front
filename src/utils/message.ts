
const options = {
  duration: 7000,
  closable: true,
}



export const standardSuccessMessage = (text: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.$message.success(`${text}`, options)
}

export const standardWarningMessage = (text: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.$message.warning(`${text}`, options)
}

export const standardErrorMessage = (text: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.$message.error(`${text}`, options)
}
