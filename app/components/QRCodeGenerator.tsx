'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import ThemeToggler from './ThemeToggler';
import {
  formatTimestamp,
  MAX_TEXT_LENGTH,
  QR_CODE_SIZE,
  QRCodeProps,
} from './types';
import QRCodeDisplay from './QRCodeDisplay';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorMessage, setErrorMessage] = useState('');
  const [history, setHistory] = useState<QRCodeProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<QRCodeProps | null>(null);

  useEffect(() => {
    if (!text.trim()) {
      setQRCode('');
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const url = await QRCode.toDataURL(text, {
          color: { dark: color, light: bgColor },
          width: QR_CODE_SIZE,
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

  const downloadQRCode = (qrCodeUrl: string) => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('qrHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (!text.trim()) {
      setQRCode('');
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const url = await QRCode.toDataURL(text, {
          color: { dark: color, light: bgColor },
          width: QR_CODE_SIZE,
        });
        setQRCode(url);

        setHistory((prevHistory) => {
          const newHistory = [
            ...prevHistory,
            {
              text,
              color,
              bgColor,
              qrCode: url,
              timestamp: formatTimestamp(new Date().toISOString()),
            },
          ];
          localStorage.setItem('qrHistory', JSON.stringify(newHistory));
          return newHistory;
        });
      } catch (error) {
        console.error('QR Code Generation Error:', error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [text, color, bgColor]);

  const removeFromHistory = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem('qrHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('qrHistory');
  };

  const openModal = (item: QRCodeProps) => {
    setModalData(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  const handleDownloadQRCode = (qrCodeUrl: string) => {
    downloadQRCode(qrCodeUrl);
  };

  return (
    <div className='flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-md p-4 border border-gray-300 dark:border-gray-700'>
        <ThemeToggler />
        <h1 className='text-xl font-semibold text-center mb-3 text-gray-900 dark:text-gray-200'>
          🔗 QR Code Generator
        </h1>

        <input
          type='text'
          value={text}
          onChange={handleTextChange}
          maxLength={MAX_TEXT_LENGTH}
          placeholder='Enter text or URL'
          className='w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mb-2
                     text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-cyan-500 text-sm'
        />

        {errorMessage && (
          <p className='text-red-500 text-xs mt-1 mb-3'>{errorMessage}</p>
        )}

        <div className='flex justify-between items-center gap-2 mb-3'>
          <label className='flex flex-col w-full'>
            <span className='text-xs text-gray-700 dark:text-gray-300'>
              QR Color
            </span>
            <input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='w-full border border-gray-300 dark:border-gray-600 rounded-md p-1'
            />
          </label>
          <label className='flex flex-col w-full'>
            <span className='text-xs text-gray-700 dark:text-gray-300'>
              Background
            </span>
            <input
              type='color'
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className='w-full border border-gray-300 dark:border-gray-600 rounded-md p-1'
            />
          </label>
        </div>

        {qrCode && (
          <>
            <QRCodeDisplay
              qrCode={qrCode}
              text={text}
              timestamp={formatTimestamp(new Date().toISOString())}
              onDownload={() => handleDownloadQRCode(qrCode)}
            />
          </>
        )}
        {history.length > 0 && (
          <div className='mt-4'>
            <h2 className='text-base font-semibold mb-2 text-gray-900 dark:text-gray-200'>
              🏙️ QR Code History
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {history.map((item, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div
                    className='w-full max-w-[70px] text-sm text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap text-center'
                    title={item.text}
                  >
                    {item.text}
                  </div>

                  <img
                    title={item.text}
                    src={item.qrCode}
                    alt={`QR Code ${index + 1}`}
                    className='w-20 h-20 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer p-1'
                    onClick={() => openModal(item)}
                  />

                  <a
                    onClick={() => removeFromHistory(index)}
                    className='mt-2 text-red-500 text-sm'
                  >
                    Remove
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={clearHistory}
              className='mt-3 w-full bg-red-600 text-white py-2 rounded-md shadow-md hover:bg-red-700 transition-all text-sm'
            >
              Clear History
            </button>
          </div>
        )}
      </div>
      {modalVisible && modalData && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'
          onClick={closeModal}
        >
          <div
            className='bg-white dark:bg-gray-800 p-5 rounded-md shadow-lg relative max-w-sm w-full'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-lg font-semibold text-center text-gray-900 dark:text-gray-200'>
              QR Code Preview
            </h2>
            <QRCodeDisplay
              qrCode={modalData.qrCode}
              text={modalData.text}
              timestamp={modalData.timestamp}
              onDownload={() => handleDownloadQRCode(modalData.qrCode)}
              showTextAndTimestamp={true}
            />
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-600 dark:text-gray-200'
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
