import { db } from "$lib/server/db/index";
import { facturas } from "$lib/server/db/schema";

export const load = async () => {
  const factura = await db.select().from(facturas);
  if (!factura) throw new Error("Factura not found");
  return {factura}
}
