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

$artifactsDir = 'C:\Users\TUF\.gemini\antigravity-ide\brain\6d2a02c6-a63b-40c3-a97c-0ef43683e186'

$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (!(Test-Path $edgePath)) {
    $edgePath = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
}

# Sized to capture full uncropped images, large typography and all amenities
$posters = @(
    @{ Id = 1; Name = 'poster_1_royal_diwali_dhamaka.png'; Html = 'render_poster_1.html'; Height = 1750 },
    @{ Id = 2; Name = 'poster_2_dream_home_site_combo.png'; Html = 'render_poster_2.html'; Height = 1750 },
    @{ Id = 3; Name = 'poster_3_diwali_price_slash_investment.png'; Html = 'render_poster_3.html'; Height = 1700 },
    @{ Id = 4; Name = 'poster_4_sanctioned_master_layout_plan.png'; Html = 'render_poster_4.html'; Height = 1750 },
    @{ Id = 5; Name = 'poster_5_rapid_construction_civil_work.png'; Html = 'render_poster_5.html'; Height = 1700 },
    @{ Id = 6; Name = 'poster_6_gated_community_amenities.png'; Html = 'render_poster_6.html'; Height = 1750 }
)

Write-Host "Rendering all 6 updated posters..."

foreach ($p in $posters) {
    $name = $p.Name
    $html = $p.Html
    $height = $p.Height
    
    $tempOut = Join-Path $tempDir $name
    $finalOut = Join-Path $finalPostersDir $name
    $artOut = Join-Path $artifactsDir $name
    
    $url = "http://localhost:5000/$html"
    $winArg = "--window-size=1080,$height"
    $scrArg = "--screenshot=$tempOut"
    
    Write-Host "Rendering Poster $($p.Id): $name (Height: $height px)..."
    $argList = @('--headless=new', '--disable-gpu', $scrArg, $winArg, $url)
    Start-Process -FilePath $edgePath -ArgumentList $argList -Wait
    
    if (Test-Path $tempOut) {
        Copy-Item -Path $tempOut -Destination $finalOut -Force
        Copy-Item -Path $tempOut -Destination $artOut -Force
        $kb = [math]::Round((Get-Item $finalOut).Length / 1024, 1)
        Write-Host "-> Success! Saved $name ($kb KB)"
    } else {
        Write-Host "-> Error: could not render $name"
    }
}

Write-Host "`nAll 6 updated posters generated successfully!"
