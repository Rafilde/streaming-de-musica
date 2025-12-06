import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# ==============================================================================
# CONFIGURAÇÃO
# ==============================================================================
DATA_DIR = "data"
OUTPUT_DIR = "graficos_separados"

# --- DADOS DO GRPC (COLETADOS MANUALMENTE VIA GHZ) ---
# Aqui inserimos os valores de "Average" (em ms) que você obteve no terminal.
# 1.41s = 1410ms | 1.40s = 1400ms | 1.31s = 1310ms | 1.39s = 1390ms
DADOS_GRPC = {
    "04. Listar Músicas": 1410,
    "07. Ver Playlist Específica": 1400,
    "08. Playlists do Usuário": 1310,
    "10. Listar Todos Usuários": 1390
}
# -----------------------------------------------------

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

FILES = {
    "REST": "locust_rest.csv",
    "GraphQL": "locust_graphql.csv",
    "SOAP": "locust_soap.csv"
}

# ==============================================================================
# 1. CARREGAMENTO E LIMPEZA
# ==============================================================================
dfs = []

print("📂 Lendo arquivos...")

for protocol, filename in FILES.items():
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        print(f"⚠️ Arquivo não encontrado: {path}")
        continue

    df = pd.read_csv(path)
    df = df[df["Name"] != "Aggregated"]
    df["Protocolo"] = protocol
    
    # --- FUNÇÃO DE LIMPEZA CORRIGIDA ---
    def limpar_nome(nome_completo):
        if " - " in nome_completo:
            partes = nome_completo.split(" - ")
            numero = partes[0].split(".")[0]  # Ex: "09"
            acao = partes[-1].strip()         # Ex: "Playlists da Música"
            
            # CORREÇÃO 1: Padroniza Registrar -> Criar Usuário
            if acao == "Registrar":
                acao = "Criar Usuário"
            
            # CORREÇÃO 2: Padroniza "da Música" -> "com a Música"
            if acao == "Playlists da Música":
                acao = "Playlists com a Música"

            return f"{numero}. {acao}" 
        return nome_completo

    df["Cenario"] = df["Name"].apply(limpar_nome)
    
    # Mantém apenas colunas essenciais
    df = df[["Cenario", "Protocolo", "Average Response Time"]]
    dfs.append(df)

if not dfs:
    print("❌ Nenhum dado carregado.")
    exit()

df_final = pd.concat(dfs)

# ==============================================================================
# 2. INSERIR DADOS DO GRPC (MANUALMENTE)
# ==============================================================================
grpc_rows = []
for cenario, tempo in DADOS_GRPC.items():
    grpc_rows.append({
        "Cenario": cenario,
        "Protocolo": "gRPC",
        "Average Response Time": tempo
    })

# Junta o gRPC na tabela principal
df_grpc = pd.DataFrame(grpc_rows)
df_final = pd.concat([df_final, df_grpc], ignore_index=True)

# ==============================================================================
# 3. GERAÇÃO INDIVIDUAL
# ==============================================================================

cenarios = sorted(df_final["Cenario"].unique())

print(f"🔄 Gerando gráficos para {len(cenarios)} cenários...")

for cenario in cenarios:
    df_cenario = df_final[df_final["Cenario"] == cenario]
    
    nome_arquivo = cenario.lower().replace(".", "").replace(" ", "_")
    nome_arquivo = nome_arquivo.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ã", "a").replace("ç", "c")
    
    plt.figure(figsize=(9, 6)) # Aumentei um pouco a largura
    sns.set_theme(style="whitegrid")
    
    # Define cores fixas para cada protocolo para manter consistência
    cores = {
        "REST": "#3498db",    # Azul
        "GraphQL": "#e91e63", # Rosa
        "SOAP": "#9b59b6",    # Roxo
        "gRPC": "#2ecc71"     # Verde
    }
    
    grafico = sns.barplot(
        data=df_cenario,
        x="Protocolo",
        y="Average Response Time",
        palette=cores
    )
    
    for container in grafico.containers:
        grafico.bar_label(container, fmt='%.0f ms', padding=3, fontsize=11, fontweight='bold')

    plt.title(f"Latência Média: {cenario}", fontsize=14, pad=15)
    plt.ylabel("Tempo (ms)", fontsize=12)
    plt.xlabel("") 
    
    if not df_cenario.empty:
        plt.ylim(0, df_cenario["Average Response Time"].max() * 1.2) 
    
    caminho_salvar = os.path.join(OUTPUT_DIR, f"{nome_arquivo}.png")
    plt.tight_layout()
    plt.savefig(caminho_salvar, dpi=150)
    plt.close()
    
    print(f"✅ Salvo: {caminho_salvar}")

print("\n🚀 Todos os gráficos foram gerados (com gRPC incluído)!")