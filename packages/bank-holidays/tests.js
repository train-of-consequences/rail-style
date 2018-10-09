import bankHolidays from "./index.json"
import schema from "./schema.json"
import * as jsonSchema from "jsonschema"

const validated = new jsonSchema.Validator().validate(bankHolidays, schema)

it(`matches the expected schema`, () => expect(validated.errors).toEqual([]))
