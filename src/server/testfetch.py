import requests

api_url = "http://localhost:5000/scrape"  # Ganti dengan URL API yang sesuai

try:
    # Menggunakan metode POST
    response = requests.post(api_url)

    # Cek jika permintaan berhasil (status code 200)
    if response.status_code == 200:
        data = response.json()  # Asumsikan respons dalam format JSON
        print("Data dari API:")
        print(data)
    else:
        print(f"Error: {response.status_code}")
        print(response.text)  # Cetak pesan kesalahan yang sebenarnya
except requests.RequestException as e:
    print(f"Request error: {e}")
