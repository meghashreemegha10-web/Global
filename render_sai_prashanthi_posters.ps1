$ErrorActionPreference = 'Stop'

$tempDir = 'C:\Users\TUF\posters_temp'
if (!(Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
}

$workspaceDir = 'C:\Users\TUF\OneDrive\Documents\last one 14'
$finalPostersDir = Join-Path $workspaceDir 'posters'
if (!(Test-Path $finalPostersDir)) {
    New-Item -ItemType Directory -Path $finalPostersDir -Force | Out-Null
}

$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (!(Test-Path $edgePath)) {
    $edgePath = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
}

$posters = @(
    @{ Id = 1; Name = 'poster_sp_1_diwali_navy_dhamaka.png'; Html = 'render_sp_diwali_blue.html'; Height = 1750 },
    @{ Id = 2; Name = 'poster_sp_2_twilight_pine_luxury.png'; Html = 'render_sp_twilight_ecobuild.html'; Height = 1750 },
    @{ Id = 3; Name = 'poster_sp_3_royal_maroon_cards.png'; Html = 'render_sp_royal_maroon.html'; Height = 1600 },
    @{ Id = 4; Name = 'poster_sp_4_golden_ribbon_realty.png'; Html = 'render_sp_luxury_realty.html'; Height = 1600 },
    @{ Id = 5; Name = 'poster_sp_5_heritage_cream_arch.png'; Html = 'render_sp_heritage_cream.html'; Height = 1600 },
    @{ Id = 6; Name = 'poster_sp_6_sanctioned_layout_master.png'; Html = 'render_sp_layout_plan.html'; Height = 1600 }
)

Write-Host "Rendering all 6 Sri Sai Prashanthi posters using headless Edge with tailored heights..."

foreach ($p in $posters) {
    $name = $p.Name
    $html = $p.Html
    $height = $p.Height
    
    $tempOut = Join-Path $tempDir $name
    $finalOut = Join-Path $finalPostersDir $name
    
    $url = "http://localhost:5000/$html"
    $winArg = "--window-size=1080,$height"
    $scrArg = "--screenshot=$tempOut"
    
    Write-Host "Rendering Poster $($p.Id): $name ($url) @ $height px..."
    $argList = @('--headless=new', '--disable-gpu', '--hide-scrollbars', $scrArg, $winArg, $url)
    Start-Process -FilePath $edgePath -ArgumentList $argList -Wait
    
    if (Test-Path $tempOut) {
        Copy-Item -Path $tempOut -Destination $finalOut -Force
        $kb = [math]::Round((Get-Item $finalOut).Length / 1024, 1)
        Write-Host "-> SUCCESS! Saved $name ($kb KB)"
    } else {
        Write-Host "-> ERROR: could not render $name"
    }
}

Write-Host "`nAll 6 Sri Sai Prashanthi posters rendered successfully into $finalPostersDir!"
