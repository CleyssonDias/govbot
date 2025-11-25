import { Schema } from "mongoose";
import { t } from "../utils.js";

export const suporteSchema = new Schema(
    {
        nome: t.string,
        descrição: t.string,
        quem: t.number
    }
);