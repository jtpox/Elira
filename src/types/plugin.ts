interface databaseObj {
    entity?: string,
}

export default interface Plugin {
    name: string,
    enabled: boolean,
    routes?: string,
    middleware?: string,
    database?: databaseObj,
    tests?: string,
    register?: string,
    decorate?: string,
}