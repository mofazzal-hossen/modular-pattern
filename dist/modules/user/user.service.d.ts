import type { IUser } from "./user.interface";
export declare const userService: {
    createUserIntoDB: (payload: IUser) => Promise<import("pg").QueryResult<any>>;
    getAllUserFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateUserFromDB: (payload: IUser, id: string) => Promise<import("pg").QueryResult<any>>;
    userDeleteFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map