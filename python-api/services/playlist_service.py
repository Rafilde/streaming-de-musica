from database import db 

def criar_playlist_servico(nome: str, usuario_id: str):
    try:
        dados = {"nome": nome, "usuario_id": usuario_id}
        res = db.table("playlist").insert(dados).execute()
        return res.data[0]
    except Exception as e:
        raise Exception(f"Erro ao criar: {str(e)}")

def adicionar_musica_servico(playlist_id: int, musica_id: int):
    try:
        dados = {"playlist_id": playlist_id, "musica_id": musica_id}
        db.table("playlist_musica").insert(dados).execute()
        return True
    except Exception as e:
        raise Exception(f"Erro ao adicionar (provavelmente já existe): {str(e)}")

def _limpar_estrutura_supabase(dados_brutos):
    """
    O Supabase devolve algo feio tipo: 
    playlist_musica: [{'musica': {'nome': 'X'}}]
    
    Nós transformamos em algo bonito:
    musicas: [{'nome': 'X'}]
    """
    playlists_formatadas = []
    
    for item in dados_brutos:
        lista_suja = item.get("playlist_musica", [])
        
        musicas_limpas = []
        for juncao in lista_suja:
            if juncao.get("musica"): 
                musicas_limpas.append(juncao["musica"])
        
        playlists_formatadas.append({
            "id": item["id"],
            "nome": item["nome"],
            "musicas": musicas_limpas
        })
        
    return playlists_formatadas

def obter_playlist_detalhada(playlist_id: int):
    try:
        query = "id, nome, playlist_musica(musica(id, nome, artista))"
        
        res = db.table("playlist")\
            .select(query)\
            .eq("id", playlist_id)\
            .execute()
            
        if not res.data:
            return None
            
        dados_limpos = _limpar_estrutura_supabase(res.data)
        return dados_limpos[0] 
        
    except Exception as e:
        raise Exception(f"Erro ao buscar playlist: {str(e)}")

def listar_playlists_usuario_com_musicas(usuario_id: str):
    try:
        query = "id, nome, playlist_musica(musica(id, nome, artista))"
        
        res = db.table("playlist")\
            .select(query)\
            .eq("usuario_id", usuario_id)\
            .execute()
            
        return _limpar_estrutura_supabase(res.data)
        
    except Exception as e:
        raise Exception(f"Erro ao listar do usuário: {str(e)}")
    

def listar_playlists_com_musica(musica_id: int):
    try:
        query = "playlist_id, playlist(id, nome, usuario_id)"
        
        res = db.table("playlist_musica")\
            .select(query)\
            .eq("musica_id", musica_id)\
            .execute()
            
        playlists = []
        for item in res.data:
            if item.get("playlist"):
                playlists.append(item["playlist"])
                
        return playlists
    except Exception as e:
        raise Exception(f"Erro ao buscar playlists da música: {str(e)}")