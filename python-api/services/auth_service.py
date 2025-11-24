from  database import db
from supabase import AuthApiError

def autenticar_usuario(email: str, senha: str):
    """
    Tenta logar e retorna os dados do usuário + dados da tabela.
    """
    try:
        res_login = db.auth.sign_in_with_password({
            "email": email,
            "password": senha
        })
        
        usuario_id = res_login.user.id
        
        res_db = db.table("usuario").select("nome, idade").eq("id", usuario_id).execute()
        
        dados_usuario = res_db.data[0] if res_db.data else {}
        
        return {"id": usuario_id, "info": dados_usuario}

    except AuthApiError:
        raise Exception("Email ou senha incorretos.")
    except Exception as e:
        raise Exception(f"Erro no login: {str(e)}")


def cadastrar_usuario(email: str, senha: str, nome: str, idade: int):
    """
    Cria usuário no Auth e salva detalhes na tabela Usuario.
    """
    try:
        res_auth = db.auth.sign_up({
            "email": email,
            "password": senha
        })
        
        if not res_auth.user:
            raise Exception("Erro ao criar usuário no Auth.")
            
        usuario_id = res_auth.user.id
        

        dados_tabela = {
            "id": usuario_id,      
            "nome": nome,    
            "idade": idade        
        }
        
        db.table("usuario").insert(dados_tabela).execute()
        
        return {"id": usuario_id, "nome": nome}

    except Exception as e:
        raise Exception(f"Erro ao registrar: {str(e)}")


def listar_todos_usuarios():
    try:
        res = db.table("usuario").select("id, nome, idade").execute()
        return res.data
    except Exception as e:
        raise Exception(f"Erro ao listar usuários: {str(e)}")