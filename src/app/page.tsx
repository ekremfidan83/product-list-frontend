'use client';
import { useEffect, useState } from 'react';
import { productApi } from '../services/api';
import { Product } from '../types/product';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productApi.getAllProducts();
      console.log('Backend\'den gelen veri:', data);
      setProducts(data || []);
    } catch (err) {
      console.error('Hata:', err);
      setError('Ürünler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await productApi.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        setError('Ürün silinirken bir hata oluştu');
      }
    }
  };

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!products) return <div className="text-center p-4">Ürün bulunamadı</div>;

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ürünlerimiz</h1>
        <Link href="/add" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Yeni Ürün Ekle
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <Link href={`/products/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">{product.price} TL</p>
            </Link>
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}