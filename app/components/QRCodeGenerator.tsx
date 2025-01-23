'use client';
import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');

  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(200);

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Please enter a valid text or URL.');
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        color: { dark: color, light: '#ffffff' },
        width: size,
      });
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
      <div className='mt-2 flex gap-2'>
        <label>
          Color:
          <input
            type='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='ml-2'
          />
        </label>
        <label>
          Size:
          <input
            type='number'
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min='100'
            max='500'
            className='ml-2 w-20 p-1 border'
          />
        </label>
      </div>
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
          <img
            src={qrCode}
            alt='QR Code'
            className='mb-2'
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
