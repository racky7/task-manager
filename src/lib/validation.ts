import { z } from "zod";

export const cuid = z.string().regex(/^c[a-z0-9]{24}$/);
