import { assert } from "chai";
import { resolve } from "path";
import { createFormatter } from "../factory/formatter";
import { createParser } from "../factory/parser";
import { createProgram } from "../factory/program";
import { Config } from "../src/Config";
import { SchemaGenerator } from "../src/SchemaGenerator";

function assertSchema(name: string, type: string): void {
    it(name, () => {
        const basePath = "test/invalid-data";
        const config: Config = {
            path: resolve(`${basePath}/${name}/*.ts`),
            type: type,

            expose: "export",
            topRef: true,
            jsDoc: "none",
            sortProps: true,
        };

        const program = createProgram(config);
        const generator = new SchemaGenerator(
            program,
            createParser(program, config),
            createFormatter(config),
        );

        assert.throws(() => generator.createSchema(type));
    });
}

describe("invalid-data", () => {
    // TODO: template recursive

    assertSchema("script-empty", "MyType");
});
