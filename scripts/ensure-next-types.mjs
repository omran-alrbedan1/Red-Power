import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const files = [
  ".next/types/routes.d.ts",
  ".next/types/root-params.d.ts",
  ".next/types/cache-life.d.ts",
  ".next/types/validator.ts",
  ".next/types/app/layout.ts",
  ".next/types/app/page.ts",
  ".next/types/app/[locale]/layout.ts",
  ".next/types/app/[locale]/page.ts",
  ".next/types/app/[locale]/about/page.ts",
  ".next/types/app/[locale]/contact/page.ts",
  ".next/types/app/[locale]/custom-design/page.ts",
  ".next/types/app/api/contact/route.ts",
  ".next/types/app/api/health/route.ts",
  ".next/types/app/api/service-request/route.ts",
  ".next/dev/types/routes.d.ts",
  ".next/dev/types/root-params.d.ts",
  ".next/dev/types/cache-life.d.ts",
  ".next/dev/types/server.d.ts",
  ".next/dev/types/validator.ts",
  ".next/dev/types/app/layout.ts",
  ".next/dev/types/app/page.ts",
  ".next/dev/types/app/[locale]/layout.ts",
  ".next/dev/types/app/[locale]/page.ts",
  ".next/dev/types/app/[locale]/about/page.ts",
  ".next/dev/types/app/[locale]/contact/page.ts",
  ".next/dev/types/app/[locale]/custom-design/page.ts",
  ".next/dev/types/app/api/contact/route.ts",
  ".next/dev/types/app/api/service-request/route.ts",
];

for (const relativePath of files) {
  const fullPath = join(process.cwd(), relativePath);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, "export {};\n");
}
