
---------------------------------
json validator - ajv

tutorial
https://code.tutsplus.com/tutorials/validating-data-with-json-schema-part-1--cms-25343

https://www.npmjs.com/package/ajv

--------------------------------
nodejs 8
async await
-------------------------------

using LevelDB for managing persistent session for tracking a dialogue

LevelDB is thread-safe but is not suitable for accessing with multiple processes. You should only ever have a LevelDB database open from a single Node.js process. Node.js clusters are made up of multiple processes so a LevelUP instance cannot be shared between them either.

See the wiki for some LevelUP extensions, including multilevel, that may help if you require a single data store to be shared across processes.
------------------------------

need to validate i can deploy to bluemix (or zeit?)

----------------------------

RETRIES UNTIL RESOLVES CORRECTLY BEFORE THROWING ERROR

http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html

https://stackoverflow.com/questions/38213668/promise-retry-design-patterns

https://gist.github.com/briancavalier/842626
