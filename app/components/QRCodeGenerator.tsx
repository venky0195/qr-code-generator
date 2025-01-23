'use client';
import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Please enter a valid text or URL.');
      return;
    }
    try {
      const url = await QRCode.toDataURL(text);
      setQRCode(url);
    } catch (error) {
      console.error('QR Code Generation Error:', error);
      alert('Failed to generate QR Code. Please try again.');
    }
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className='p-4 flex flex-col items-center'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Enter text or URL'
        className='border p-2 rounded w-full'
      />
      <button
        onClick={generateQRCode}
        className='mt-2 bg-blue-500 text-white p-2 rounded'
      >
        Generate QR Code
      </button>
      {qrCode && (
        <div className='mt-4 flex flex-col items-center'>
          <Image
            src={qrCode}
            alt='QR Code'
            className='mb-2'
            width={150}
            height={150}
          />
          <button
            onClick={downloadQRCode}
            className='bg-green-500 text-white p-2 rounded'
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
