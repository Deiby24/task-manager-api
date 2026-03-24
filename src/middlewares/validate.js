const { z } = require("zod");

const VALID_STATUSES = ["pending", "in_progress", "done"];



const createTaskSchema = z.object({
  title: z
    .string({ required_error: "El campo 'title' es obligatorio" })
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),

  description: z
    .string()
    .max(300, "La descripción no puede superar los 300 caracteres")
    .optional(),

  status: z
    .enum(VALID_STATUSES, {
      errorMap: (_issue, ctx) => ({
        message: `El estado debe ser uno de: ${VALID_STATUSES.join(", ")}. Recibido: '${ctx.data}'`,
      }),
    })
    .optional(),
});

const updateStatusSchema = z.object({
  status: z
    .enum(VALID_STATUSES, {
      errorMap: (_issue, ctx) => {
        if (ctx.data === undefined) return { message: "El campo 'status' es obligatorio" };
        return { message: `El estado debe ser uno de: ${VALID_STATUSES.join(", ")}. Recibido: '${ctx.data}'` };
      },
    }),
});

const statusQuerySchema = z.object({
  status: z
    .enum(VALID_STATUSES, {
      errorMap: () => ({
        message: `El filtro 'status' debe ser uno de: ${VALID_STATUSES.join(", ")}`,
      }),
    })
    .optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});



function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join(".") || source,
        message: e.message,
      }));
      return res.status(400).json({
        status: "error",
        message: "Datos de entrada inválidos",
        errors,
      });
    }
    req[source] = result.data; 
    next();
  };
}

module.exports = { validate, createTaskSchema, updateStatusSchema, statusQuerySchema };
