import mongoose, { InferSchemaType, model } from "mongoose";
import { roleManageSchema } from "./schemas/rolemanage.js";
import { memberSchema } from "./schemas/member.js";
import { env } from "#env";
import chalk from "chalk";
import { suporteSchema } from "./schemas/suporte.js";

try {
   console.log(chalk.blue("Connecting to MongoDB..."));
   await mongoose.connect(env.MONGO_URI, { 
      dbName: env.DATABASE_NAME || "database" 
   });
   console.log(chalk.green("MongoDB connected"));
} catch(err){
   console.error(err);
   process.exit(1);
}

export const db = {
   rolemanager: model("roleManager", roleManageSchema, "rolesMaganers"),
   members: model("member", memberSchema, "members"),
   suporte: model("suporte", suporteSchema, "suportes")
};

export type RoleManager = InferSchemaType<typeof roleManageSchema>;
export type MemberSchema = InferSchemaType<typeof memberSchema>;
export type SuporteSchema = InferSchemaType<typeof suporteSchema>;