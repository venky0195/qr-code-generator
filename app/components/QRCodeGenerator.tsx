'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import ThemeToggler from './ThemeToggler';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const MAX_TEXT_LENGTH = 200;
  const QR_CODE_SIZE = 200;

  useEffect(() => {
    if (!text.trim()) {
      setQRCode('');
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const url = await QRCode.toDataURL(text, {
          color: { dark: color, light: bgColor },
          width: 200,
        });
        setQRCode(url);
      } catch (error) {
        console.error('QR Code Generation Error:', error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [text, color, bgColor]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;

    if (newText.length > MAX_TEXT_LENGTH) {
      setErrorMessage(`⚠️ Max ${MAX_TEXT_LENGTH} characters allowed.`);
      return;
    }

    setErrorMessage('');
    setText(newText);
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  const copyQRCode = async () => {
    if (!qrCode) return;

    try {
      const response = await fetch(qrCode);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ 'image/png': blob });

      await navigator.clipboard.write([clipboardItem]);
      setCopySuccess('✅ Copied!');

      setTimeout(() => setCopySuccess(''), 2000);
    } catch (error) {
      console.error('Copy to Clipboard Error:', error);
      setCopySuccess('❌ Failed to Copy');
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
          onChange={handleTextChange}
          maxLength={MAX_TEXT_LENGTH}
          placeholder='Enter text or URL'
          className='w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mb-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700'
        />

        {errorMessage && (
          <p className='text-red-500 text-sm mt-1 mb-4'>{errorMessage}</p>
        )}

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

        {qrCode && (
          <>
            <button
              onClick={() => {
                setText('');
                setQRCode('');
              }}
              className='w-full bg-gray-500 text-white py-3 rounded-md shadow-md hover:bg-gray-600 transition-all'
            >
              ❌ Clear
            </button>
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
              <div className='flex flex-col sm:flex-row gap-3 w-full mt-3 '>
                <button
                  onClick={copyQRCode}
                  className='w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-all'
                >
                  📋 Copy
                </button>

                <button
                  onClick={downloadQRCode}
                  className='w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition-all'
                >
                  💾 Download
                </button>
              </div>
              {copySuccess && (
                <p className='text-green-500 text-sm mt-2'>{copySuccess}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
