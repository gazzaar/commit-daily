/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateHabitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  habitName: Scalars['String']['input'];
};

export type Habit = {
  __typename?: 'Habit';
  completedToday: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentStreak: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  entries?: Maybe<Array<HabitEntry>>;
  habitName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type HabitEntry = {
  __typename?: 'HabitEntry';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  habit?: Maybe<Habit>;
  habitId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHabit: Habit;
  deleteHabit: Scalars['Boolean']['output'];
  toggleHabit: HabitEntry;
};


export type MutationCreateHabitArgs = {
  data: CreateHabitInput;
};


export type MutationDeleteHabitArgs = {
  habitId: Scalars['String']['input'];
};


export type MutationToggleHabitArgs = {
  input: ToggleHabitInput;
};

export type Query = {
  __typename?: 'Query';
  habits: Array<Habit>;
};

export type ToggleHabitInput = {
  habitId: Scalars['String']['input'];
};

export type AllHabitsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHabitsQuery = { __typename?: 'Query', habits: Array<{ __typename?: 'Habit', id: string, habitName: string, description: string, createdAt: any, completedToday: boolean, currentStreak: number }> };

export type CreateHabitMutationVariables = Exact<{
  data: CreateHabitInput;
}>;


export type CreateHabitMutation = { __typename?: 'Mutation', createHabit: { __typename?: 'Habit', id: string, habitName: string, description: string, createdAt: any, completedToday: boolean, currentStreak: number } };

export type DeleteHabitMutationVariables = Exact<{
  habitId: Scalars['String']['input'];
}>;


export type DeleteHabitMutation = { __typename?: 'Mutation', deleteHabit: boolean };

export type ToggleHabitMutationVariables = Exact<{
  input: ToggleHabitInput;
}>;


export type ToggleHabitMutation = { __typename?: 'Mutation', toggleHabit: { __typename?: 'HabitEntry', completed: boolean, habit?: { __typename?: 'Habit', currentStreak: number } | null } };


export const AllHabitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllHabits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"habits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"habitName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedToday"}},{"kind":"Field","name":{"kind":"Name","value":"currentStreak"}}]}}]}}]} as unknown as DocumentNode<AllHabitsQuery, AllHabitsQueryVariables>;
export const CreateHabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHabit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHabitInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHabit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"habitName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedToday"}},{"kind":"Field","name":{"kind":"Name","value":"currentStreak"}}]}}]}}]} as unknown as DocumentNode<CreateHabitMutation, CreateHabitMutationVariables>;
export const DeleteHabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHabit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"habitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHabit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"habitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"habitId"}}}]}]}}]} as unknown as DocumentNode<DeleteHabitMutation, DeleteHabitMutationVariables>;
export const ToggleHabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleHabit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ToggleHabitInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleHabit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"habit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentStreak"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleHabitMutation, ToggleHabitMutationVariables>;