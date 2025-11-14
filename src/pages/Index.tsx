import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  url: string;
  title: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: 'https://cdn.poehali.dev/projects/ef1ce5a9-4bf4-4281-b8ac-1824814e81df/files/aaee1993-85c3-4fa1-a1e9-6da6bd9a806b.jpg',
    title: 'Mirror Selfie'
  },
  {
    id: 2,
    url: 'https://cdn.poehali.dev/files/7ea43bfb-a8bf-41e8-af46-f91ae96fc3a0.jpg',
    title: 'Portrait'
  },
  {
    id: 3,
    url: 'https://cdn.poehali.dev/files/a4564d35-53ee-4e99-89ed-4c08367a5a5a.jpg',
    title: 'Outdoor'
  }
];

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const openLightbox = (id: number) => {
    setSelectedPhoto(id);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedPhoto(photos[prevIndex].id);
  };

  const goToNext = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(photos[nextIndex].id);
  };

  const selectedPhotoData = photos.find(p => p.id === selectedPhoto);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Фотогалерея
          </h1>
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {showAbout ? 'Галерея' : 'Обо мне'}
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-24 pb-12">
        {showAbout ? (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Обо мне
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Привет! Я фотограф и творческая личность, которая любит запечатлевать моменты жизни.
                  Каждая фотография — это история, эмоция и частичка души.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  В моей галерее вы найдете разнообразные снимки: от спонтанных селфи до продуманных портретов.
                  Я верю, что красота — в простоте и естественности.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Спасибо, что заглянули в мой мир через объектив! 📸
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Моя Коллекция
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openLightbox(photo.id)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-semibold">{photo.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedPhoto !== null && selectedPhotoData && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-10"
          >
            <Icon name="X" size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-6 text-white hover:text-primary transition-colors z-10"
          >
            <Icon name="ChevronLeft" size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 text-white hover:text-primary transition-colors z-10"
          >
            <Icon name="ChevronRight" size={48} />
          </button>

          <div
            className="max-w-6xl max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhotoData.url}
              alt={selectedPhotoData.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-xl font-medium">
              {selectedPhotoData.title}
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {photos.findIndex(p => p.id === selectedPhoto) + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
