import { setupApi } from "./api";
import { db_repo } from "./t_shirts_repo";
setupApi(db_repo, 5000);
