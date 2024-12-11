// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT

export interface User {
    id: number,
    email: string,
    name?: string,
    username: string,
    avatar?: string,
    password: string,
    bio?: string,
    posts: Post[],
    active: boolean,
    created_at: Date,
    updated_at: Date,
    token?: Token,
}

export interface Token {
    id: number,
    created_at: Date,
    updated_at: Date,
    hash: string,
    user: User,
    user_id: number,
}

export interface Post {
    id: number,
    title: string,
    description?: string,
    content?: string,
    published?: boolean,
    banner?: string,
    slug: string,
    author: User,
    author_id: number,
    created_at: Date,
    updated_at: Date,
}
