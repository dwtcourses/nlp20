import { AntonymsDetermination } from "./@workers/antonyms-determination/antonyms-determination";

const dotenv = require("dotenv");
dotenv.config();

// (new NounDeclensionDetermination()).browseAndDetermine();

(new AntonymsDetermination()).browseAndDetermine();