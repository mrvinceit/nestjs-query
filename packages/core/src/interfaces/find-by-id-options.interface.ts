import { Filterable } from './filterable.interface'
import { Selection } from './selection.interface'

export interface FindByIdOptions<DTO> extends Filterable<DTO> {
  /**
   * Allow also deleted records to be retrieved
   */
  withDeleted?: boolean
  selections?: Selection<DTO>
}
