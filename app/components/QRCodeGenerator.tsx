'use client';
import { useState } from 'react';
import QRCode from 'qrcode';
import ThemeToggler from './ThemeToggler';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

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
        color: { dark: color, light: bgColor },
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
    <div className='flex flex-col items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
        <ThemeToggler />
        <h1 className='text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white'>
          🔗 QR Code Generator
        </h1>

        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_TEXT_LENGTH}
          placeholder='Enter text or URL'
          className='w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mb-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700'
        />

        <div className='flex flex-col sm:flex-row justify-between items-center gap-3 mb-4'>
          <label className='flex flex-col w-full'>
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              QR Color
            </span>
            <input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='w-full border rounded-md p-1'
            />
          </label>
          <label className='flex flex-col w-full'>
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              Background
            </span>
            <input
              type='color'
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className='w-full border rounded-md p-1'
            />
          </label>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={generateQRCode}
            className='w-full bg-cyan-600 text-white py-3 rounded-md shadow-md hover:bg-cyan-700 transition-all'
          >
            🎯 Generate QR Code
          </button>
          {qrCode && (
            <button
              onClick={() => {
                setText('');
                setQRCode('');
              }}
              className='w-full bg-gray-500 text-white py-3 rounded-md shadow-md hover:bg-gray-600 transition-all'
            >
              ❌ Clear
            </button>
          )}
        </div>

        {qrCode && (
          <div
            className={`mt-6 flex flex-col items-center p-4 border rounded-lg shadow-md bg-gray-50 dark:bg-gray-700`}
          >
            <h2 className='text-lg font-semibold mb-2 text-gray-900 dark:text-white'>
              🔍 Your QR Code
            </h2>
            <img
              src={qrCode}
              alt='QR Code'
              className='rounded-md border p-2 bg-white'
              style={{
                width: `${QR_CODE_SIZE}px`,
                height: `${QR_CODE_SIZE}px`,
              }}
            />
            <button
              onClick={downloadQRCode}
              className='mt-3 bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition-all'
            >
              💾 Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
