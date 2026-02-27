"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: '../shared/src/schemas/*.ts',
    out: './src/database/migrations',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_PATH ?? './data/jirakli.db',
    },
});
//# sourceMappingURL=drizzle.config.js.map