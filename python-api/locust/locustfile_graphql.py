import random
from locust import HttpUser, SequentialTaskSet, task, between

class FluxoUsuarioGraphQL(SequentialTaskSet):
    """
    Define o passo a passo sequencial para o GraphQL.
    Usa Mutations para criar e Queries para buscar, mantendo a ordem lógica.
    """

    def on_start(self):
        self.user_id = None
        self.email = None
        self.password = "#Locust123"
        self.music_id = None
        self.playlist_id = None

    # ==========================================================================
    # PASSO 1: REGISTRAR USUÁRIO (Mutation)
    # ==========================================================================
    @task
    def t01_registrar(self):
        random_id = random.randint(1000, 999999)
        self.email = f"user_gql_{random_id}@teste.com"
        
        # Mutation para criar usuário
        query = """
        mutation {
            criarUsuario(
                email: "%s", 
                senha: "%s", 
                nome: "Usuário GQL %s", 
                idade: 25
            ) {
                id
            }
        }
        """ % (self.email, self.password, random_id)

        with self.client.post("/graphql", json={"query": query}, name="01. GQL - Criar Usuário", catch_response=True) as response:
            # Verifica se deu 200 e se não tem erros no corpo do JSON
            if response.status_code == 200 and "data" in response.json() and response.json()["data"]["criarUsuario"]:
                self.user_id = response.json()["data"]["criarUsuario"]["id"]
            else:
                response.failure(f"Erro no registro GQL: {response.text}")

    # ==========================================================================
    # PASSO 2: LOGIN (Mutation)
    # ==========================================================================
    @task
    def t02_login(self):
        if not self.email: return

        query = """
        mutation {
            login(email: "%s", senha: "%s") {
                id
                nome
            }
        }
        """ % (self.email, self.password)
        
        self.client.post("/graphql", json={"query": query}, name="02. GQL - Login")

    # ==========================================================================
    # PASSO 3: CRIAR MÚSICA (Mutation)
    # ==========================================================================
    @task
    def t03_criar_musica(self):
        random_id = random.randint(1, 9999)
        query = """
        mutation {
            criarMusica(nome: "Música GQL %s", artista: "Artista GQL") {
                id
            }
        }
        """ % (random_id)

        with self.client.post("/graphql", json={"query": query}, name="03. GQL - Criar Música", catch_response=True) as response:
            if response.status_code == 200 and "data" in response.json() and response.json()["data"]["criarMusica"]:
                self.music_id = response.json()["data"]["criarMusica"]["id"]

    # ==========================================================================
    # PASSO 4: LISTAR MÚSICAS (Query)
    # ==========================================================================
    @task
    def t04_listar_musicas(self):
        query = "{ listarMusicas { id nome artista } }"
        self.client.post("/graphql", json={"query": query}, name="04. GQL - Listar Músicas")

    # ==========================================================================
    # PASSO 5: CRIAR PLAYLIST (Mutation)
    # ==========================================================================
    @task
    def t05_criar_playlist(self):
        if not self.user_id: return

        random_id = random.randint(1, 9999)
        query = """
        mutation {
            criarPlaylist(nome: "Playlist GQL %s", usuarioId: "%s") {
                id
            }
        }
        """ % (random_id, self.user_id)

        with self.client.post("/graphql", json={"query": query}, name="05. GQL - Criar Playlist", catch_response=True) as response:
            if response.status_code == 200 and "data" in response.json() and response.json()["data"]["criarPlaylist"]:
                self.playlist_id = response.json()["data"]["criarPlaylist"]["id"]

    # ==========================================================================
    # PASSO 6: ADICIONAR MÚSICA NA PLAYLIST (Mutation)
    # ==========================================================================
    @task
    def t06_add_musica_playlist(self):
        if not self.playlist_id or not self.music_id: return

        query = """
        mutation {
            adicionarMusicaPlaylist(playlistId: %s, musicaId: %s)
        }
        """ % (self.playlist_id, self.music_id)

        self.client.post("/graphql", json={"query": query}, name="06. GQL - Add Música Playlist")

    # ==========================================================================
    # PASSO 7: CONSULTAR A PLAYLIST CRIADA (Query)
    # ==========================================================================
    @task
    def t07_ver_playlist(self):
        if not self.playlist_id: return

        query = """
        query {
            obterMusicasPlaylist(playlistId: %s) {
                id
                nome
                musicas {
                    nome
                }
            }
        }
        """ % (self.playlist_id)
        
        self.client.post("/graphql", json={"query": query}, name="07. GQL - Ver Playlist Específica")

    # ==========================================================================
    # PASSO 8: CONSULTAR PLAYLISTS DO USUÁRIO (Query)
    # ==========================================================================
    @task
    def t08_playlists_do_usuario(self):
        if not self.user_id: return

        query = """
        query {
            obterPlaylistsUsuario(usuarioId: "%s") {
                id
                nome
            }
        }
        """ % (self.user_id)

        self.client.post("/graphql", json={"query": query}, name="08. GQL - Playlists do Usuário")

    # ==========================================================================
    # PASSO 9: LISTAR PLAYLISTS QUE CONTÊM A MÚSICA (Query)
    # ==========================================================================
    @task
    def t09_playlists_com_musica(self):
        if not self.music_id: return

        query = """
        query {
            obterPlaylistsMusica(musicaId: %s) {
                id
                nome
            }
        }
        """ % (self.music_id)

        self.client.post("/graphql", json={"query": query}, name="09. GQL - Playlists com a Música")

    # ==========================================================================
    # PASSO 10: LISTAR TODOS OS USUÁRIOS (Query)
    # ==========================================================================
    @task
    def t10_listar_usuarios(self):
        query = "{ listarUsuarios { id nome idade } }"
        self.client.post("/graphql", json={"query": query}, name="10. GQL - Listar Todos Usuários")

    # ==========================================================================
    # FINAL: Limpa a execução para o próximo loop
    # ==========================================================================
    @task
    def stop(self):
        self.interrupt()

class GraphqlUser(HttpUser):
    tasks = [FluxoUsuarioGraphQL]
    wait_time = between(1, 2)
    host = "http://127.0.0.1:8000"