const alipaySDK = require('alipay-sdk').default;
const alipaysdk = new alipaySDK({
	appId:'2021000121615504',//开放平台生成的appid
	signType:'RSA2',//签名算法
	gateway:'https://openapi.alipaydev.com/gateway.do',//支付宝网关，沙箱环境提供
	alipayPublickey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzJcRpTACUDp640ay5ii548rO0/+glE84ONKC9p2hjiIH8jCdOWCYj2N5jGGNlFbuplOLZOjyiIT3tS15uGd86XRphknd0M+sZsAmjFsx0satUfQwupnh/CNiLymQyIHtIGvU9qgbgphK38bNcxVLAk1NYk6BnTflaJbLH3MK3J/0OiOdrrif2jal9epmkczMNED/vV6sDWEXfEAEy5c32ZmjlVu5UkZpamN0YsVP+k+YDK0U0VTFrF7rJn/0NHdE4ZB5+8gpYJGP5m5cJ20PrVcs9N2e5Qlyebu1SAxT/0i09+eh8bgingRfO9qDyPMLdNm6SygzbqijfRT4mQWqXQIDAQAB',
	privateKey:'MIIEogIBAAKCAQEApatJcBJ3NPZahpxp1HE1aeOndZtX5O8t+PEMVyFMTu7A2MKwZWK643CflMbIDHxdTSdBCtsIqTW/G36+umXpa6gpl9WuVNGP3f6dxV3PulIXVF+rqvtHpTJrpEVTKp2crTafOWVDDS37GrqKpnB8YRFQ/tTdXx2AHadLMGGQUV/HahJM3fKZEsL3Y1h4N1S18KTo7BnKW3XRb/GGigyegz98m7ip7mH7pBwQkJcxUc4uFgi9BDRG5a/CJX4QzdMdPBlBQKk/sQF7E2vrixb3OZh12K95wGEC6pu6lEcRwwO0UoWSgv9Dd839iEz5vLUK3W39kKjsSFS0OKfBS/5T5QIDAQABAoIBADe06gPCYc0wTW5YKAnka1aI02Vrb9muR2IfA8xEiRk9lSEODix5T2htFWv8j4YLR4BLA8b3sejcBr/jFZUt8ZheumWw12bz9JFsLXcRPWlkcy3O4bWjuwqkcqeRHA8HYoioBlBRaYOEA5yQP1EKH/ivzvFxeGKkU9Ek0Naa5+FEbFisuM4ky57is1jWsvrDZIhaR66aFPUnzahvjCZctpb7r8fkNMyf/C/vQQc/YdgCABeqXXiSLYAXEQxIeucPpK4vqEGqzg313tknM5S5qMTTO+FQMGWEI2x+ylE7r+hju7tqim6Fx2Yrk6PcT5v7hWimxceNRqJdb5NWJ/jr7L0CgYEA8TsKxJ4O98BYYwcyEQxzcSZWrGVfpEIROIswxzkuECr+hhvw38EnKgYkp+AaKcrZ9Sk+N9znHQY8LrYRcyP0iVzDdp5ysSMhK5BsB7zsOWo1T5VgCCbXtvy5JrCdX+bHE8l5O309uYuZv6tC98emriS1GcpMqZVY2dg/mP6gQdsCgYEAr8/r8sQL/WCbvT6zaP9h2he46dDbWtY6LLz2gNGEA9o7MStEpqeFyM0CbBBnXOr9AOag/Qc+OTcv0DjXoL9Rwu8kRoX4zhbf0y0ydgP8I/9pRmOC6N+Ff6PWQSF51+qHmcXKF0e8tQKUDzd/+Jc2v9WWgrNsoGGkWBuvUYqCDT8CgYBDTdLSSrsoWq0ObBqG8S9gWW8DSIFnxdsiKIuiegylDCnZZwBMnYp8yhv+DqOeF2+6XBh045hD29J8weWad2Sp0ozikpCzZXbCvde2TPqnhj97hdS2UYgMEPTjm5E9CZlvpt3BQE8xboamGHVlxnl1yt4QZQYApp+UoCYWXKx/0wKBgDZhOpsBdq/tpN5ZOYcdjve1ZLW1q1OidaYG4LwhkhLa+noP5xEhOelNOBWS0VXVPWJ884iwJ9fssPZXzqJi6vg/ndnOcJHWU27vSO9l9iRwSPDDsOc01AcR9yB4KUbWvRCcNBEVWFIotQEr6oJKy110xDQzKUNGUF4MWiL/k5BjAoGAIYoSk6CKwTJMYlMjtiwVIrVZhPD33wdev9BlrkmNC3DV/zf+4S2HgYpn7unlaFcfmyzprKyF+makzNOOvQo5VzqkxrVaNB90whZRDmBhmA8+hXHo5yzSA/O2YoCeIbXOyROpZb+w5E+bLEdKBwDxrj/W70MexbrpS7J0pJZdhYs=',
})

module.exports = alipaysdk