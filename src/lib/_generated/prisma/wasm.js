
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ResumeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  description: 'description',
  photoUrl: 'photoUrl',
  colorHex: 'colorHex',
  borderStyle: 'borderStyle',
  summary: 'summary',
  firstName: 'firstName',
  lastName: 'lastName',
  jobTitle: 'jobTitle',
  city: 'city',
  country: 'country',
  phone: 'phone',
  email: 'email',
  skills: 'skills',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkExperienceScalarFieldEnum = {
  id: 'id',
  position: 'position',
  company: 'company',
  startDate: 'startDate',
  endDate: 'endDate',
  description: 'description',
  resumeId: 'resumeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  degree: 'degree',
  school: 'school',
  startDate: 'startDate',
  endDate: 'endDate',
  description: 'description',
  resumeId: 'resumeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserSubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  stripeCustomerId: 'stripeCustomerId',
  stripeSubscriptionId: 'stripeSubscriptionId',
  stripePriceId: 'stripePriceId',
  stripeCurrentPeriodEnd: 'stripeCurrentPeriodEnd',
  stripeCancelAtPeriodEnd: 'stripeCancelAtPeriodEnd',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Resume: 'Resume',
  WorkExperience: 'WorkExperience',
  Education: 'Education',
  UserSubscription: 'UserSubscription'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "P:\\NextJS\\ai-resume-builder\\src\\lib\\_generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "P:\\NextJS\\ai-resume-builder\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://ai-resume-builder-db_owner:npg_KEuoZh47TMAr@ep-mute-meadow-a2mhfodj-pooler.eu-central-1.aws.neon.tech/ai-resume-builder-db?sslmode=require"
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src/lib/_generated/prisma\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Resume {\n  id     String @id @default(cuid())\n  userId String @map(\"user_id\")\n\n  title       String?\n  description String?\n\n  photoUrl    String?  @map(\"photo_url\")\n  colorHex    String   @default(\"#000000\") @map(\"color_hex\")\n  borderStyle String   @default(\"squircle\") @map(\"border_style\")\n  summary     String?\n  firstName   String?  @map(\"first_name\")\n  lastName    String?  @map(\"last_name\")\n  jobTitle    String?  @map(\"job_title\")\n  city        String?\n  country     String?\n  phone       String?\n  email       String?\n  skills      String[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  workExperiences WorkExperience[]\n  educations      Education[]\n\n  @@map(\"resumes\")\n}\n\nmodel WorkExperience {\n  id String @id @default(cuid())\n\n  position    String?\n  company     String?\n  startDate   DateTime? @map(\"start_date\")\n  endDate     DateTime? @map(\"end_date\")\n  description String?\n\n  resumeId String @map(\"resume_id\")\n  resume   Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"work_experiences\")\n}\n\nmodel Education {\n  id String @id @default(cuid())\n\n  degree      String?\n  school      String?\n  startDate   DateTime? @map(\"start_date\")\n  endDate     DateTime? @map(\"end_date\")\n  description String?\n\n  resumeId String @map(\"resume_id\")\n  resume   Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"educations\")\n}\n\nmodel UserSubscription {\n  id                      String   @id @default(cuid())\n  userId                  String   @unique @map(\"user_id\")\n  stripeCustomerId        String   @unique @map(\"stripe_customer_id\")\n  stripeSubscriptionId    String   @unique @map(\"stripe_subscription_id\")\n  stripePriceId           String   @map(\"stripe_price_id\")\n  stripeCurrentPeriodEnd  DateTime @map(\"stripe_current_period_end\")\n  stripeCancelAtPeriodEnd Boolean  @default(false) @map(\"stripe_cancel_at_period_end\")\n  createdAt               DateTime @default(now()) @map(\"created_at\")\n  updatedAt               DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"user_subscriptions\")\n}\n",
  "inlineSchemaHash": "f70a6d04a697e5c661cf7447cf8df8afff530181011d6d8d4334a10b657802ef",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Resume\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photoUrl\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"photo_url\"},{\"name\":\"colorHex\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"color_hex\"},{\"name\":\"borderStyle\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"border_style\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"firstName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"first_name\"},{\"name\":\"lastName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"last_name\"},{\"name\":\"jobTitle\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"job_title\"},{\"name\":\"city\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"skills\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"workExperiences\",\"kind\":\"object\",\"type\":\"WorkExperience\",\"relationName\":\"ResumeToWorkExperience\"},{\"name\":\"educations\",\"kind\":\"object\",\"type\":\"Education\",\"relationName\":\"EducationToResume\"}],\"dbName\":\"resumes\"},\"WorkExperience\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"position\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"company\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"start_date\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"end_date\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resumeId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"resume_id\"},{\"name\":\"resume\",\"kind\":\"object\",\"type\":\"Resume\",\"relationName\":\"ResumeToWorkExperience\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"work_experiences\"},\"Education\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"degree\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"school\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"start_date\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"end_date\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resumeId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"resume_id\"},{\"name\":\"resume\",\"kind\":\"object\",\"type\":\"Resume\",\"relationName\":\"EducationToResume\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"educations\"},\"UserSubscription\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"stripeCustomerId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"stripe_customer_id\"},{\"name\":\"stripeSubscriptionId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"stripe_subscription_id\"},{\"name\":\"stripePriceId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"stripe_price_id\"},{\"name\":\"stripeCurrentPeriodEnd\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"stripe_current_period_end\"},{\"name\":\"stripeCancelAtPeriodEnd\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"stripe_cancel_at_period_end\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"user_subscriptions\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

