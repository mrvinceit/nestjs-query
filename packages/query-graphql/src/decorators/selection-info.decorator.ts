import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import type { Selection } from '@ptc-org/nestjs-query-core'
import type { GraphQLResolveInfo as ResolveInfo } from 'graphql'

import { createSelectionInfo } from './graphql-resolve-info.utils'

export const SelectionInfo = <DTO>(): ParameterDecorator => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext): Selection<DTO> => {
    const info = GqlExecutionContext.create(ctx).getInfo<ResolveInfo>()
    return createSelectionInfo<DTO>(info)
  })()
}
