/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query AllHabits {\n    habits {\n      id\n      habitName\n      description\n      createdAt\n      completedToday\n      currentStreak\n    }\n  }\n": typeof types.AllHabitsDocument,
    "\n  mutation CreateHabit($data: CreateHabitInput!) {\n    createHabit(data: $data) {\n      id\n      habitName\n      description\n      createdAt\n    }\n  }\n": typeof types.CreateHabitDocument,
    "\n  mutation DeleteHabit($habitId: String!) {\n    deleteHabit(habitId: $habitId)\n  }\n": typeof types.DeleteHabitDocument,
    "\n  mutation ToggleHabit($input: ToggleHabitInput!) {\n    toggleHabit(input: $input) {\n      completed\n      habit {\n        currentStreak\n      }\n    }\n  }\n": typeof types.ToggleHabitDocument,
};
const documents: Documents = {
    "\n  query AllHabits {\n    habits {\n      id\n      habitName\n      description\n      createdAt\n      completedToday\n      currentStreak\n    }\n  }\n": types.AllHabitsDocument,
    "\n  mutation CreateHabit($data: CreateHabitInput!) {\n    createHabit(data: $data) {\n      id\n      habitName\n      description\n      createdAt\n    }\n  }\n": types.CreateHabitDocument,
    "\n  mutation DeleteHabit($habitId: String!) {\n    deleteHabit(habitId: $habitId)\n  }\n": types.DeleteHabitDocument,
    "\n  mutation ToggleHabit($input: ToggleHabitInput!) {\n    toggleHabit(input: $input) {\n      completed\n      habit {\n        currentStreak\n      }\n    }\n  }\n": types.ToggleHabitDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllHabits {\n    habits {\n      id\n      habitName\n      description\n      createdAt\n      completedToday\n      currentStreak\n    }\n  }\n"): (typeof documents)["\n  query AllHabits {\n    habits {\n      id\n      habitName\n      description\n      createdAt\n      completedToday\n      currentStreak\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateHabit($data: CreateHabitInput!) {\n    createHabit(data: $data) {\n      id\n      habitName\n      description\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateHabit($data: CreateHabitInput!) {\n    createHabit(data: $data) {\n      id\n      habitName\n      description\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteHabit($habitId: String!) {\n    deleteHabit(habitId: $habitId)\n  }\n"): (typeof documents)["\n  mutation DeleteHabit($habitId: String!) {\n    deleteHabit(habitId: $habitId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleHabit($input: ToggleHabitInput!) {\n    toggleHabit(input: $input) {\n      completed\n      habit {\n        currentStreak\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleHabit($input: ToggleHabitInput!) {\n    toggleHabit(input: $input) {\n      completed\n      habit {\n        currentStreak\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;