import random
import re
from locust import HttpUser, SequentialTaskSet, task, between

class FluxoUsuarioSoap(SequentialTaskSet):
    """
    Define o passo a passo sequencial para o SOAP.
    Envia XML e faz parse da resposta com Regex para extrair os IDs gerados.
    """
    
    def on_start(self):
        self.user_id = None
        self.email = None
        self.password = "senhaForte123"
        self.music_id = None
        self.playlist_id = None
        self.headers = {"Content-Type": "text/xml"}

    # ==========================================================================
    # UTILITÁRIO: Extrair ID do XML (Regex é mais rápido que parser de XML)
    # ==========================================================================
    def ler_id_do_xml(self, texto_xml):
        match = re.search(r'(?:<tns:id>|<id>)(.*?)(?:</tns:id>|</id>)', texto_xml)
        return match.group(1) if match else None

    # ==========================================================================
    # 01. CRIAR USUÁRIO
    # ==========================================================================
    @task
    def t01_registrar(self):
        random_id = random.randint(1000, 999999)
        self.email = f"soap_user_{random_id}@teste.com"
        
        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:RegistrarUsuario>
                 <tns:email>{self.email}</tns:email>
                 <tns:senha>{self.password}</tns:senha>
                 <tns:nome>Siwan SOAP {random_id}</tns:nome>
                 <tns:idade>39</tns:idade>
              </tns:RegistrarUsuario>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        
        with self.client.post("/soap/", data=xml, headers=self.headers, name="01. SOAP - Registrar", catch_response=True) as response:
            if response.status_code == 200:
                self.user_id = self.ler_id_do_xml(response.text)
            else:
                pass

    # ==========================================================================
    # 02. LOGIN
    # ==========================================================================
    @task
    def t02_login(self):
        if not self.email: return

        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:Login>
                 <tns:email>{self.email}</tns:email>
                 <tns:senha>{self.password}</tns:senha>
              </tns:Login>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        self.client.post("/soap/", data=xml, headers=self.headers, name="02. SOAP - Login")

    # ==========================================================================
    # 03. CRIAR MÚSICA
    # ==========================================================================
    @task
    def t03_criar_musica(self):
        rand = random.randint(1, 9999)
        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:CriarMusica>
                 <tns:nome>Beija-Flor SOAP {rand}</tns:nome>
                 <tns:artista>Emicida</tns:artista>
              </tns:CriarMusica>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        with self.client.post("/soap/", data=xml, headers=self.headers, name="03. SOAP - Criar Música", catch_response=True) as response:
            if response.status_code == 200:
                self.music_id = self.ler_id_do_xml(response.text)

    # ==========================================================================
    # 04. LISTAR MÚSICAS
    # ==========================================================================
    @task
    def t04_listar_musicas(self):
        xml = """<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap"><soapenv:Header/><soapenv:Body><tns:ListarMusicas/></soapenv:Body></soapenv:Envelope>"""
        self.client.post("/soap/", data=xml, headers=self.headers, name="04. SOAP - Listar Músicas")

    # ==========================================================================
    # 05. CRIAR PLAYLIST
    # ==========================================================================
    @task
    def t05_criar_playlist(self):
        if not self.user_id: return
        
        rand = random.randint(1, 9999)
        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:CriarPlaylist>
                 <tns:nome>Trap SOAP {rand}</tns:nome>
                 <tns:usuario_id>{self.user_id}</tns:usuario_id>
              </tns:CriarPlaylist>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        with self.client.post("/soap/", data=xml, headers=self.headers, name="05. SOAP - Criar Playlist", catch_response=True) as response:
            if response.status_code == 200:
                self.playlist_id = self.ler_id_do_xml(response.text)

    # ==========================================================================
    # 06. ADICIONAR MÚSICA NA PLAYLIST
    # ==========================================================================
    @task
    def t06_add_musica_playlist(self):
        if not self.playlist_id or not self.music_id: return

        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:AdicionarMusicaPlaylist>
                 <tns:playlist_id>{self.playlist_id}</tns:playlist_id>
                 <tns:musica_id>{self.music_id}</tns:musica_id>
              </tns:AdicionarMusicaPlaylist>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        self.client.post("/soap/", data=xml, headers=self.headers, name="06. SOAP - Add Música Playlist")

    # ==========================================================================
    # 07. VER PLAYLIST (DETALHADA)
    # ==========================================================================
    @task
    def t07_ver_playlist(self):
        if not self.playlist_id: return

        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:ObterPlaylist>
                 <tns:playlist_id>{self.playlist_id}</tns:playlist_id>
              </tns:ObterPlaylist>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        self.client.post("/soap/", data=xml, headers=self.headers, name="07. SOAP - Ver Playlist Específica")

    # ==========================================================================
    # 08. PLAYLISTS DO USUÁRIO
    # ==========================================================================
    @task
    def t08_playlists_usuario(self):
        if not self.user_id: return

        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:ListarPlaylistsUsuario>
                 <tns:usuario_id>{self.user_id}</tns:usuario_id>
              </tns:ListarPlaylistsUsuario>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        self.client.post("/soap/", data=xml, headers=self.headers, name="08. SOAP - Playlists do Usuário")

    # ==========================================================================
    # 09. ONDE A MÚSICA ESTÁ
    # ==========================================================================
    @task
    def t09_onde_esta_musica(self):
        if not self.music_id: return

        xml = f"""
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap">
           <soapenv:Header/>
           <soapenv:Body>
              <tns:ListarPlaylistsDaMusica>
                 <tns:musica_id>{self.music_id}</tns:musica_id>
              </tns:ListarPlaylistsDaMusica>
           </soapenv:Body>
        </soapenv:Envelope>
        """
        self.client.post("/soap/", data=xml, headers=self.headers, name="09. SOAP - Playlists da Música")

    # ==========================================================================
    # 10. LISTAR TODOS OS USUÁRIOS
    # ==========================================================================
    @task
    def t10_listar_usuarios(self):
        xml = """<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="streaming.soap"><soapenv:Header/><soapenv:Body><tns:ListarUsuarios/></soapenv:Body></soapenv:Envelope>"""
        self.client.post("/soap/", data=xml, headers=self.headers, name="10. SOAP - Listar Todos Usuários")

    @task
    def stop(self):
        self.interrupt()

class SoapUser(HttpUser):
    tasks = [FluxoUsuarioSoap]
    wait_time = between(1, 2)
    host = "http://127.0.0.1:8000"