'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productApi } from '../../services/api';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productApi.createProduct({
        ...formData,
        price: parseFloat(formData.price)
      });
      alert('Ürün başarıyla eklendi!');
      router.push('/');
    } catch (error) {
      alert('Ürün eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Ürün Adı</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Açıklama</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Fiyat</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Resim URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ürün Ekle
        </button>
      </form>
    </div>
  );
} 