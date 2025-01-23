'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
// import Image from 'next/image';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(200);
  const [darkMode, setDarkMode] = useState(false);

  const MAX_TEXT_LENGTH = 200;
  const MIN_QR_SIZE = 100;
  const MAX_QR_SIZE = 500;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Please enter a valid text or URL.');
      return;
    }

    if (text.length > MAX_TEXT_LENGTH) {
      alert(
        `Text is too long! Maximum allowed: ${MAX_TEXT_LENGTH} characters.`
      );
      return;
    }

    if (size < MIN_QR_SIZE || size > MAX_QR_SIZE) {
      alert(
        `QR Code size must be between ${MIN_QR_SIZE}px and ${MAX_QR_SIZE}px.`
      );
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
    <div
      className={`flex flex-col items-center min-h-screen p-6 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className='w-96 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='mb-4 p-2 text-sm rounded-md bg-gray-300 dark:bg-gray-700 dark:text-white'
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <h1 className='text-2xl font-bold text-center mb-4'>
          QR Code Generator
        </h1>

        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
          placeholder={`Enter text (max ${MAX_TEXT_LENGTH} chars)`}
          className='w-full border rounded-md px-3 py-2 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />

        <div className='flex justify-between items-center mb-3'>
          <label className='flex items-center gap-2'>
            <span>Color:</span>
            <input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label className='flex items-center gap-2'>
            <span>Size:</span>
            <input
              type='number'
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={MIN_QR_SIZE}
              max={MAX_QR_SIZE}
              className='w-16 border p-1 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white'
            />
          </label>
        </div>

        <button
          onClick={generateQRCode}
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
        >
          Generate QR Code
        </button>

        {qrCode && (
          <div className='mt-4 flex flex-col items-center'>
            <img src={qrCode} alt='QR Code' className='w-48 h-48' />
            <button
              onClick={downloadQRCode}
              className='mt-3 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition'
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
