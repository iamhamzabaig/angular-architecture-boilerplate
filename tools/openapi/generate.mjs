import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generate } from 'openapi-typescript-codegen';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..', '..');

const schemaFile = path.join(workspaceRoot, 'openapi', 'specs', 'core-api.yaml');
const outputDirectory = path.join(
  workspaceRoot,
  'libs',
  'platform',
  'api-client-generated',
  'src',
  'lib',
  'generated',
);

await generate({
  input: schemaFile,
  output: outputDirectory,
  exportCore: false,
  exportServices: false,
  exportModels: true,
  exportSchemas: false,
  useOptions: true,
  useUnionTypes: false,
});

console.log(`OpenAPI models generated at ${outputDirectory}`);
