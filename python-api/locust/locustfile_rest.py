import random
from locust import HttpUser, SequentialTaskSet, task, between

class FluxoUsuarioRest(SequentialTaskSet):
    """
    Define um passo a passo sequencial que cada usuário vai seguir.
    Isso evita erros de tentar consultar dados que ainda não foram criados.
    """

    def on_start(self):
        self.user_id = None
        self.email = None
        self.password = "#Locust123"
        self.music_id = None
        self.playlist_id = None

    # ==========================================================================
    # PASSO 1: REGISTRAR USUÁRIO (Gera dados dinâmicos)
    # ==========================================================================
    @task
    def t01_registrar(self):
        random_id = random.randint(1000, 999999)
        self.email = f"user_rest_{random_id}@teste.com"
        
        payload = {
            "email": self.email,
            "senha": self.password,
            "nome": f"Usuário {random_id}",
            "idade": random.randint(18, 50)
        }
        
        with self.client.post("/auth/register", json=payload, name="01. POST - Registrar", catch_response=True) as response:
            if response.status_code == 200:
                data = response.json()
                if "dado" in data and "id" in data["dado"]:
                    self.user_id = data["dado"]["id"]
                elif "id" in data:
                    self.user_id = data["id"]
            else:
                response.failure(f"Falha no registro: {response.text}")

    # ==========================================================================
    # PASSO 2: LOGIN
    # ==========================================================================
    @task
    def t02_login(self):
        if not self.email: return # Pula se o registro falhou
        
        payload = {
            "email": self.email,
            "senha": self.password
        }
        self.client.post("/auth/login", json=payload, name="02. POST - Login")

    # ==========================================================================
    # PASSO 3: CRIAR MÚSICA
    # ==========================================================================
    @task
    def t03_criar_musica(self):
        random_id = random.randint(1, 9999)
        payload = {
            "nome": f"Música {random_id}",
            "artista": f"Artista Locust {random_id}",
        }
        
        with self.client.post("/musicas", json=payload, name="03. POST - Criar Música", catch_response=True) as response:
            if response.status_code == 200:
                self.music_id = response.json().get("id")

    # ==========================================================================
    # PASSO 4: LISTAR MÚSICAS (Geral)
    # ==========================================================================
    @task
    def t04_listar_musicas(self):
        self.client.get("/musicas", name="04. GET - Listar Músicas")

    # ==========================================================================
    # PASSO 5: CRIAR PLAYLIST (Depende do Passo 1)
    # ==========================================================================
    @task
    def t05_criar_playlist(self):
        if not self.user_id: return 

        payload = {
            "nome": f"Minha Playlist Locust {random.randint(1, 9999)}",
            "usuario_id": self.user_id
        }
        
        with self.client.post("/playlists", json=payload, name="05. POST - Criar Playlist", catch_response=True) as response:
            if response.status_code == 200:
                self.playlist_id = response.json().get("id")

    # ==========================================================================
    # PASSO 6: ADICIONAR MÚSICA NA PLAYLIST
    # ==========================================================================
    @task
    def t06_add_musica_playlist(self):
        if not self.playlist_id or not self.music_id: return

        payload = {
            "playlist_id": self.playlist_id,
            "musica_id": self.music_id
        }
        self.client.post("/playlists/adicionar-musica", json=payload, name="06. POST - Add Música Playlist")

    # ==========================================================================
    # PASSO 7: CONSULTAR A PLAYLIST CRIADA
    # ==========================================================================
    @task
    def t07_ver_playlist(self):
        if not self.playlist_id: return
        self.client.get(f"/playlists/{self.playlist_id}", name="07. GET - Ver Playlist Específica")

    # ==========================================================================
    # PASSO 8: CONSULTAR PLAYLISTS DO USUÁRIO
    # ==========================================================================
    @task
    def t08_playlists_do_usuario(self):
        if not self.user_id: return
        self.client.get(f"/usuarios/{self.user_id}/playlists_detalhadas", name="08. GET - Playlists do Usuário")

    # ==========================================================================
    # PASSO 9: LISTAR PLAYLISTS QUE CONTÊM A MÚSICA
    # ==========================================================================
    @task
    def t09_playlists_com_musica(self):
        if not self.music_id: return
        self.client.get(f"/musicas/{self.music_id}/playlists", name="09. GET - Playlists com a Música")

    # ==========================================================================
    # PASSO 10: LISTAR TODOS OS USUÁRIOS
    # ==========================================================================
    @task
    def t10_listar_usuarios(self):
        self.client.get("/usuarios", name="10. GET - Listar Todos Usuários")

    # ==========================================================================
    # FINAL: Limpa a execução para o próximo loop (Opcional)
    # ==========================================================================
    @task
    def stop(self):
        self.interrupt()

class RestUser(HttpUser):
    tasks = [FluxoUsuarioRest]
    wait_time = between(1, 2) 
    host = "http://127.0.0.1:8000"