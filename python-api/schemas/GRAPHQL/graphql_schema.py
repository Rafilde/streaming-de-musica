"""
Schema GraphQL com tipos para Usuário, Música e Playlist
Utiliza Strawberry para definir tipos e resolvers
"""

import strawberry
from typing import List, Optional


@strawberry.type
class Usuario:
    """Tipo para representar um Usuário"""
    id: str
    nome: str
    idade: int


@strawberry.type
class Musica:
    """Tipo para representar uma Música"""
    id: int
    nome: str
    artista: str


@strawberry.type
class Playlist:
    """Tipo para representar uma Playlist com suas músicas"""
    id: int
    nome: str
    usuario_id: Optional[str] = None
    musicas: List[Musica] = strawberry.field(default_factory=list)


@strawberry.type
class UsuarioComPlaylists:
    """Tipo para representar um Usuário com suas playlists"""
    id: str
    nome: str
    idade: int
    playlists: List[Playlist] = strawberry.field(default_factory=list)


@strawberry.type
class Query:
    """
    Queries GraphQL para consultar dados
    Reutiliza as funções da camada de services
    """
    
    @strawberry.field
    def listar_usuarios(self) -> List[Usuario]:
        """Retorna a lista de todos os usuários"""
        from services.auth_service import listar_todos_usuarios
        
        try:
            usuarios_dados = listar_todos_usuarios()
            return [
                Usuario(id=u["id"], nome=u["nome"], idade=u["idade"])
                for u in usuarios_dados
            ]
        except Exception as e:
            raise Exception(f"Erro ao listar usuários: {str(e)}")
    
    @strawberry.field
    def listar_musicas(self) -> List[Musica]:
        """Retorna a lista de todas as músicas"""
        from services.music_service import obter_todas_musicas
        
        try:
            musicas_dados = obter_todas_musicas()
            return [
                Musica(id=m["id"], nome=m["nome"], artista=m["artista"])
                for m in musicas_dados
            ]
        except Exception as e:
            raise Exception(f"Erro ao listar músicas: {str(e)}")
    
    @strawberry.field
    def obter_playlists_usuario(self, usuario_id: str) -> List[Playlist]:
        """Retorna todas as playlists de um usuário específico com suas músicas"""
        from services.playlist_service import listar_playlists_usuario_com_musicas
        
        try:
            playlists_dados = listar_playlists_usuario_com_musicas(usuario_id)
            resultado = []
            for p in playlists_dados:
                musicas = [
                    Musica(id=m["id"], nome=m["nome"], artista=m["artista"])
                    for m in p.get("musicas", [])
                ]
                resultado.append(
                    Playlist(
                        id=p["id"],
                        nome=p["nome"],
                        usuario_id=usuario_id,
                        musicas=musicas
                    )
                )
            return resultado
        except Exception as e:
            raise Exception(f"Erro ao listar playlists do usuário: {str(e)}")
    
    @strawberry.field
    def obter_musicas_playlist(self, playlist_id: int) -> Playlist:
        """Retorna as músicas de uma playlist específica"""
        from services.playlist_service import obter_playlist_detalhada
        
        try:
            playlist_dados = obter_playlist_detalhada(playlist_id)
            if not playlist_dados:
                raise Exception("Playlist não encontrada")
            
            musicas = [
                Musica(id=m["id"], nome=m["nome"], artista=m["artista"])
                for m in playlist_dados.get("musicas", [])
            ]
            return Playlist(
                id=playlist_dados["id"],
                nome=playlist_dados["nome"],
                musicas=musicas
            )
        except Exception as e:
            raise Exception(f"Erro ao obter músicas da playlist: {str(e)}")
    
    @strawberry.field
    def obter_playlists_musica(self, musica_id: int) -> List[Playlist]:
        """Retorna todas as playlists que contêm uma música específica"""
        from services.playlist_service import listar_playlists_com_musica
        
        try:
            playlists_dados = listar_playlists_com_musica(musica_id)
            return [
                Playlist(
                    id=p["id"],
                    nome=p["nome"],
                    usuario_id=p.get("usuario_id", ""),
                    musicas=[]
                )
                for p in playlists_dados
            ]
        except Exception as e:
            raise Exception(f"Erro ao listar playlists da música: {str(e)}")


@strawberry.type
class Mutation:
    """
    Mutations GraphQL para criar e modificar dados
    Reutiliza as funções da camada de services
    """
    
    @strawberry.mutation
    def criar_usuario(
        self,
        email: str,
        senha: str,
        nome: str,
        idade: int
    ) -> Usuario:
        """Cria um novo usuário"""
        from services.auth_service import cadastrar_usuario
        
        try:
            resultado = cadastrar_usuario(
                email=email,
                senha=senha,
                nome=nome,
                idade=idade
            )
            return Usuario(
                id=resultado["id"],
                nome=resultado["nome"],
                idade=idade
            )
        except Exception as e:
            raise Exception(f"Erro ao criar usuário: {str(e)}")
    
    @strawberry.mutation
    def login(self, email: str, senha: str) -> Usuario:
        """Realiza login e retorna os dados do usuário"""
        from services.auth_service import autenticar_usuario
        
        try:
            resultado = autenticar_usuario(email, senha)
            
            dados_info = resultado.get("info", {})
            
            return Usuario(
                id=resultado["id"],
                nome=dados_info.get("nome", "Desconhecido"),
                idade=dados_info.get("idade", 0)
            )
        except Exception as e:
            raise Exception(f"Falha na autenticação: {str(e)}")
    
    @strawberry.mutation
    def criar_musica(self, nome: str, artista: str) -> Musica:
        """Cria uma nova música"""
        from services.music_service import cadastrar_musica
        
        try:
            resultado = cadastrar_musica(nome=nome, artista=artista)
            return Musica(
                id=resultado["id"],
                nome=resultado["nome"],
                artista=resultado["artista"]
            )
        except Exception as e:
            raise Exception(f"Erro ao criar música: {str(e)}")
    
    @strawberry.mutation
    def criar_playlist(self, nome: str, usuario_id: str) -> Playlist:
        """Cria uma nova playlist para um usuário"""
        from services.playlist_service import criar_playlist_servico
        
        try:
            resultado = criar_playlist_servico(nome=nome, usuario_id=usuario_id)
            return Playlist(
                id=resultado["id"],
                nome=resultado["nome"],
                usuario_id=usuario_id,
                musicas=[]
            )
        except Exception as e:
            raise Exception(f"Erro ao criar playlist: {str(e)}")
    
    @strawberry.mutation
    def adicionar_musica_playlist(
        self,
        playlist_id: int,
        musica_id: int
    ) -> str:
        """Adiciona uma música a uma playlist"""
        from services.playlist_service import adicionar_musica_servico
        
        try:
            adicionar_musica_servico(playlist_id=playlist_id, musica_id=musica_id)
            return "Música adicionada com sucesso à playlist"
        except Exception as e:
            raise Exception(f"Erro ao adicionar música à playlist: {str(e)}")


schema = strawberry.Schema(query=Query, mutation=Mutation)
