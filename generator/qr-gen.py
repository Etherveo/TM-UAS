import qrcode

url = "https://etherveo.github.io/TM-UAS/index.html"
img = qrcode.make(url)
img.save("qr-tekmul-uas.png")