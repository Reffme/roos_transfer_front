import { useDialog } from 'naive-ui'

export const useBaseDialog = () => {
  const dialog = useDialog()

  const createDialog = ({
    type = 'success',
    title = 'Внимание!',
    content = 'Вы уверены?',
    onPositiveClick = undefined,
    onNegativeClick = undefined,
    positiveText = 'Да',
    negativeText = 'Нет',
  }: {
    type?: 'success' | 'warning' | 'error'
    title?: string
    content?: string
    onPositiveClick?: (...args: unknown[]) => unknown
    onNegativeClick?: (...args: unknown[]) => unknown
    positiveText?: string
    negativeText?: string
  } = {}) => {
    const d = dialog.create({
      type,
      content,
      title,
      positiveText,
      negativeText,
      onPositiveClick: async () => {
        if (!onPositiveClick) return

        d.loading = true
        await onPositiveClick()
        d.loading = false
      },
      onNegativeClick: async () => {
        if (!onNegativeClick) return

        d.loading = true
        await onNegativeClick()
        d.loading = false
      },
    })
  }

  return { createDialog }
}
