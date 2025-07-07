# Renart Jewellery - Engagement Rings Collection

## 🚀 Proje Özellikleri

### Frontend Özellikleri
- **Modern React Uygulaması**: Vite ile optimize edilmiş React 19
- **Responsive Tasarım**: Tailwind CSS ile mobil uyumlu tasarım
- **Gelişmiş UI/UX**: 
  - Swiper.js ile ürün carousel'i
  - Skeleton loading animasyonları
  - Touch/swipe desteği
  - Klavye navigasyonu
- **Dinamik Filtreleme**: Fiyat, popülerlik skoru ve ağırlık bazında filtreleme
- **Gerçek Zamanlı Fiyatlandırma**: Anlık altın fiyatları ile hesaplanan ürün fiyatları
- **Çoklu Renk Seçenekleri**: Sarı, beyaz ve rose altın varyantları
- **Özel Fontlar**: Avenir ve Montserrat font aileleri

### Backend Özellikleri
- **Node.js/Express API**: RESTful API mimarisi
- **Gerçek Zamanlı Altın Fiyatları**: GoldAPI.io entegrasyonu
- **Dinamik Fiyat Hesaplama**: Popülerlik skoru ve ağırlık bazında fiyat algoritması
- **Gelişmiş Filtreleme**: Çoklu kriter bazında ürün filtreleme
- **API Dokümantasyonu**: Swagger/OpenAPI ile otomatik dokümantasyon
- **Veri Doğrulama**: Joi ile giriş parametrelerinin validasyonu
- **CORS Yapılandırması**: Güvenli cross-origin istekleri
- **Cache Sistemi**: Altın fiyatları için 5 dakikalık cache

## 🛠️ Teknoloji Stack'i

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Swiper.js** - Touch slider
- **Lucide React** - Modern icon library
- **React Loading Skeleton** - Loading animasyonları
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **Joi** - Veri validasyonu
- **Swagger JSDoc** - API dokümantasyonu
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📁 Proje Yapısı

```
renart-fullstack-intern-case/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cors.config.js      # CORS yapılandırması
│   │   │   └── swagger.config.js   # Swagger API dokümantasyonu
│   │   ├── controllers/
│   │   │   ├── goldPriceController.js  # Altın fiyat API kontrolcüsü
│   │   │   └── productController.js    # Ürün API kontrolcüsü
│   │   ├── data/
│   │   │   └── products.json       # Ürün verileri
│   │   ├── routes/
│   │   │   ├── goldPriceRoutes.js  # Altın fiyat rotaları
│   │   │   └── productRoutes.js    # Ürün rotaları
│   │   ├── services/
│   │   │   ├── goldPriceService.js # Altın fiyat servisi
│   │   │   └── productFilterService.js # Ürün filtreleme servisi
│   │   ├── utils/
│   │   │   ├── dataLoader.js       # Veri yükleme yardımcısı
│   │   │   └── priceCalculator.js  # Fiyat hesaplama algoritması
│   │   └── validators/
│   │       └── filterSchema.js     # Filtre validasyon şeması
│   ├── server.js                   # Ana sunucu dosyası
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.jsx     # Ürün kartı bileşeni
│   │   │   ├── ProductFilter.jsx   # Filtre bileşeni
│   │   │   ├── ProductGrid.jsx     # Ürün grid bileşeni
│   │   │   └── UI/
│   │   │       └── ProductGridSkeleton.jsx # Loading skeleton
│   │   ├── App.jsx                 # Ana uygulama bileşeni
│   │   └── main.jsx                # Uygulama giriş noktası
│   ├── public/
│   │   └── fonts/                  # Özel fontlar (Avenir, Montserrat)
│   └── package.json
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Backend Kurulumu

1. **Backend dizinine geçin:**
```bash
cd backend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın:**
```bash
# .env dosyası oluşturun
GOLD_API_KEY=your_gold_api_key_here
PORT=5000
```

4. **Sunucuyu başlatın:**
```bash
npm start
```

Backend sunucusu `http://localhost:5000` adresinde çalışacaktır.

### Frontend Kurulumu

1. **Frontend dizinine geçin:**
```bash
cd frontend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın:**
```bash
# .env dosyası oluşturun
VITE_API_URL=http://localhost:5000/api
```

4. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Frontend uygulaması `http://localhost:5173` adresinde çalışacaktır.

## 📚 API Dokümantasyonu

API dokümantasyonuna `http://localhost:3000/api-docs` adresinden erişebilirsiniz.

### Ana Endpoint'ler

#### Ürünler
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/filter` - Filtrelenmiş ürünleri getir
- `GET /api/products/:id` - Belirli bir ürünü getir

#### Altın Fiyatları
- `GET /api/gold-price` - Güncel altın fiyatını getir

### Filtre Parametreleri
- `minPrice` / `maxPrice` - Fiyat aralığı
- `minPopularity` / `maxPopularity` - Popülerlik skoru aralığı
- `minWeight` / `maxWeight` - Ağırlık aralığı
- `sortBy` - Sıralama seçenekleri

## 💡 Özellik Detayları

### Fiyat Hesaplama Algoritması
```javascript
price = (popularityScore + 1) × weight × goldPrice
```

### Cache Sistemi
- Altın fiyatları 5 dakika boyunca cache'lenir
- API çağrı sayısını optimize eder
- Fallback fiyat: $65.5/gram

### Responsive Tasarım
- Mobil: 1 ürün/slide
- Tablet: 2 ürün/slide  

### Touch/Swipe Desteği
- Mobil cihazlarda swipe ile resim değiştirme
- Desktop'ta mouse drag desteği
- Klavye ok tuşları ile navigasyon

### Font Aileleri
- **Avenir**: Başlıklar ve özel metinler
- **Montserrat**: Genel metin ve butonlar

## 🔧 Geliştirme

### Kod Kalitesi
- ESLint ile kod standardizasyonu
- Prettier ile kod formatlaması
- Component-based mimari

### Performance Optimizasyonları
- Lazy loading ve Suspense
- Debounced filter requests
- Image optimization
- Bundle splitting

## 📱 Kullanım Senaryoları

1. **Müşteri Deneyimi**: Kullanıcılar nişan yüzüklerini farklı altın renklerinde görüntüleyebilir
2. **Filtreleme**: Fiyat, popülerlik ve ağırlık bazında ürün filtreleme
3. **Gerçek Zamanlı Fiyatlar**: Güncel altın fiyatları ile hesaplanan ürün fiyatları
4. **Responsive Tasarım**: Tüm cihazlarda optimal görüntüleme