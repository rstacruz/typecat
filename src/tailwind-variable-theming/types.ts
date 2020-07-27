export interface ThemeDefinitions {
  [key: string]: ThemeDefinitions | string
}

export interface RecursiveKeyValuePairs {
  [key: string]: RecursiveKeyValuePairs | string
}

export interface KeyValuePairs {
  [key: string]: string
}

export type ThemeOptions = {
  name?: string
  colors?: ThemeDefinitions
}
