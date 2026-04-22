export interface DbClient {
  // Model User (untuk route /users)
  user: {
    findMany: () => Promise<any[]>;
    findUnique: (args: { where: { email: string } }) => Promise<any>;
    create: (args: { data: any }) => Promise<any>;
  };
}