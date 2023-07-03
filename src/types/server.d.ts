declare module 'prisma/script' {
  import { PrismaClient } from '@prisma/client';
  export const prisma: PrismaClient<
    import('.prisma/client').Prisma.PrismaClientOptions,
    never,
    | import('.prisma/client').Prisma.RejectOnNotFound
    | import('.prisma/client').Prisma.RejectPerOperation
    | undefined
  >;
}
declare module 'utils/group' {
  import { PrismaPromise } from '@prisma/client';
  type Obj = {
    id?: number;
  } & Record<string, unknown>;
  export const updateGroup: <T extends Obj>(
    group: T[] | undefined,
    create: (obj: T) => PrismaPromise<T>,
  ) => Promise<void>;
}
declare module 'utils/revision' {
  export const getRevisionName: () => string;
  type Model = {
    ActiveRevision: Record<string, unknown> | null;
    [key: string]: unknown;
  };
  export const revisionMerge: <T extends Model>(
    model: T,
  ) => T['ActiveRevision'] & Omit<T, 'ActiveRevision'>;
}
declare module 'utils/slug' {
  export const slugify: (str: string | undefined) => string | undefined;
}
declare module 'trpc/context' {
  import { inferAsyncReturnType } from '@trpc/server';
  /**
   * Creates context for an incoming request
   * @link https://trpc.io/docs/context
   */
  export const createContext: () => {};
  export type Context = inferAsyncReturnType<typeof createContext>;
}
declare module 'trpc/trpc' {
  /**
   * Unprotected procedure
   **/
  export const publicProcedure: import('@trpc/server').ProcedureBuilder<{
    _config: import('@trpc/server').RootConfig<{
      ctx: {};
      meta: object;
      errorShape: {
        data: {
          code:
            | 'PARSE_ERROR'
            | 'BAD_REQUEST'
            | 'INTERNAL_SERVER_ERROR'
            | 'UNAUTHORIZED'
            | 'FORBIDDEN'
            | 'NOT_FOUND'
            | 'METHOD_NOT_SUPPORTED'
            | 'TIMEOUT'
            | 'CONFLICT'
            | 'PRECONDITION_FAILED'
            | 'PAYLOAD_TOO_LARGE'
            | 'UNPROCESSABLE_CONTENT'
            | 'TOO_MANY_REQUESTS'
            | 'CLIENT_CLOSED_REQUEST';
          httpStatus: number;
          path?: string | undefined;
          stack?: string | undefined;
        };
        message: string;
        code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
      };
      transformer: import('@trpc/server').DefaultDataTransformer;
    }>;
    _ctx_out: {};
    _input_in: typeof import('@trpc/server').unsetMarker;
    _input_out: typeof import('@trpc/server').unsetMarker;
    _output_in: typeof import('@trpc/server').unsetMarker;
    _output_out: typeof import('@trpc/server').unsetMarker;
    _meta: object;
  }>;
  export const router: <
    TProcRouterRecord extends import('@trpc/server').ProcedureRouterRecord,
  >(
    procedures: TProcRouterRecord,
  ) => import('@trpc/server').CreateRouterInner<
    import('@trpc/server').RootConfig<{
      ctx: {};
      meta: object;
      errorShape: {
        data: {
          code:
            | 'PARSE_ERROR'
            | 'BAD_REQUEST'
            | 'INTERNAL_SERVER_ERROR'
            | 'UNAUTHORIZED'
            | 'FORBIDDEN'
            | 'NOT_FOUND'
            | 'METHOD_NOT_SUPPORTED'
            | 'TIMEOUT'
            | 'CONFLICT'
            | 'PRECONDITION_FAILED'
            | 'PAYLOAD_TOO_LARGE'
            | 'UNPROCESSABLE_CONTENT'
            | 'TOO_MANY_REQUESTS'
            | 'CLIENT_CLOSED_REQUEST';
          httpStatus: number;
          path?: string | undefined;
          stack?: string | undefined;
        };
        message: string;
        code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
      };
      transformer: import('@trpc/server').DefaultDataTransformer;
    }>,
    TProcRouterRecord
  >;
  export const middleware: <
    TNewParams extends import('@trpc/server').ProcedureParams<
      import('@trpc/server').AnyRootConfig,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown
    >,
  >(
    fn: import('@trpc/server').MiddlewareFunction<
      {
        _config: import('@trpc/server').RootConfig<{
          ctx: {};
          meta: object;
          errorShape: {
            data: {
              code:
                | 'PARSE_ERROR'
                | 'BAD_REQUEST'
                | 'INTERNAL_SERVER_ERROR'
                | 'UNAUTHORIZED'
                | 'FORBIDDEN'
                | 'NOT_FOUND'
                | 'METHOD_NOT_SUPPORTED'
                | 'TIMEOUT'
                | 'CONFLICT'
                | 'PRECONDITION_FAILED'
                | 'PAYLOAD_TOO_LARGE'
                | 'UNPROCESSABLE_CONTENT'
                | 'TOO_MANY_REQUESTS'
                | 'CLIENT_CLOSED_REQUEST';
              httpStatus: number;
              path?: string | undefined;
              stack?: string | undefined;
            };
            message: string;
            code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
          };
          transformer: import('@trpc/server').DefaultDataTransformer;
        }>;
        _ctx_out: {};
        _input_out: unknown;
        _input_in: unknown;
        _output_in: unknown;
        _output_out: unknown;
        _meta: object;
      },
      TNewParams
    >,
  ) => import('@trpc/server').MiddlewareBuilder<
    {
      _config: import('@trpc/server').RootConfig<{
        ctx: {};
        meta: object;
        errorShape: {
          data: {
            code:
              | 'PARSE_ERROR'
              | 'BAD_REQUEST'
              | 'INTERNAL_SERVER_ERROR'
              | 'UNAUTHORIZED'
              | 'FORBIDDEN'
              | 'NOT_FOUND'
              | 'METHOD_NOT_SUPPORTED'
              | 'TIMEOUT'
              | 'CONFLICT'
              | 'PRECONDITION_FAILED'
              | 'PAYLOAD_TOO_LARGE'
              | 'UNPROCESSABLE_CONTENT'
              | 'TOO_MANY_REQUESTS'
              | 'CLIENT_CLOSED_REQUEST';
            httpStatus: number;
            path?: string | undefined;
            stack?: string | undefined;
          };
          message: string;
          code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
        };
        transformer: import('@trpc/server').DefaultDataTransformer;
      }>;
      _ctx_out: {};
      _input_out: unknown;
      _input_in: unknown;
      _output_in: unknown;
      _output_out: unknown;
      _meta: object;
    },
    TNewParams
  >;
}
declare module 'trpc/routers/asset' {
  import { z } from 'zod';
  export const AssetInput: z.ZodObject<
    {
      id: z.ZodOptional<z.ZodNumber>;
      name: z.ZodString;
      type: z.ZodString;
      size: z.ZodNumber;
      bytes: z.ZodArray<z.ZodNumber, 'many'>;
      blurhash: z.ZodNullable<z.ZodOptional<z.ZodString>>;
      timestamp: z.ZodNullable<z.ZodString>;
    },
    'strip',
    z.ZodTypeAny,
    {
      type: string;
      name: string;
      bytes: number[];
      size: number;
      timestamp: string | null;
      id?: number | undefined;
      blurhash?: string | null | undefined;
    },
    {
      type: string;
      name: string;
      bytes: number[];
      size: number;
      timestamp: string | null;
      id?: number | undefined;
      blurhash?: string | null | undefined;
    }
  >;
  export const assetRouter: import('@trpc/server').CreateRouterInner<
    import('@trpc/server').RootConfig<{
      ctx: {};
      meta: object;
      errorShape: {
        data: {
          code:
            | 'PARSE_ERROR'
            | 'BAD_REQUEST'
            | 'INTERNAL_SERVER_ERROR'
            | 'UNAUTHORIZED'
            | 'FORBIDDEN'
            | 'NOT_FOUND'
            | 'METHOD_NOT_SUPPORTED'
            | 'TIMEOUT'
            | 'CONFLICT'
            | 'PRECONDITION_FAILED'
            | 'PAYLOAD_TOO_LARGE'
            | 'UNPROCESSABLE_CONTENT'
            | 'TOO_MANY_REQUESTS'
            | 'CLIENT_CLOSED_REQUEST';
          httpStatus: number;
          path?: string | undefined;
          stack?: string | undefined;
        };
        message: string;
        code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
      };
      transformer: import('@trpc/server').DefaultDataTransformer;
    }>,
    {
      getAll: import('@trpc/server').BuildProcedure<
        'query',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _ctx_out: {};
          _input_in: typeof import('@trpc/server').unsetMarker;
          _input_out: typeof import('@trpc/server').unsetMarker;
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
          _meta: object;
        },
        {
          id: number;
          title: string;
          name: string;
          url: string;
          blurhash: string | null;
          extension: string;
          size: number;
          type: string;
          timestamp: string;
          dateCreated: Date;
          dateUpdated: Date;
          notes: string;
          singleImageId: number | null;
          singleImagesId: number | null;
        }[]
      >;
      getOne: import('@trpc/server').BuildProcedure<
        'query',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: number;
          _input_out: number;
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          title: string;
          name: string;
          url: string;
          blurhash: string | null;
          extension: string;
          size: number;
          type: string;
          timestamp: string;
          dateCreated: Date;
          dateUpdated: Date;
          notes: string;
          singleImageId: number | null;
          singleImagesId: number | null;
        } | null
      >;
      upsertOne: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            id: number;
            title: string;
          };
          _input_out: {
            id: number;
            title: string;
          };
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          title: string;
          name: string;
          url: string;
          blurhash: string | null;
          extension: string;
          size: number;
          type: string;
          timestamp: string;
          dateCreated: Date;
          dateUpdated: Date;
          notes: string;
          singleImageId: number | null;
          singleImagesId: number | null;
        }
      >;
      delete: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: number;
          _input_out: number;
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          title: string;
          name: string;
          url: string;
          blurhash: string | null;
          extension: string;
          size: number;
          type: string;
          timestamp: string;
          dateCreated: Date;
          dateUpdated: Date;
          notes: string;
          singleImageId: number | null;
          singleImagesId: number | null;
        }
      >;
      deleteMany: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: number[];
          _input_out: number[];
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        import('.prisma/client').Prisma.BatchPayload
      >;
    }
  >;
}
declare module 'utils/asset' {
  import { Prisma } from '@prisma/client';
  import { z } from 'zod';
  import { AssetInput } from 'trpc/routers/asset';
  export const updateAsset: (
    image: z.infer<typeof AssetInput> | undefined,
    relation: keyof Prisma.AssetAvgAggregateInputType,
    id?: number,
  ) => Promise<void>;
  export const updateAssets: (
    images: z.infer<typeof AssetInput>[] | undefined,
    relation: keyof Prisma.AssetAvgAggregateInputType,
    id?: number,
  ) => Promise<void>;
}
declare module 'trpc/routers/view' {
  export const viewRouter: import('@trpc/server').CreateRouterInner<
    import('@trpc/server').RootConfig<{
      ctx: {};
      meta: object;
      errorShape: {
        data: {
          code:
            | 'PARSE_ERROR'
            | 'BAD_REQUEST'
            | 'INTERNAL_SERVER_ERROR'
            | 'UNAUTHORIZED'
            | 'FORBIDDEN'
            | 'NOT_FOUND'
            | 'METHOD_NOT_SUPPORTED'
            | 'TIMEOUT'
            | 'CONFLICT'
            | 'PRECONDITION_FAILED'
            | 'PAYLOAD_TOO_LARGE'
            | 'UNPROCESSABLE_CONTENT'
            | 'TOO_MANY_REQUESTS'
            | 'CLIENT_CLOSED_REQUEST';
          httpStatus: number;
          path?: string | undefined;
          stack?: string | undefined;
        };
        message: string;
        code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
      };
      transformer: import('@trpc/server').DefaultDataTransformer;
    }>,
    {
      createView: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            keys: {
              type: string;
              name: string;
              enabled: boolean;
            }[];
            name: string;
            modelName: string;
            isEditable?: boolean | undefined;
            sortName?: string | undefined;
            sortDir?: string | undefined;
            filters?:
              | {
                  type: 'string' | 'none';
                  key: string;
                  id: string;
                  value: string;
                  constraint:
                    | 'contains'
                    | 'empty'
                    | 'is'
                    | '!is'
                    | '!contains'
                    | 'starts'
                    | '!starts'
                    | 'ends'
                    | '!ends'
                    | '!empty';
                  viewId: number;
                }[]
              | undefined;
          };
          _input_out: {
            keys: {
              type: string;
              name: string;
              enabled: boolean;
            }[];
            name: string;
            modelName: string;
            isEditable?: boolean | undefined;
            sortName?: string | undefined;
            sortDir?: string | undefined;
            filters?:
              | {
                  type: 'string' | 'none';
                  key: string;
                  id: string;
                  value: string;
                  constraint:
                    | 'contains'
                    | 'empty'
                    | 'is'
                    | '!is'
                    | '!contains'
                    | 'starts'
                    | '!starts'
                    | 'ends'
                    | '!ends'
                    | '!empty';
                  viewId: number;
                }[]
              | undefined;
          };
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          isEditable: boolean;
          name: string;
          modelName: string;
          sortName: string;
          sortDir: string;
          dateCreated: Date;
          dateUpdated: Date;
        } & {
          readonly keys: {
            id: number;
            name: string;
            type: string;
            enabled: boolean;
            viewId: number;
          }[];
          readonly filters: {
            id: string;
            key: string;
            type: string;
            constraint: string;
            value: string;
            viewId: number;
          }[];
        }
      >;
      getView: import('@trpc/server').BuildProcedure<
        'query',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            name: string;
            modelName: string;
          };
          _input_out: {
            name: string;
            modelName: string;
          };
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        | ({
            id: number;
            isEditable: boolean;
            name: string;
            modelName: string;
            sortName: string;
            sortDir: string;
            dateCreated: Date;
            dateUpdated: Date;
          } & {
            readonly keys: {
              id: number;
              name: string;
              type: string;
              enabled: boolean;
              viewId: number;
            }[];
            readonly filters: {
              id: string;
              key: string;
              type: string;
              constraint: string;
              value: string;
              viewId: number;
            }[];
          })
        | null
      >;
      getViews: import('@trpc/server').BuildProcedure<
        'query',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: string;
          _input_out: string;
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        ({
          id: number;
          isEditable: boolean;
          name: string;
          modelName: string;
          sortName: string;
          sortDir: string;
          dateCreated: Date;
          dateUpdated: Date;
        } & {
          readonly keys: {
            id: number;
            name: string;
            type: string;
            enabled: boolean;
            viewId: number;
          }[];
          readonly filters: {
            id: string;
            key: string;
            type: string;
            constraint: string;
            value: string;
            viewId: number;
          }[];
        })[]
      >;
      updateView: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            id: number;
            name?: string | undefined;
            modelName?: string | undefined;
            sortName?: string | undefined;
            sortDir?: string | undefined;
            filters?:
              | {
                  type: 'string' | 'none';
                  key: string;
                  id: string;
                  value: string;
                  constraint:
                    | 'contains'
                    | 'empty'
                    | 'is'
                    | '!is'
                    | '!contains'
                    | 'starts'
                    | '!starts'
                    | 'ends'
                    | '!ends'
                    | '!empty';
                  viewId: number;
                }[]
              | undefined;
            keys?:
              | {
                  type: string;
                  name: string;
                  enabled: boolean;
                }[]
              | undefined;
          };
          _input_out: {
            id: number;
            name?: string | undefined;
            modelName?: string | undefined;
            sortName?: string | undefined;
            sortDir?: string | undefined;
            filters?:
              | {
                  type: 'string' | 'none';
                  key: string;
                  id: string;
                  value: string;
                  constraint:
                    | 'contains'
                    | 'empty'
                    | 'is'
                    | '!is'
                    | '!contains'
                    | 'starts'
                    | '!starts'
                    | 'ends'
                    | '!ends'
                    | '!empty';
                  viewId: number;
                }[]
              | undefined;
            keys?:
              | {
                  type: string;
                  name: string;
                  enabled: boolean;
                }[]
              | undefined;
          };
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          isEditable: boolean;
          name: string;
          modelName: string;
          sortName: string;
          sortDir: string;
          dateCreated: Date;
          dateUpdated: Date;
        } & {
          readonly keys: {
            id: number;
            name: string;
            type: string;
            enabled: boolean;
            viewId: number;
          }[];
          readonly filters: {
            id: string;
            key: string;
            type: string;
            constraint: string;
            value: string;
            viewId: number;
          }[];
        }
      >;
      deleteView: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: number;
          _input_out: number;
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          isEditable: boolean;
          name: string;
          modelName: string;
          sortName: string;
          sortDir: string;
          dateCreated: Date;
          dateUpdated: Date;
        } & {
          readonly keys: {
            id: number;
            name: string;
            type: string;
            enabled: boolean;
            viewId: number;
          }[];
          readonly filters: {
            id: string;
            key: string;
            type: string;
            constraint: string;
            value: string;
            viewId: number;
          }[];
        }
      >;
      setViewKey: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            name: string;
            viewId: number;
            enabled: boolean;
          };
          _input_out: {
            name: string;
            viewId: number;
            enabled: boolean;
          };
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        {
          id: number;
          name: string;
          type: string;
          enabled: boolean;
        }
      >;
      updateViews: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            id: number;
            name?: string | undefined;
            modelName?: string | undefined;
            sortName?: string | undefined;
            sortDir?: string | undefined;
            filters?:
              | {
                  type: 'string' | 'none';
                  key: string;
                  id: string;
                  value: string;
                  constraint:
                    | 'contains'
                    | 'empty'
                    | 'is'
                    | '!is'
                    | '!contains'
                    | 'starts'
                    | '!starts'
                    | 'ends'
                    | '!ends'
                    | '!empty';
                  viewId: number;
                }[]
              | undefined;
            keys?:
              | {
                  type: string;
                  name: string;
                  enabled: boolean;
                }[]
              | undefined;
          }[];
          _input_out: {
            id: number;
            name?: string | undefined;
            modelName?: string | undefined;
            sortName?: string | undefined;
            sortDir?: string | undefined;
            filters?:
              | {
                  type: 'string' | 'none';
                  key: string;
                  id: string;
                  value: string;
                  constraint:
                    | 'contains'
                    | 'empty'
                    | 'is'
                    | '!is'
                    | '!contains'
                    | 'starts'
                    | '!starts'
                    | 'ends'
                    | '!ends'
                    | '!empty';
                  viewId: number;
                }[]
              | undefined;
            keys?:
              | {
                  type: string;
                  name: string;
                  enabled: boolean;
                }[]
              | undefined;
          }[];
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        ({
          id: number;
          isEditable: boolean;
          name: string;
          modelName: string;
          sortName: string;
          sortDir: string;
          dateCreated: Date;
          dateUpdated: Date;
        } & {
          readonly keys: {
            id: number;
            name: string;
            type: string;
            enabled: boolean;
            viewId: number;
          }[];
          readonly filters: {
            id: string;
            key: string;
            type: string;
            constraint: string;
            value: string;
            viewId: number;
          }[];
        })[]
      >;
      deleteFilters: import('@trpc/server').BuildProcedure<
        'mutation',
        {
          _config: import('@trpc/server').RootConfig<{
            ctx: {};
            meta: object;
            errorShape: {
              data: {
                code:
                  | 'PARSE_ERROR'
                  | 'BAD_REQUEST'
                  | 'INTERNAL_SERVER_ERROR'
                  | 'UNAUTHORIZED'
                  | 'FORBIDDEN'
                  | 'NOT_FOUND'
                  | 'METHOD_NOT_SUPPORTED'
                  | 'TIMEOUT'
                  | 'CONFLICT'
                  | 'PRECONDITION_FAILED'
                  | 'PAYLOAD_TOO_LARGE'
                  | 'UNPROCESSABLE_CONTENT'
                  | 'TOO_MANY_REQUESTS'
                  | 'CLIENT_CLOSED_REQUEST';
                httpStatus: number;
                path?: string | undefined;
                stack?: string | undefined;
              };
              message: string;
              code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
            };
            transformer: import('@trpc/server').DefaultDataTransformer;
          }>;
          _meta: object;
          _ctx_out: {};
          _input_in: {
            id: string;
            viewId: number;
          }[];
          _input_out: {
            id: string;
            viewId: number;
          }[];
          _output_in: typeof import('@trpc/server').unsetMarker;
          _output_out: typeof import('@trpc/server').unsetMarker;
        },
        never[]
      >;
    }
  >;
}
declare module 'trpc/routers/index' {
  export const appRouter: import('@trpc/server').CreateRouterInner<
    import('@trpc/server').RootConfig<{
      ctx: {};
      meta: object;
      errorShape: {
        data: {
          code:
            | 'PARSE_ERROR'
            | 'BAD_REQUEST'
            | 'INTERNAL_SERVER_ERROR'
            | 'UNAUTHORIZED'
            | 'FORBIDDEN'
            | 'NOT_FOUND'
            | 'METHOD_NOT_SUPPORTED'
            | 'TIMEOUT'
            | 'CONFLICT'
            | 'PRECONDITION_FAILED'
            | 'PAYLOAD_TOO_LARGE'
            | 'UNPROCESSABLE_CONTENT'
            | 'TOO_MANY_REQUESTS'
            | 'CLIENT_CLOSED_REQUEST';
          httpStatus: number;
          path?: string | undefined;
          stack?: string | undefined;
        };
        message: string;
        code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
      };
      transformer: import('@trpc/server').DefaultDataTransformer;
    }>,
    {
      view: import('@trpc/server').CreateRouterInner<
        import('@trpc/server').RootConfig<{
          ctx: {};
          meta: object;
          errorShape: {
            data: {
              code:
                | 'PARSE_ERROR'
                | 'BAD_REQUEST'
                | 'INTERNAL_SERVER_ERROR'
                | 'UNAUTHORIZED'
                | 'FORBIDDEN'
                | 'NOT_FOUND'
                | 'METHOD_NOT_SUPPORTED'
                | 'TIMEOUT'
                | 'CONFLICT'
                | 'PRECONDITION_FAILED'
                | 'PAYLOAD_TOO_LARGE'
                | 'UNPROCESSABLE_CONTENT'
                | 'TOO_MANY_REQUESTS'
                | 'CLIENT_CLOSED_REQUEST';
              httpStatus: number;
              path?: string | undefined;
              stack?: string | undefined;
            };
            message: string;
            code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
          };
          transformer: import('@trpc/server').DefaultDataTransformer;
        }>,
        {
          createView: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                keys: {
                  type: string;
                  name: string;
                  enabled: boolean;
                }[];
                name: string;
                modelName: string;
                isEditable?: boolean | undefined;
                sortName?: string | undefined;
                sortDir?: string | undefined;
                filters?:
                  | {
                      type: 'string' | 'none';
                      key: string;
                      id: string;
                      value: string;
                      constraint:
                        | 'contains'
                        | 'empty'
                        | 'is'
                        | '!is'
                        | '!contains'
                        | 'starts'
                        | '!starts'
                        | 'ends'
                        | '!ends'
                        | '!empty';
                      viewId: number;
                    }[]
                  | undefined;
              };
              _input_out: {
                keys: {
                  type: string;
                  name: string;
                  enabled: boolean;
                }[];
                name: string;
                modelName: string;
                isEditable?: boolean | undefined;
                sortName?: string | undefined;
                sortDir?: string | undefined;
                filters?:
                  | {
                      type: 'string' | 'none';
                      key: string;
                      id: string;
                      value: string;
                      constraint:
                        | 'contains'
                        | 'empty'
                        | 'is'
                        | '!is'
                        | '!contains'
                        | 'starts'
                        | '!starts'
                        | 'ends'
                        | '!ends'
                        | '!empty';
                      viewId: number;
                    }[]
                  | undefined;
              };
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              isEditable: boolean;
              name: string;
              modelName: string;
              sortName: string;
              sortDir: string;
              dateCreated: Date;
              dateUpdated: Date;
            } & {
              readonly keys: {
                id: number;
                name: string;
                type: string;
                enabled: boolean;
                viewId: number;
              }[];
              readonly filters: {
                id: string;
                key: string;
                type: string;
                constraint: string;
                value: string;
                viewId: number;
              }[];
            }
          >;
          getView: import('@trpc/server').BuildProcedure<
            'query',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                name: string;
                modelName: string;
              };
              _input_out: {
                name: string;
                modelName: string;
              };
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            | ({
                id: number;
                isEditable: boolean;
                name: string;
                modelName: string;
                sortName: string;
                sortDir: string;
                dateCreated: Date;
                dateUpdated: Date;
              } & {
                readonly keys: {
                  id: number;
                  name: string;
                  type: string;
                  enabled: boolean;
                  viewId: number;
                }[];
                readonly filters: {
                  id: string;
                  key: string;
                  type: string;
                  constraint: string;
                  value: string;
                  viewId: number;
                }[];
              })
            | null
          >;
          getViews: import('@trpc/server').BuildProcedure<
            'query',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: string;
              _input_out: string;
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            ({
              id: number;
              isEditable: boolean;
              name: string;
              modelName: string;
              sortName: string;
              sortDir: string;
              dateCreated: Date;
              dateUpdated: Date;
            } & {
              readonly keys: {
                id: number;
                name: string;
                type: string;
                enabled: boolean;
                viewId: number;
              }[];
              readonly filters: {
                id: string;
                key: string;
                type: string;
                constraint: string;
                value: string;
                viewId: number;
              }[];
            })[]
          >;
          updateView: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                id: number;
                name?: string | undefined;
                modelName?: string | undefined;
                sortName?: string | undefined;
                sortDir?: string | undefined;
                filters?:
                  | {
                      type: 'string' | 'none';
                      key: string;
                      id: string;
                      value: string;
                      constraint:
                        | 'contains'
                        | 'empty'
                        | 'is'
                        | '!is'
                        | '!contains'
                        | 'starts'
                        | '!starts'
                        | 'ends'
                        | '!ends'
                        | '!empty';
                      viewId: number;
                    }[]
                  | undefined;
                keys?:
                  | {
                      type: string;
                      name: string;
                      enabled: boolean;
                    }[]
                  | undefined;
              };
              _input_out: {
                id: number;
                name?: string | undefined;
                modelName?: string | undefined;
                sortName?: string | undefined;
                sortDir?: string | undefined;
                filters?:
                  | {
                      type: 'string' | 'none';
                      key: string;
                      id: string;
                      value: string;
                      constraint:
                        | 'contains'
                        | 'empty'
                        | 'is'
                        | '!is'
                        | '!contains'
                        | 'starts'
                        | '!starts'
                        | 'ends'
                        | '!ends'
                        | '!empty';
                      viewId: number;
                    }[]
                  | undefined;
                keys?:
                  | {
                      type: string;
                      name: string;
                      enabled: boolean;
                    }[]
                  | undefined;
              };
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              isEditable: boolean;
              name: string;
              modelName: string;
              sortName: string;
              sortDir: string;
              dateCreated: Date;
              dateUpdated: Date;
            } & {
              readonly keys: {
                id: number;
                name: string;
                type: string;
                enabled: boolean;
                viewId: number;
              }[];
              readonly filters: {
                id: string;
                key: string;
                type: string;
                constraint: string;
                value: string;
                viewId: number;
              }[];
            }
          >;
          deleteView: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: number;
              _input_out: number;
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              isEditable: boolean;
              name: string;
              modelName: string;
              sortName: string;
              sortDir: string;
              dateCreated: Date;
              dateUpdated: Date;
            } & {
              readonly keys: {
                id: number;
                name: string;
                type: string;
                enabled: boolean;
                viewId: number;
              }[];
              readonly filters: {
                id: string;
                key: string;
                type: string;
                constraint: string;
                value: string;
                viewId: number;
              }[];
            }
          >;
          setViewKey: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                name: string;
                viewId: number;
                enabled: boolean;
              };
              _input_out: {
                name: string;
                viewId: number;
                enabled: boolean;
              };
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              name: string;
              type: string;
              enabled: boolean;
            }
          >;
          updateViews: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                id: number;
                name?: string | undefined;
                modelName?: string | undefined;
                sortName?: string | undefined;
                sortDir?: string | undefined;
                filters?:
                  | {
                      type: 'string' | 'none';
                      key: string;
                      id: string;
                      value: string;
                      constraint:
                        | 'contains'
                        | 'empty'
                        | 'is'
                        | '!is'
                        | '!contains'
                        | 'starts'
                        | '!starts'
                        | 'ends'
                        | '!ends'
                        | '!empty';
                      viewId: number;
                    }[]
                  | undefined;
                keys?:
                  | {
                      type: string;
                      name: string;
                      enabled: boolean;
                    }[]
                  | undefined;
              }[];
              _input_out: {
                id: number;
                name?: string | undefined;
                modelName?: string | undefined;
                sortName?: string | undefined;
                sortDir?: string | undefined;
                filters?:
                  | {
                      type: 'string' | 'none';
                      key: string;
                      id: string;
                      value: string;
                      constraint:
                        | 'contains'
                        | 'empty'
                        | 'is'
                        | '!is'
                        | '!contains'
                        | 'starts'
                        | '!starts'
                        | 'ends'
                        | '!ends'
                        | '!empty';
                      viewId: number;
                    }[]
                  | undefined;
                keys?:
                  | {
                      type: string;
                      name: string;
                      enabled: boolean;
                    }[]
                  | undefined;
              }[];
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            ({
              id: number;
              isEditable: boolean;
              name: string;
              modelName: string;
              sortName: string;
              sortDir: string;
              dateCreated: Date;
              dateUpdated: Date;
            } & {
              readonly keys: {
                id: number;
                name: string;
                type: string;
                enabled: boolean;
                viewId: number;
              }[];
              readonly filters: {
                id: string;
                key: string;
                type: string;
                constraint: string;
                value: string;
                viewId: number;
              }[];
            })[]
          >;
          deleteFilters: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                id: string;
                viewId: number;
              }[];
              _input_out: {
                id: string;
                viewId: number;
              }[];
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            never[]
          >;
        }
      >;
      asset: import('@trpc/server').CreateRouterInner<
        import('@trpc/server').RootConfig<{
          ctx: {};
          meta: object;
          errorShape: {
            data: {
              code:
                | 'PARSE_ERROR'
                | 'BAD_REQUEST'
                | 'INTERNAL_SERVER_ERROR'
                | 'UNAUTHORIZED'
                | 'FORBIDDEN'
                | 'NOT_FOUND'
                | 'METHOD_NOT_SUPPORTED'
                | 'TIMEOUT'
                | 'CONFLICT'
                | 'PRECONDITION_FAILED'
                | 'PAYLOAD_TOO_LARGE'
                | 'UNPROCESSABLE_CONTENT'
                | 'TOO_MANY_REQUESTS'
                | 'CLIENT_CLOSED_REQUEST';
              httpStatus: number;
              path?: string | undefined;
              stack?: string | undefined;
            };
            message: string;
            code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
          };
          transformer: import('@trpc/server').DefaultDataTransformer;
        }>,
        {
          getAll: import('@trpc/server').BuildProcedure<
            'query',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _ctx_out: {};
              _input_in: typeof import('@trpc/server').unsetMarker;
              _input_out: typeof import('@trpc/server').unsetMarker;
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
              _meta: object;
            },
            {
              id: number;
              title: string;
              name: string;
              url: string;
              blurhash: string | null;
              extension: string;
              size: number;
              type: string;
              timestamp: string;
              dateCreated: Date;
              dateUpdated: Date;
              notes: string;
              singleImageId: number | null;
              singleImagesId: number | null;
            }[]
          >;
          getOne: import('@trpc/server').BuildProcedure<
            'query',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: number;
              _input_out: number;
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              title: string;
              name: string;
              url: string;
              blurhash: string | null;
              extension: string;
              size: number;
              type: string;
              timestamp: string;
              dateCreated: Date;
              dateUpdated: Date;
              notes: string;
              singleImageId: number | null;
              singleImagesId: number | null;
            } | null
          >;
          upsertOne: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: {
                id: number;
                title: string;
              };
              _input_out: {
                id: number;
                title: string;
              };
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              title: string;
              name: string;
              url: string;
              blurhash: string | null;
              extension: string;
              size: number;
              type: string;
              timestamp: string;
              dateCreated: Date;
              dateUpdated: Date;
              notes: string;
              singleImageId: number | null;
              singleImagesId: number | null;
            }
          >;
          delete: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: number;
              _input_out: number;
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            {
              id: number;
              title: string;
              name: string;
              url: string;
              blurhash: string | null;
              extension: string;
              size: number;
              type: string;
              timestamp: string;
              dateCreated: Date;
              dateUpdated: Date;
              notes: string;
              singleImageId: number | null;
              singleImagesId: number | null;
            }
          >;
          deleteMany: import('@trpc/server').BuildProcedure<
            'mutation',
            {
              _config: import('@trpc/server').RootConfig<{
                ctx: {};
                meta: object;
                errorShape: {
                  data: {
                    code:
                      | 'PARSE_ERROR'
                      | 'BAD_REQUEST'
                      | 'INTERNAL_SERVER_ERROR'
                      | 'UNAUTHORIZED'
                      | 'FORBIDDEN'
                      | 'NOT_FOUND'
                      | 'METHOD_NOT_SUPPORTED'
                      | 'TIMEOUT'
                      | 'CONFLICT'
                      | 'PRECONDITION_FAILED'
                      | 'PAYLOAD_TOO_LARGE'
                      | 'UNPROCESSABLE_CONTENT'
                      | 'TOO_MANY_REQUESTS'
                      | 'CLIENT_CLOSED_REQUEST';
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                  };
                  message: string;
                  code: import('@trpc/server/dist/rpc').TRPC_ERROR_CODE_NUMBER;
                };
                transformer: import('@trpc/server').DefaultDataTransformer;
              }>;
              _meta: object;
              _ctx_out: {};
              _input_in: number[];
              _input_out: number[];
              _output_in: typeof import('@trpc/server').unsetMarker;
              _output_out: typeof import('@trpc/server').unsetMarker;
            },
            import('.prisma/client').Prisma.BatchPayload
          >;
        }
      >;
    }
  >;
  export type AppRouter = typeof appRouter;
}
