import { Database, OPEN_CREATE, OPEN_READWRITE} from "sqlite3";
import path from "path";

const pathToDb = path.join(process.cwd(), "database");

const db = new Database(`${pathToDb}/blog.db`, OPEN_READWRITE | OPEN_CREATE);
db.run(`CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE)`);
db.run(`CREATE TABLE IF NOT EXISTS author (id, name)`);
db.run(`CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, slug TEXT, conteudo TEXT, author_id INTEGER, created_at DATE, FOREIGN KEY(author_id) REFERENCES Author(id) ON DELETE CASCADE)`);
db.run(`CREATE TABLE IF NOT EXISTS midias (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_arquivo TEXT, descricao TEXT, post_id INTEGER, url TEXT, FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE)`);;

export default db;