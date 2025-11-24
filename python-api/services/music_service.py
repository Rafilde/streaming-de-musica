from  database import db
from supabase import AuthApiError

def register_music(name: str, artist: str):
    """
    Registra uma nova música na tabela Musica.
    """
    try:
        dados_musica = {
            "nome": name,
            "artista": artist
        }
        
        res_db = db.table("musica").insert(dados_musica).execute()
        
        musica_criada = res_db.data[0] if res_db.data else {}
        
        return musica_criada

    except Exception as e:
        raise Exception(f"Erro ao registrar música: {str(e)}")
    
def get_all_music():
    """
    Retorna todas as músicas da tabela Musica.
    """
    try:
        res_db = db.table("musica").select("*").execute()
        
        musicas = res_db.data if res_db.data else []
        
        return musicas

    except Exception as e:
        raise Exception(f"Erro ao buscar músicas: {str(e)}")