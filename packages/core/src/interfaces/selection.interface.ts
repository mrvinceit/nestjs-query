import { BuiltInTypes } from './filter-field-comparison.interface'
import { Query } from './query.inteface'

// type NonFunctionKeys<T> = {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   [K in keyof T]: T[K] extends Function ? never : K
// }[keyof T]

// export type SelectionInfoType<FieldType> = FieldType extends Array<infer U>
//   ? SelectionWithAlias<U, FieldType> // | SelectionWithConnection<U, FieldType>
//   : FieldType extends BuiltInTypes
//   ? SelectionWithAlias<FieldType>
//   : // eslint-disable-next-line @typescript-eslint/ban-types
//   FieldType extends Function | Function
//   ? never
//   : SelectionWithAlias<FieldType>

// // export type AliasedSelection<T, P = undefined> = Omit<SelectionInfoType<P extends undefined ? T : P>, '$aliases'>

// export type SelectionWithAlias<T, P = undefined> = {
//   [K in NonFunctionKeys<T>]?: SelectionInfoType<T[K]>
// } & {
//   // $name: string
//   $args?: Record<string, object>
//   $aliases?: Record<string, AliasedSelection<T, P>>
// }

// export type SelectionWithArgs<T, P> = SelectionWithAlias<T, P> & {
//   $args?: Record<string, object>
// }

// export type SelectionWithConnection<T, P = undefined> = SelectionWithArgs<T, P> & {
//   $args?: Query<T> & Record<string, object>
// }

export type SelectionInfoType<DTO> = Record<string, object>
export type Selection<DTO> = SelectionInfoType<DTO>
export type AliasedSelection<DTO> = SelectionInfoType<DTO>
