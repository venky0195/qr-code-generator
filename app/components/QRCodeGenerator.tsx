'use client';
import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');

  const generateQRCode = async () => {
    if (text) {
      const url = await QRCode.toDataURL(text);
      setQRCode(url);
    }
  };

  return (
    <div className='p-4'>
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
        <Image
          src={qrCode}
          alt='QR Code'
          className='mt-4'
          width={150}
          height={150}
        />
      )}
    </div>
  );
}
