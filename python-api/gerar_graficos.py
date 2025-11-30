import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# ==============================================================================
# CONFIGURAÇÃO
# ==============================================================================
DATA_DIR = "data"
OUTPUT_DIR = "graficos_separados"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

FILES = {
    "REST": "locust_rest.csv",
    "GraphQL": "locust_graphql.csv",
    "SOAP": "locust_soap.csv"
}

# ==============================================================================
# 1. CARREGAMENTO E LIMPEZA INTELIGENTE
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
    dfs.append(df)

if not dfs:
    print("❌ Nenhum dado carregado.")
    exit()

df_final = pd.concat(dfs)

# ==============================================================================
# 2. GERAÇÃO INDIVIDUAL
# ==============================================================================

# Pega a lista de cenários únicos ordenados
cenarios = sorted(df_final["Cenario"].unique())

print(f"🔄 Gerando gráficos para {len(cenarios)} cenários...")

for cenario in cenarios:
    df_cenario = df_final[df_final["Cenario"] == cenario]
    
    # Nome do arquivo limpo
    nome_arquivo = cenario.lower().replace(".", "").replace(" ", "_")
    # Remove acentos do nome do arquivo para evitar problemas
    nome_arquivo = nome_arquivo.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ã", "a").replace("ç", "c")
    
    plt.figure(figsize=(8, 6))
    sns.set_theme(style="whitegrid")
    
    grafico = sns.barplot(
        data=df_cenario,
        x="Protocolo",
        y="Average Response Time",
        palette="viridis"
    )
    
    for container in grafico.containers:
        grafico.bar_label(container, fmt='%.0f ms', padding=3)

    plt.title(f"Latência Média: {cenario}", fontsize=14, pad=15)
    plt.ylabel("Tempo (ms)", fontsize=12)
    plt.xlabel("") 
    
    # Limite Y com margem
    if not df_cenario.empty:
        plt.ylim(0, df_cenario["Average Response Time"].max() * 1.2) 
    
    caminho_salvar = os.path.join(OUTPUT_DIR, f"{nome_arquivo}.png")
    plt.tight_layout()
    plt.savefig(caminho_salvar, dpi=150)
    plt.close()
    
    print(f"✅ Salvo: {caminho_salvar}")

print("\n🚀 Todos os gráficos foram corrigidos e gerados!")