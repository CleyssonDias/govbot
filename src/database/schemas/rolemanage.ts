import { Schema } from "mongoose";
import { t } from "../utils.js";

export const roleManageSchema = new Schema(
    {
        roleid: t.string,
        promote: [{
            roleName: t.string,
            roleid: t.string,
        }],
        demote: [{
            roleName: t.string,
            roleid: t.string,
        }],
    },
);