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

for ($i = 1; $i -le 6; $i++) {
    Write-Host "Rendering Square Poster $i (1080x1080)..."
    $cleanPath = Join-Path $tempDir "poster_sairoots_square_$i.png"
    $url = "http://localhost:5000/render_sairoots_sq_$i.html"

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
        Write-Host "Rendered Square Poster $i : $($img.Width) x $($img.Height)"
        $img.Dispose()

        # Copy to all destination directories
        foreach ($dir in $destDirs) {
            $destFile = Join-Path $dir "poster_sairoots_square_$i.png"
            Copy-Item -Path $cleanPath -Destination $destFile -Force
            Write-Host "Saved to: $destFile"
        }
    } else {
        Write-Error "Failed to generate screenshot for square poster $i"
    }
}

Write-Host "All 6 Square Sai Roots posters successfully rendered and saved!"
