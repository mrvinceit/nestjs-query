import { ASTNode, FieldNode, getArgumentValues, getNamedType, GraphQLField, GraphQLUnionType, isCompositeType } from 'graphql'
import { FieldsByTypeName, parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info'
import { merge } from 'lodash'

import type { CursorConnectionType, OffsetConnectionType } from '../types'
import type { AliasedSelection, Query, SelectionInfoType } from '@ptc-org/nestjs-query-core'
import type { GraphQLCompositeType, GraphQLResolveInfo as ResolveInfo, SelectionNode } from 'graphql'

type QueryResolveFields<DTO> = {
  [key in keyof DTO]: QueryResolveTree<
    // If the key is a array get the type of the array
    DTO[key] extends ArrayLike<unknown> ? DTO[key][number] : DTO[key]
  >
}

export interface QueryResolveTree<DTO> {
  name: string
  alias: string
  args?: Query<DTO>
  fields: QueryResolveFields<DTO>
}

function getFieldFromAST<TContext>(
  fieldNode: ASTNode,
  parentType: GraphQLCompositeType
): GraphQLField<GraphQLCompositeType, TContext> | undefined {
  if (fieldNode.kind === 'Field') {
    if (!(parentType instanceof GraphQLUnionType)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return parentType.getFields()[fieldNode.name.value]
    } else {
      // XXX: TODO: Handle GraphQLUnionType
    }
  }
  return undefined
}

function parseFieldNodes<DTO>(
  inASTs: ReadonlyArray<SelectionNode> | SelectionNode,
  resolveInfo: ResolveInfo,
  initTree: QueryResolveFields<DTO> | null,
  parentType: GraphQLCompositeType
): QueryResolveTree<DTO> | QueryResolveFields<DTO> {
  const asts: ReadonlyArray<FieldNode> = Array.isArray(inASTs) ? inASTs : [inASTs]

  return asts.reduce((tree, fieldNode) => {
    const alias: string = fieldNode?.alias?.value ?? fieldNode.name.value

    const field = getFieldFromAST(fieldNode, parentType)
    if (field == null) {
      return tree
    }
    const fieldGqlTypeOrUndefined = getNamedType(field.type)
    if (!fieldGqlTypeOrUndefined) {
      return tree
    }

    const parsedField = {
      name: fieldNode.name.value,
      alias,
      args: getArgumentValues(field, fieldNode, resolveInfo.variableValues),

      fields:
        fieldNode.selectionSet && isCompositeType(fieldGqlTypeOrUndefined)
          ? parseFieldNodes(
              fieldNode.selectionSet.selections,
              resolveInfo,
              {} as QueryResolveFields<DTO>,
              fieldGqlTypeOrUndefined
            )
          : {}
    } as QueryResolveTree<DTO>

    if (tree === null) {
      return parsedField
    } else {
      tree[alias] = parsedField
    }

    return tree
  }, initTree)
}

function isOffsetPaging<DTO>(info: unknown): info is QueryResolveTree<OffsetConnectionType<DTO>> {
  return typeof (info as QueryResolveTree<OffsetConnectionType<DTO>>).fields.nodes !== 'undefined'
}

function isCursorPaging<DTO>(info: unknown): info is QueryResolveTree<CursorConnectionType<DTO>> {
  return typeof (info as QueryResolveTree<CursorConnectionType<DTO>>).fields.edges !== 'undefined'
}

export function simplifyResolveInfo<DTO>(resolveInfo: ResolveInfo): QueryResolveTree<DTO> {
  const simpleInfo = parseFieldNodes(resolveInfo.fieldNodes, resolveInfo, null, resolveInfo.parentType) as
    | QueryResolveTree<DTO>
    | QueryResolveTree<OffsetConnectionType<DTO>>
    | QueryResolveTree<CursorConnectionType<DTO>>

  if (isOffsetPaging(simpleInfo)) {
    return simpleInfo.fields.nodes as QueryResolveTree<DTO>
  } else if (isCursorPaging(simpleInfo)) {
    return simpleInfo.fields.edges.fields.node as QueryResolveTree<DTO>
  }

  return simpleInfo as QueryResolveTree<DTO>
}

// TODO: Refactor this function to use ResolveInfo directly
// Fix typing issues with ResolveTree / FieldsByTypeName types
function buildSelectionInfo<DTO>(
  parsedInfo: ResolveTree | FieldsByTypeName,
  cnxNames: string[] | ((name: string) => boolean) = ['Connection']
): { name: string; info: SelectionInfoType<DTO> | boolean } {
  const map = {} as SelectionInfoType<DTO>
  let mapInner: AliasedSelection<DTO> | SelectionInfoType<DTO> = map
  const fieldName = parsedInfo.name as string
  const alias = parsedInfo.alias as string

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (fieldName !== alias) {
    map.$aliases = {} as Record<string, AliasedSelection<DTO>>
    map.$aliases[alias] = {} as AliasedSelection<DTO>
    mapInner = map.$aliases[alias]
  }

  if (Object.keys(parsedInfo.args).length > 0) {
    mapInner.$args = parsedInfo.args as Record<string, object>
  }

  const isConnectionType =
    typeof cnxNames === 'function' ? cnxNames : (typeName: string) => cnxNames.some((n) => typeName.indexOf(n) > 0)

  if (parsedInfo?.fieldsByTypeName) {
    const types = Object.keys(parsedInfo.fieldsByTypeName)

    if (types.length > 0) {
      types.forEach((t) => {
        const fieldObj = parsedInfo.fieldsByTypeName[t]

        // Is a connection // if it is then we only want the edge node details
        if (isConnectionType(t)) {
          const cnxObj = fieldObj as any

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          const keys = Object.keys(cnxObj.edges?.fieldsByTypeName || {})
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const cursorCnxObj = keys.length ? cnxObj.edges?.fieldsByTypeName[keys[0]]?.node : undefined

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const offsetCnxObj = cnxObj.nodes
          const cnxFieldObj = cursorCnxObj || offsetCnxObj
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          const cnxTypes = Object.keys(cnxFieldObj.fieldsByTypeName)

          cnxTypes.forEach((cxt) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            const cnxFields = Object.keys(cnxFieldObj.fieldsByTypeName[cxt])
            cnxFields.forEach((f) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
              const { name, info } = buildSelectionInfo(cnxFieldObj.fieldsByTypeName[cxt][f], cnxNames)
              mapInner[name] = merge(mapInner[name], info)
            })
          })
        } else {
          const fields = Object.keys(fieldObj)
          fields.forEach((f) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const { name, info } = buildSelectionInfo(fieldObj[f], cnxNames)
            mapInner[name] = merge(mapInner[name], info)
          })
        }
      })
    }
  }

  const hasKeys = !!Object.keys(map).length

  return { name: fieldName, info: hasKeys ? map : true }
}

export function createSelectionInfo<DTO>(
  resolveInfo: ResolveInfo,
  cnxNames: string[] | ((name: string) => boolean) = ['Connection']
) {
  const parsedInfo = parseResolveInfo(resolveInfo) as ResolveTree

  const output = buildSelectionInfo<DTO>(parsedInfo, cnxNames)

  return output.info as SelectionInfoType<DTO>
}
