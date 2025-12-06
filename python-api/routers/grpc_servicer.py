import grpc
from schemas.GRPC import streaming_pb2, streaming_pb2_grpc
from services import auth_service, music_service, playlist_service

class StreamingServicer(streaming_pb2_grpc.StreamingServiceServicer):
    """
    Implementação da lógica do servidor gRPC.
    Aqui conectamos o contrato (.proto) com seus Services Python existentes.
    """

    def RegistrarUsuario(self, request, context):
        try:
            resultado = auth_service.cadastrar_usuario(
                email=request.email,
                senha=request.senha,
                nome=request.nome,
                idade=request.idade
            )
            return streaming_pb2.Usuario(
                id=str(resultado["id"]),
                nome=resultado["nome"],
                email=request.email, 
                idade=request.idade
            )
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def Login(self, request, context):
        try:
            resultado = auth_service.autenticar_usuario(request.email, request.senha)
            dados_info = resultado.get("info", {})

            return streaming_pb2.Usuario(
                id=str(resultado["id"]),
                nome=dados_info.get("nome", "Desconhecido"),
                idade=dados_info.get("idade", 0),
                email=request.email
            )
        except Exception as e:
            context.abort(grpc.StatusCode.UNAUTHENTICATED, str(e))

    def ListarUsuarios(self, request, context):
        try:
            usuarios_db = auth_service.listar_todos_usuarios()
            lista_proto = []
            for u in usuarios_db:
                user_proto = streaming_pb2.Usuario(
                    id=str(u["id"]),
                    nome=u["nome"],
                    idade=u["idade"]
                )
                lista_proto.append(user_proto)
            
            return streaming_pb2.ListaUsuarios(usuarios=lista_proto)
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def CriarMusica(self, request, context):
        try:
            res = music_service.cadastrar_musica(request.nome, request.artista)
            return streaming_pb2.Musica(
                id=res["id"],
                nome=res["nome"],
                artista=res["artista"]
            )
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def ListarMusicas(self, request, context):
        try:
            musicas_db = music_service.obter_todas_musicas()
            lista = [
                streaming_pb2.Musica(id=m["id"], nome=m["nome"], artista=m["artista"])
                for m in musicas_db
            ]
            return streaming_pb2.ListaMusicas(musicas=lista)
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def CriarPlaylist(self, request, context):
        try:
            res = playlist_service.criar_playlist_servico(request.nome, request.usuario_id)
            return streaming_pb2.Playlist(
                id=res["id"],
                nome=res["nome"],
                usuario_id=res["usuario_id"]
            )
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def AdicionarMusicaPlaylist(self, request, context):
        try:
            playlist_service.adicionar_musica_servico(request.playlist_id, request.musica_id)
            return streaming_pb2.MensagemSucesso(
                status="OK",
                mensagem="Música adicionada com sucesso"
            )
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def ObterPlaylist(self, request, context):
        try:
            dados = playlist_service.obter_playlist_detalhada(request.id)
            if not dados:
                context.abort(grpc.StatusCode.NOT_FOUND, "Playlist não encontrada")

            musicas_proto = [
                streaming_pb2.Musica(id=m["id"], nome=m["nome"], artista=m["artista"])
                for m in dados.get("musicas", [])
            ]

            return streaming_pb2.Playlist(
                id=dados["id"],
                nome=dados["nome"],
                usuario_id=dados.get("usuario_id", ""),
                musicas=musicas_proto 
            )
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def ListarPlaylistsUsuario(self, request, context):
        try:
            playlists = playlist_service.listar_playlists_usuario_com_musicas(request.usuario_id)
            lista_final = []
            
            for p in playlists:
                musicas_proto = [
                    streaming_pb2.Musica(id=m["id"], nome=m["nome"], artista=m["artista"])
                    for m in p.get("musicas", [])
                ]
                pl_obj = streaming_pb2.Playlist(
                    id=p["id"],
                    nome=p["nome"],
                    usuario_id=request.usuario_id,
                    musicas=musicas_proto
                )
                lista_final.append(pl_obj)

            return streaming_pb2.ListaPlaylists(playlists=lista_final)
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))

    def ListarPlaylistsDaMusica(self, request, context):
        try:
            playlists = playlist_service.listar_playlists_com_musica(request.id)
            lista = [
                streaming_pb2.Playlist(
                    id=p["id"], 
                    nome=p["nome"], 
                    usuario_id=p.get("usuario_id", "")
                )
                for p in playlists
            ]
            return streaming_pb2.ListaPlaylists(playlists=lista)
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))