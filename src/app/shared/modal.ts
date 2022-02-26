/* eslint-disable @typescript-eslint/naming-convention */
export interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
}

export enum TodoStatus{
    DONE = 'done',
    OPEN = 'open'
};
