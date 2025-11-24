from  database import db
from supabase import AuthApiError

def authenticate_user(email: str, password: str):
    """
    Tenta logar e retorna os dados do usuário + dados da tabela.
    """
    try:
        res_login = db.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        user_id = res_login.user.id
        
        res_db = db.table("usuario").select("nome, idade").eq("id", user_id).execute()
        
        dados_usuario = res_db.data[0] if res_db.data else {}
        
        return {"id": user_id, "info": dados_usuario}

    except AuthApiError:
        raise Exception("Email ou senha incorretos.")
    except Exception as e:
        raise Exception(f"Erro no login: {str(e)}")


def register_user(email: str, password: str, username: str, age: int):
    """
    Cria usuário no Auth e salva detalhes na tabela Usuario.
    """
    try:
        res_auth = db.auth.sign_up({
            "email": email,
            "password": password
        })
        
        if not res_auth.user:
            raise Exception("Erro ao criar usuário no Auth.")
            
        user_id = res_auth.user.id
        

        dados_tabela = {
            "id": user_id,      
            "nome": username,    
            "idade": age        
        }
        
        db.table("usuario").insert(dados_tabela).execute()
        
        return {"id": user_id, "nome": username}

    except Exception as e:
        raise Exception(f"Erro ao registrar: {str(e)}")