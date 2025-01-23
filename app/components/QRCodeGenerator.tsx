'use client';
import { useState } from 'react';
import QRCode from 'qrcode';
import ThemeToggler from './ThemeToggler';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [color, setColor] = useState('#000000');

  const MAX_TEXT_LENGTH = 200;
  const QR_CODE_SIZE = 200;

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

    try {
      const url = await QRCode.toDataURL(text, {
        color: { dark: color, light: '#ffffff' },
        width: QR_CODE_SIZE,
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
    <div className='flex flex-col items-center min-h-screen p-6 dark:bg-gray-900 bg-gray-100'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
        <ThemeToggler />
        <h1 className='text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white'>
          QR Code Generator
        </h1>

        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
          placeholder={`Enter text (max ${MAX_TEXT_LENGTH} chars)`}
          className='w-full border rounded-md px-3 py-2 mb-3 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />

        <div className='flex justify-between items-center mb-3 dark:text-white text-gray-800'>
          <label className='flex items-center gap-2'>
            <span>Color:</span>
            <input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
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
            <img
              src={qrCode}
              alt='QR Code'
              className='max-w-full'
              style={{
                width: `${QR_CODE_SIZE}px`,
                height: `${QR_CODE_SIZE}px`,
              }}
            />
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
