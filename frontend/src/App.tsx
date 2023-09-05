import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { title } from 'process';

let data = [{
  id: 0,
  name: 'George',
  pay: 30000
}]

for (let i = 0; i < 100; i++) {
  data[i] = {
    id: i + 1,
    name: `man #${i}`,
    pay: Number((Math.random() * 100000).toFixed())
  }
  
}



const App = () => {
  const [dataState, setDataState] = React.useState(data)

  const [title, setTitle] = React.useState('')
  const [comment, setComment] = React.useState('')

  const [max, setMax] = React.useState('')
  const [min, setMin] = React.useState('')
  const [mul, setMul] = React.useState('')

  const whatColor = (pay :Number | any) => {
    let minimal = Number(min.trim() === '' ? 0 : min.trim())
    let maximum = Number(max.trim() === '' ? 0 : max.trim())
    let multi = Number(mul.trim() === '' ? 0 : mul.trim())

    if (minimal !== 0 && maximum !== 0) {
      if (multi !== 0 && pay % multi !== 0) return 'aqua'
      if (pay > maximum) return 'red'
      if (pay < minimal) return 'yellow'
      if (pay <= maximum && pay >= minimal) return 'orange'
    } else {
      return 'white'
    }
    
  }

  const filt = () => {
    let minimal = Number(min.trim() === '' ? 0 : min.trim())
    let maximum = Number(max.trim() === '' ? 0 : max.trim())
    let multi = Number(mul.trim() === '' ? 0 : mul.trim())
    console.log(multi)
    if (minimal !== 0 && maximum !== 0 && multi !== 0) {
      let newData = data.filter((one) => (one.pay >= minimal && one.pay <= maximum && one.pay % multi == 0))

      setDataState(newData)
    } else {
      setDataState(data)
    }
    
  }

  const ref = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: title,
  });
  return (
    <div className="mx-auto w-1/2 h-[100vh] flex justify-center align-top overflow-auto">
      <div className='w-full' ref={ref}>
        <p className='text-2xl text-center my-5'>{title}</p>
        <table  className='w-full h-min '>
          <thead>
            <tr >
              <th className='border'>№ п. п.</th>
              <th className='border'>Сотрудник</th>
              <th className='border'>Начислено</th>
            </tr>
          </thead>
          <tbody>
            {dataState.map((one) => {
              return (
              <tr>
              <td className='border'>{one.id}</td>
              <td className='border'>{one.name}</td>
              <td style={{background: whatColor(one.pay)}} className='border'>{one.pay}</td>
            </tr>
            )})}
          </tbody>
        </table>
        <p>примечание: {comment}</p>
      </div>
      
      <div className='absolute top-1/3 left-5 flex-col w-1/6'>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder='Название отчёта' className='flex border w-full' />
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMax(e.target.value)} placeholder='Максимум' className='flex border w-full' />
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(e.target.value)} placeholder='Минимум' className='flex border w-full' />
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMul(e.target.value)} placeholder='Кратность' className='flex border w-full' />
        <div>
          <button className='border w-1/2' onClick={handlePrint}>print</button>
          <button className='border w-1/2' onClick={filt}>build</button>
        </div>
        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)} placeholder='Комментарий к отчёту' className='flex border w-full' />
      </div>
      
    </div>
  );
}

export default App;
function float(min: string) {
  throw new Error('Function not implemented.');
}

