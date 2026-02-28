$urls = @(
    'photo-1515562141207-7a88fb7ce338',
    'photo-1573408301155-0ab5b671f3f9',
    'photo-1605100804763-247f67b3557e',
    'photo-1602751584552-8ba73aad10e1',
    'photo-1617038220319-276d3cfab638',
    'photo-1594938298603-c8148c4b4288',
    'photo-1569067236772-ebf4f1f4d18c',
    'photo-1603561591411-07134e71a2a9',
    'photo-1611591437281-460bfbe1220a',
    'photo-1602173574767-37ac01994b2a',
    'photo-1599643477877-530eb83abc8e',
    'photo-1535632066927-ab7c9ab60908',
    'photo-1573408301185-0ab5b671f3f9'
)

foreach ($id in $urls) {
    try {
        $uri = "https://images.unsplash.com/$id" + "?w=200&q=10"
        $r = Invoke-WebRequest -Uri $uri -Method Head -UseBasicParsing -TimeoutSec 10
        Write-Output "$id => $($r.StatusCode)"
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Output "$id => FAILED (HTTP $status)"
    }
}
