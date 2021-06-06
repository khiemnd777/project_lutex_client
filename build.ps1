# Invoke cake build
.\src\_stdio\devops\cake\build.ps1 @args
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Set-Location -LiteralPath $PSScriptRoot
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
