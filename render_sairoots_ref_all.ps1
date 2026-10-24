Add-Type -AssemblyName System.Drawing

$tempDir = "C:\Users\TUF\temp_sairoots"
if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir -Force | Out-Null }

$destDirs = @(
    "C:\Users\TUF\OneDrive\Documents\last one 14\posters",
    "C:\Users\TUF\OneDrive\Pictures\Sai_Roots_Posters",
    "C:\Users\TUF\OneDrive\Pictures",
    "C:\Users\TUF\.gemini\antigravity-ide\brain\6d2a02c6-a63b-40c3-a97c-0ef43683e186"
)

foreach ($dir in $destDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

$posters = @(
    @{ Id = 1; Name = "poster_sairoots_ref_1_mayfair.png"; Html = "render_sairoots_ref_1.html" },
    @{ Id = 2; Name = "poster_sairoots_ref_2_utsav.png"; Html = "render_sairoots_ref_2.html" },
    @{ Id = 3; Name = "poster_sairoots_ref_3_saicourt.png"; Html = "render_sairoots_ref_3.html" },
    @{ Id = 4; Name = "poster_sairoots_ref_4_five_reasons.png"; Html = "render_sairoots_ref_4.html" },
    @{ Id = 5; Name = "poster_sairoots_ref_5_emerald_royal.png"; Html = "render_sairoots_ref_5.html" }
)

foreach ($p in $posters) {
    Write-Host "Rendering $($p.Name) (1080x1080)..."
    $cleanPath = Join-Path $tempDir $p.Name
    $url = "http://localhost:5000/$($p.Html)"

    if (Test-Path $cleanPath) { Remove-Item $cleanPath -Force }

    $argList = @(
        "--headless=new",
        "--screenshot=$cleanPath",
        "--window-size=1080,1080",
        "--hide-scrollbars",
        "--virtual-time-budget=6000",
        $url
    )

    Start-Process $edgePath -ArgumentList $argList -Wait -NoNewWindow

    if (Test-Path $cleanPath) {
        $img = [System.Drawing.Image]::FromFile($cleanPath)
        Write-Host "Rendered $($p.Name) : $($img.Width) x $($img.Height)"
        $img.Dispose()

        # Copy to all destination directories
        foreach ($dir in $destDirs) {
            $destFile = Join-Path $dir $p.Name
            Copy-Item -Path $cleanPath -Destination $destFile -Force
            Write-Host "Saved to: $destFile"
        }
    } else {
        Write-Error "Failed to generate screenshot for $($p.Name)"
    }
}

Write-Host "All 5 reference-style posters successfully generated!"
