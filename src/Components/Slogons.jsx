import React, { useState, useEffect } from 'react'
import { FiX } from "react-icons/fi";
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import Tooltip from './Tooltip';



const Slogons = () => {
  const [generatedSlogon, setGeneratedSlogon] = useState('something');
  const [page, setPage] = useState(3);
  const [data, setData] = useState([]);
  const [sloganText, setSloganText] = useState('Click to copy');



  const updateGeneratedSlogon = (slogon) => {
    setGeneratedSlogon(slogon);
  };

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage)
    console.log(selectedPage)
  }

  const generateSlogans = (currentPage) => {
    const slogans = [
      ` coziness building for tomorrow ${currentPage}`,
      'There is no Sore it will Not Heal, No cool it will not Subdue.',
    ];
    return [...Array(50)]
      .reduce((prev) => [...prev, ...slogans], [])
      .map((slogan, idx) => ({ key: idx, slogan }));
  };

  useEffect(() => {
    setData(generateSlogans(page));
  }, [page]);


  function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    }
  }




  return (
    <div>
      <SlogonSearch updateGeneratedSlogon={updateGeneratedSlogon} />
      <div className='h-[1px] mt-[50px] w-full bg-black-extraLight'></div>
      <div className='flex items-center mt-12 flex-col justify-between gap-y-6 md:flex-row'>
        <span className='text-xl md:text-start text-center text-black-dark'>
          We have generated 1,023 slogans for “{generatedSlogon}”
        </span>

        <button className='whitespace-nowrap rounded border-2 border-primary px-4 py-2 text-base font-medium text-primary transition-all hover:bg-primary hover:text-white'>Download all</button>
      </div>
      <section className="mt-9 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {data.slice(page * 20 - 20, page * 20).map((item) => (
          <Tooltip 
          key={item.key}
            direction={(item.key + 1) % 2 === 1 ? 'left' : 'right'}
            onLeave={() => setSloganText('Click to copy')}
            text={sloganText}
          >
            <div 
              className="flex min-h-[68px] w-full items-center rounded bg-black-lighter py-2 px-4"
              onClick={() => {
                setSloganText('Copied!');
                copyTextToClipboard(item.slogan);
              }}>

              <span className="text-black-dark">{item.slogan}</span>
            </div>
          </Tooltip>
        ))}
      </section>
      <div className='h-[1px] mt-[50px] w-full bg-black-extraLight'></div>
      <div className="mt-9 flex justify-between ">
        <div>
          {page !== 1 && (
            <button onClick={() => selectPageHandler(page - 1)} className="flex text-[#146eb4] text-[18px] items-center">
              <ChevronLeftIcon className="h-6 w-6" />
              Prev
            </button>
          )}
        </div>
        <div>
          {[...Array(data.length / 20)].map((_, index) => {
            return (
              <span onClick={() => selectPageHandler(index + 1)} className={` ${page === index + 1 ? "bg-[#146eb4] px-[5px] py-[5px] text-white rounded-full" : "text-[#146eb4]"}   text-[18px] hover:cursor-pointer md:ml-[22px] ml-[17px]`} key={index}>{index + 1}</span>
            )
          })}
        </div>
        <div>
          {page !== 5 && (
            <button onClick={() => selectPageHandler(page + 1)} className="flex text-[#146eb4] text-[18px]  items-center">
              Next
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Slogons

const SlogonSearch = ({ updateGeneratedSlogon }) => {
  const [slogon, setSlogon] = useState('');
  const [showClearIcon, setShowClearIcon] = useState(false);

  const onChangeHandler = (event) => {
    setSlogon(event.target.value);
    setShowClearIcon(true);
  }

  const clearInput = () => {
    setSlogon('');
    setShowClearIcon(false);
  };

  const generateSlogan = () => {

    updateGeneratedSlogon(slogon);
  };

  return (
    <div>
      <div>
        <div className='flex flex-col md:max-w-[40%] max-w-full relative'>
          <label className='mb-2 text-[18px] font-medium text-black-light' htmlFor="text"> Word for your slogon</label>
          <input className='w-full rounded border border-black-extraLight  px-4 py-3 text-[18px] placeholder:leading-6 focus:border-primary focus:outline-none' value={slogon} onChange={onChangeHandler} type="text" placeholder='Enter something'
          />
          {showClearIcon && (
            <FiX
              className='absolute top-[69%] right-4 transform -translate-y-1/2 text-black-light w-[28px] cursor-pointer h-[28px]'
              onClick={clearInput}
            />
          )}
        </div>
        <button
          onClick={generateSlogan}
          type='submit' disabled={!slogon} className='rounded px-6 py-3 mt-12  text-md font-medium transition-all disabled:cursor-not-allowed disabled:opacity-70 sm:px-5  sm:py-2 sm:text-lg bg-primary text-white hover:bg-primary/90'>Generate Slogon</button>
      </div>
    </div>
  )
}

