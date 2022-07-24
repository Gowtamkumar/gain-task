import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar';
import BarChart from './components/Charts/BarChart';
import PieChart from './components/Charts/PieChart';
import data from './Data/data.1658411149.js'
import { useState } from 'react';

function App() {
  const [filterValue, setFilterValue] = useState('All Products')
  const [limit, setLimit] = useState(0);

  const filterProducts = (value) => {
    return data.filter((item, index) => {
      item.tags = ["Best Value", "Best Camera", "Best Performance"];

      if (value === "Best Value") {
        item.tags = ["Best Value"]
        return (item.phone_price <= 20000 && item.ram >= "4") &&
          (item.storage >= "64" && item.brand === "Xiaomi") ||
          (item.phone_price <= 20000 && item.ram >= "4") &&
          (item.storage >= "64" && item.brand === "Realme")
      }

      if (value === "Best Camera") {
        item.tags = ["Best Camera"]
        return (item.phone_details.mainCamera >= "16 MP" &&
          item.phone_details.selfieCamera >= "13 MP" &&
          item.phone_details.internal_storage >= "64")
      }
      if (value === "Best Performance") {
        item.tags = ["Best Performance"]
        return (
          item.phone_details.chipset.match("Snapdragon") &&
          item.phone_price > 20000 && item.ram > "4" && item.storage >= "128"
          && item.speciality.includes('1080p display')
        )
      }
      return item
    })
  }

  window.addEventListener('scroll', () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 &&
      limit <= filterProducts(filterValue).length) {
      let newLimit = limit + 20;
      setLimit(newLimit)
    }
  }, {
    passive: true
  });

  // const handleShowMore = () => {
  //   if (limit <= filterProducts(filterValue).length) {
  //     let newLimit = limit + 20;
  //     setLimit(newLimit)
  //   }
  // };

  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-md-12 py-2' style={{ backgroundColor: '#0095A0' }}>
          <Navbar />
        </div>
      </div>
      <div className='container'>
        <div className='row my-4'>
          <div className='col-md-6'>
            <span className='barChart'>Sourse</span>
          </div>
          <div className='col-md-6'>
            <span className='barChart'>Condition</span>
          </div>
          <div className='col-md-6'>
            <PieChart />
          </div>
          <div className='col-md-6 mt-5'>
            <BarChart />
          </div>
        </div>
        <div className='row py-5'>
          <div className='col-md-6'>
            <h2>All Products</h2>
          </div>
          <div className='col-md-6 d-flex justify-content-end'>
            <div className='d-flex align-items-center'>
              <label className='me-1'>Sort By:</label>
              <select defaultValue={'All Products'} className='productFilter'
                onChange={({ target }) => setFilterValue(target.value)}
              >
                <option value="All Products">All Products</option>
                <option value="Best Value">Best Value</option>
                <option value="Best Camera">Best Camera</option>
                <option value="Best Performance">Best Performance</option>
              </select>
            </div>
          </div>
          <div className='col-md-12 mt-5'>
            <table className="table-sm" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th className="th-sm">Model </th>
                  <th className="th-sm">Ram/Rom </th>
                  <th className="th-sm text-center">Tag</th>
                  <th className="th-sm">Price</th>
                </tr>
              </thead>
              <tbody>
                {filterProducts(filterValue).length <= 0 ?
                  <tr className="text-center">
                    <th colSpan={4}>
                      <div className='text-primary'>
                        <span className="visually-hidden">Loading...</span>
                        <div className="spinner-border" role="status">
                        </div>
                      </div>
                    </th>
                  </tr>
                  : filterProducts(filterValue).slice(0, limit)?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className='w-auto'>
                          <div className='d-flex align-items-center'>
                            <img src={item?.phone_images[0]} className="card-img-top" key={index} alt="..." style={{ width: "100px", height: '100px' }} />
                            <div className='mx-2'>
                              <h5>{item?.phone_title}</h5>
                              <h5>{item?.brand}</h5>
                            </div>
                          </div>
                        </td>
                        <td className='w-auto'>{item?.ram}/{item?.storage}</td>
                        <td className='w-auto'>
                          {item.tags.map((tagItem, index) => {
                            return <span key={index} className={`${tagItem === "Best Value" ? "bg-success" : tagItem === "Best Camera" ? "bg-primary" : "bg-warning"} badge me-2`}>{tagItem}</span>
                          })}
                        </td>
                        <td>{item.phone_price.toLocaleString('en-bn', { style: 'currency', currency: 'BDT' })}</td>
                      </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
