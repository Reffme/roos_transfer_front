type BooleanValidator =
  | 'required'
  | 'email'
  | 'integer'
  | 'phoneNumber'
  | 'alpha_num'
  | 'withoutSpaces'
  | 'float'
  | 'addressIP'
  | 'alpha_dash'
  | 'dateInput'
  | 'percentage'
type NumberValidator = 'length' | 'min_value' | 'max_value' | 'min' | 'max'
type MinMaxValidator = 'between'
type PasswordValidator = 'confirmed'
type UrlValidator = 'url'
type Regex = 'regex'

export type ValidationRule =
  | {
      [key in BooleanValidator]?: boolean
    }
  | {
      [key in NumberValidator]?: number
    }
  | {
      [key in MinMaxValidator]?: { min: number; max: number }
    }
  | {
      [key in PasswordValidator]?: {
        target: string
      }
    }
  | {
      [key in UrlValidator]: string
    }
  | {
      [ket in Regex]: RegExp
    }
