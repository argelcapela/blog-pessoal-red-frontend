import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem {
	public idPostagem: number
	public titulo: string
	public texto: string
	public data: Date
	public fk_usuario: User
	public fk_tema: Tema
	public imagem: String
}
