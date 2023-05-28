//// SNAKE CASE START ////
export type SnakeCaseToCamelCase<T extends string> = T extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${SnakeCaseToPascalCase<Rest>}`
    : Lowercase<T>

export type SnakeCaseToPascalCase<T extends string> = T extends `${infer First}_${infer Rest}`
    ? `${Capitalize<First>}${SnakeCaseToPascalCase<Rest>}`
    : Capitalize<T>

export type SnakeCaseToConstantCase<T extends string> = Uppercase<T>

export type SnakeCaseToKebabCase<T extends string> = T extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}-${SnakeCaseToKebabCase<Rest>}`
    : Lowercase<T>

//// SNAKE CASE END ////

//// CAMEL CASE START ////

export type CamelCaseToSnakeCase<T extends string> = T extends `${infer First}${infer Rest}`
    ? `${First extends Capitalize<First> ? '_' : ''}${Lowercase<First>}${CamelCaseToSnakeCase<Rest>}`
    : T

export type CamelCaseToPascalCase<T extends string> = Capitalize<T>

export type CamelCaseToConstantCase<T extends string> = T extends `${infer First}${infer Rest}`
    ? `${First extends Capitalize<First> ? '_' : ''}${Uppercase<First>}${CamelCaseToConstantCase<Rest>}`
    : Uppercase<T>

export type CamelCaseToKebabCase<T extends string> = T extends `${infer First}${infer Rest}`
    ? `${First extends Capitalize<First> ? '-' : ''}${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
    : T

//// CAMEL CASE END ////

//// PASCAL CASE START ////
export type PascalCaseToCamelCase<T extends string> = Uncapitalize<T>

export type PascalCaseToSnakeCase<T extends string> = CamelCaseToSnakeCase<Uncapitalize<T>>

export type PascalCaseToConstantCase<T extends string> = CamelCaseToConstantCase<Uncapitalize<T>>

export type PascalCaseToKebabCase<T extends string> = CamelCaseToKebabCase<Uncapitalize<T>>

//// PASCAL CASE END ////

//// CONSTANT CASE START ////
export type ConstantCaseToCamelCase<T extends string> = SnakeCaseToCamelCase<Lowercase<T>>

export type ConstantCaseToSnakeCase<T extends string> = Lowercase<T>

export type ConstantCaseToPascalCase<T extends string> = SnakeCaseToPascalCase<Lowercase<T>>

export type ConstantCaseToKebabCase<T extends string> = SnakeCaseToKebabCase<Lowercase<T>>

//// CONSTANT CASE END ////

export type SplitString<T extends string, D extends string> = T extends `${infer First}${D}${infer Rest}`
    ? [First, ...SplitString<Rest, D>]
    : [T]
