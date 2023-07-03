import { AppRouter } from '@/server/trpc/routers/index';
import { inferRouterOutputs } from '@trpc/server';

declare global {
  type AppRouterOutputs = inferRouterOutputs<AppRouter>;

  type AppRecord = {
    id: number;
    dateUpload: string;
    dateExpire: string | null;
    notes: string | null;
    state: boolean;
    [key: string]: InputValue | Group | Group[number] | null;
  };

  type ControlPanelControls = (
    | 'dateUpload'
    | 'dateExpire'
    | 'state'
    | 'created'
    | 'updated'
  )[];

  type AppStructure = {
    id: number;
    [key: string]: InputValue | Group | Group[number] | null;
  };

  type Revision = {
    id: number;
    revisionName: string;
    dateCreated: string;
    [key: string]: unknown;
  };

  type Revisions = {
    active: Revision;
    all: Revision[];
  };
}

export {};
