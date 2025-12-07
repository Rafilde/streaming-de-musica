# Script PowerShell para executar testes de carga
# Uso: .\run-load-tests.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  TESTES DE CARGA - MUSIC STREAMING" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se as APIs estao rodando
Write-Host "Verificando se as APIs estao ativas..." -ForegroundColor Yellow
Write-Host ""

$apis = @(
    @{ Name = "REST"; Port = 3000; URL = "http://localhost:3000/api/usuarios" },
    @{ Name = "GraphQL"; Port = 4000; URL = "http://localhost:4000/graphql" },
    @{ Name = "SOAP"; Port = 5000; URL = "http://localhost:5000/wsdl?wsdl" },
    @{ Name = "gRPC"; Port = 50051; URL = "localhost:50051" }
)

$allRunning = $true

foreach ($api in $apis) {
    try {
        if ($api.Name -eq "gRPC") {
            # Para gRPC, apenas verificar se a porta esta aberta
            $connection = Test-NetConnection -ComputerName localhost -Port $api.Port -WarningAction SilentlyContinue -InformationLevel Quiet
            if ($connection) {
                Write-Host "  OK $($api.Name) (porta $($api.Port))" -ForegroundColor Green
            } else {
                Write-Host "  X $($api.Name) (porta $($api.Port)) - NAO ESTA RODANDO" -ForegroundColor Red
                $allRunning = $false
            }
        } elseif ($api.Name -eq "GraphQL") {
            # GraphQL usa POST, entao apenas verificar se a porta esta aberta
            $tcpClient = New-Object System.Net.Sockets.TcpClient
            try {
                $tcpClient.Connect("localhost", $api.Port)
                $tcpClient.Close()
                Write-Host "  OK $($api.Name) (porta $($api.Port))" -ForegroundColor Green
            } catch {
                Write-Host "  X $($api.Name) (porta $($api.Port)) - NAO ESTA RODANDO" -ForegroundColor Red
                $allRunning = $false
            }
        } else {
            $response = Invoke-WebRequest -Uri $api.URL -Method GET -TimeoutSec 2 -ErrorAction Stop
            Write-Host "  OK $($api.Name) (porta $($api.Port))" -ForegroundColor Green
        }
    } catch {
        Write-Host "  X $($api.Name) (porta $($api.Port)) - NAO ESTA RODANDO" -ForegroundColor Red
        $allRunning = $false
    }
}

Write-Host ""

if (-not $allRunning) {
    Write-Host "ATENCAO: Algumas APIs nao estao rodando!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Por favor, inicie todas as APIs antes de executar os testes:" -ForegroundColor White
    Write-Host "  1. npm run start:rest      (em um terminal)" -ForegroundColor Cyan
    Write-Host "  2. npm run start:graphql   (em outro terminal)" -ForegroundColor Cyan
    Write-Host "  3. npm run start:soap      (em outro terminal)" -ForegroundColor Cyan
    Write-Host "  4. npm run start:grpc      (em outro terminal)" -ForegroundColor Cyan
    Write-Host ""
    
    $continue = Read-Host "Deseja continuar mesmo assim? (s/N)"
    if ($continue -ne "s" -and $continue -ne "S") {
        Write-Host ""
        Write-Host "Testes cancelados." -ForegroundColor Yellow
        exit
    }
}

Write-Host ""
Write-Host "Iniciando testes de carga..." -ForegroundColor Green
Write-Host ""

# Executar testes
npm run load-test

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  TESTES CONCLUIDOS!" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para visualizar os resultados:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. Abra o arquivo: test\results\index.html" -ForegroundColor White
Write-Host "  2. Ou execute: start test\results\index.html" -ForegroundColor Cyan
Write-Host ""

# Perguntar se quer abrir os resultados
$open = Read-Host "Deseja abrir os resultados agora? (S/n)"
if ($open -ne "n" -and $open -ne "N") {
    Write-Host ""
    Write-Host "Abrindo resultados..." -ForegroundColor Green
    Start-Process "test\results\index.html"
}

Write-Host ""
Write-Host "Obrigado por usar o sistema de testes!" -ForegroundColor Cyan
Write-Host ""
