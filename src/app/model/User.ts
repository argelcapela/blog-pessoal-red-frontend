import { Postagem } from "./Postagem"

export class User {
	public idUsuario: number
	public nomeCompleto: string
	public login: string
	public senhaUsuario: string
	public emailUsuario: string
	public foto: string
	public tipo: string
	public postagens: Postagem[]
}
