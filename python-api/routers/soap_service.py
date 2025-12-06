from spyne import Application, rpc, ServiceBase, Integer, Unicode, String, Array, ComplexModel, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from services import auth_service, music_service, playlist_service

class MensagemSucesso(ComplexModel):
    status = Unicode
    mensagem = Unicode

class Usuario(ComplexModel):
    id = String
    nome = Unicode
    idade = Integer
    email = Unicode

class Musica(ComplexModel):
    id = Integer
    nome = Unicode
    artista = Unicode

class Playlist(ComplexModel):
    id = Integer
    nome = Unicode
    usuario_id = String
    musicas = Array(Musica)

class ListaPlaylists(ComplexModel):
    playlists = Array(Playlist)


class StreamingSOAPService(ServiceBase):
    
    @rpc(Unicode, Unicode, Unicode, Integer, _returns=Usuario)
    def RegistrarUsuario(ctx, email, senha, nome, idade):
        res = auth_service.cadastrar_usuario(email, senha, nome, idade)
        return Usuario(
            id=str(res["id"]),
            nome=res["nome"],
            email=email,
            idade=idade
        )

    @rpc(Unicode, Unicode, _returns=Usuario)
    def Login(ctx, email, senha):
        res = auth_service.autenticar_usuario(email, senha)
        info = res.get("info", {})
        
        return Usuario(
            id=str(res["id"]),
            nome=info.get("nome"),
            idade=info.get("idade"),
            email=email
        )

    @rpc(_returns=Array(Usuario))
    def ListarUsuarios(ctx):
        res = auth_service.listar_todos_usuarios()
        lista = []
        for u in res:
            lista.append(Usuario(
                id=str(u["id"]),
                nome=u["nome"],
                idade=u["idade"]
            ))
        return lista

    @rpc(Unicode, Unicode, _returns=Musica)
    def CriarMusica(ctx, nome, artista):
        res = music_service.cadastrar_musica(nome, artista)
        return Musica(
            id=res["id"],
            nome=res["nome"],
            artista=res["artista"]
        )

    @rpc(_returns=Array(Musica))
    def ListarMusicas(ctx):
        res = music_service.obter_todas_musicas()
        lista = []
        for m in res:
            lista.append(Musica(id=m["id"], nome=m["nome"], artista=m["artista"]))
        return lista

    @rpc(Unicode, Unicode, _returns=Playlist)
    def CriarPlaylist(ctx, nome, usuario_id):
        res = playlist_service.criar_playlist_servico(nome, usuario_id)
        return Playlist(
            id=res["id"],
            nome=res["nome"],
            usuario_id=res["usuario_id"],
            musicas=[]
        )

    @rpc(Integer, Integer, _returns=MensagemSucesso)
    def AdicionarMusicaPlaylist(ctx, playlist_id, musica_id):
        playlist_service.adicionar_musica_servico(playlist_id, musica_id)
        return MensagemSucesso(status="OK", mensagem="Música adicionada com sucesso")

    @rpc(Integer, _returns=Playlist)
    def ObterPlaylist(ctx, playlist_id):
        res = playlist_service.obter_playlist_detalhada(playlist_id)
        if not res:
            return None
        
        lista_musicas = []
        for m in res.get("musicas", []):
            lista_musicas.append(Musica(id=m["id"], nome=m["nome"], artista=m["artista"]))

        return Playlist(
            id=res["id"],
            nome=res["nome"],
            usuario_id=res.get("usuario_id"),
            musicas=lista_musicas
        )

    @rpc(Unicode, _returns=Array(Playlist))
    def ListarPlaylistsUsuario(ctx, usuario_id):
        res = playlist_service.listar_playlists_usuario_com_musicas(usuario_id)
        resultado = []
        
        for p in res:
            lista_musicas = [
                Musica(id=m["id"], nome=m["nome"], artista=m["artista"]) 
                for m in p.get("musicas", [])
            ]
            resultado.append(Playlist(
                id=p["id"],
                nome=p["nome"],
                usuario_id=usuario_id,
                musicas=lista_musicas
            ))
        return resultado

    @rpc(Integer, _returns=Array(Playlist))
    def ListarPlaylistsDaMusica(ctx, musica_id):
        res = playlist_service.listar_playlists_com_musica(musica_id)
        resultado = []
        for p in res:
            resultado.append(Playlist(
                id=p["id"],
                nome=p["nome"],
                usuario_id=p.get("usuario_id"),
                musicas=[] 
            ))
        return resultado

soap_app = Application(
    [StreamingSOAPService],
    tns='streaming.soap',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11(),
)

wsgi_app = WsgiApplication(soap_app)