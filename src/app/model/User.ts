import { Postagem } from "./Postagem"

export class User {
	public idUsuario: number
	public nomeCompleto: string
	public senhaUsuario: string
	public foto: string
	public tipo: string
	public postagem: Postagem[]
}
