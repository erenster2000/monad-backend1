# Monad Hackathon Backend API

Bu doküman, Monad Hackathon backend servisinin mevcut API endpoint'lerini ve nasıl kullanılacağını açıklar.

---

## 1. Sağlık Kontrolü (Health Check)

Sunucunun çalışır durumda olup olmadığını kontrol etmek için kullanılır.

-   **Method:** `GET`
-   **Path:** `/`

### İstek

Herhangi bir parametre veya gövde (body) gerektirmez.

### Başarılı Cevap

-   **Status Code:** `200 OK`
-   **Body:**
    ```
    Monad Hackathon Backend is Running! 🚀
    ```

### Örnek `curl` İsteği

```bash
curl http://localhost:3001/
```

---

## 2. Token Metadata Üretimi

Bu, servisin ana endpoint'idir. Belirtilen bir Twitter kullanıcısının son tweet'lerini analiz eder, baskın bir konu bulur, ilgili bir resim oluşturur ve sonuç olarak token metadata'sını içeren bir JSON nesnesi döndürür.

-   **Method:** `POST`
-   **Path:** `/api/generate`

### İstek

-   **Headers:**
    -   `Content-Type: application/json`
-   **Body:**

    ```json
    {
      "twitterUsername": "string"
    }
    ```

    -   `twitterUsername` (zorunlu): Analiz edilecek Twitter kullanıcı adı (başına '@' koymadan).

### Başarılı Cevap

-   **Status Code:** `200 OK`
-   **Body:**

    ```json
    {
        "name": "Monad Token for <kullanici_adi>",
        "description": "A unique token generated based on the analysis of the latest tweets from @<kullanici_adi>. The central theme is: <konu>.",
        "image": "https://via.placeholder.com/500x500.png?text=<konu>",
        "attributes": [
            {
                "trait_type": "Topic",
                "value": "<konu>"
            },
            {
                "trait_type": "Source Account",
                "value": "@<kullanici_adi>"
            }
        ]
    }
    ```

### Hata Cevapları

-   **Status Code:** `400 Bad Request`
    -   `twitterUsername` parametresi gönderilmediğinde.
    ```json
    {
        "error": "Twitter username is required."
    }
    ```

-   **Status Code:** `404 Not Found`
    -   Kullanıcı için hiç tweet bulunamadığında veya hesap gizli olduğunda.
    ```json
    {
        "error": "No tweets found for this user or account is private."
    }
    ```

-   **Status Code:** `500 Internal Server Error`
    -   Veri çekme, analiz veya resim oluşturma sırasında beklenmedik bir sunucu hatası oluştuğunda.
    ```json
    {
        "error": "Failed to generate token metadata."
    }
    ```

### Örnek `curl` İsteği

```bash
curl -X POST http://localhost:3001/api/generate \
-H "Content-Type: application/json" \
-d '{"twitterUsername": "elonmusk"}'
```
