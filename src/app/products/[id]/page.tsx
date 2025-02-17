'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productApi } from '../../../services/api';
import { Product } from '../../../types/product';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productApi.getProductById(Number(params.id));
        setProduct(data);
      } catch (err) {
        setError('Ürün detayı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!product) return <div className="text-center p-4">Ürün bulunamadı</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          ← Listeye Dön
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="text-2xl font-bold text-gray-900 mb-4">
                {product.price} TL
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
                    productApi.deleteProduct(product.id)
                      .then(() => router.push('/'))
                      .catch(() => alert('Ürün silinirken bir hata oluştu'));
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Ürünü Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 