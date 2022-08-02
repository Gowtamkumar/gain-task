import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import ReactPaginate from 'react-paginate';
import data from './Data/data.1658411149.js'
import Navbar from './components/Navbar';
import BarChart from './components/Charts/BarChart';
import PieChart from './components/Charts/PieChart';
import Products from './components/Product/Products';


function App() {
  const [filterValue, setFilterValue] = useState('All Products')
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([])
  const [datas, setData] = useState([])

  // Pagination state
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const newData = [...data, datas]

  useEffect(() => {
    // Product Search 
    const serarchFilterData = newData?.filter((item) =>
      item.phone_title?.toUpperCase().includes(search.toUpperCase())
      || item.brand?.toUpperCase().includes(search.toUpperCase())
    )

    // filter by Best Value or Best camara and best performance
    const filterAll = serarchFilterData.filter((item, index) => {
      item.tags = ["Best Value", "Best Camera", "Best Performance"];

      if (filterValue === "Best Value") {
        item.tags = ["Best Value"]
        return (item.phone_price <= 20000 && item.ram >= "4") &&
          (item.storage >= "64" && item.brand === "Xiaomi") ||
          (item.phone_price <= 20000 && item.ram >= "4") &&
          (item.storage >= "64" && item.brand === "Realme")
      }

      if (filterValue === "Best Camera") {
        item.tags = ["Best Camera"]
        return (item?.phone_details?.mainCamera >= "16 MP" &&
          item?.phone_details.selfieCamera >= "13 MP" &&
          item?.phone_details.internal_storage >= "64")
      }
      if (filterValue === "Best Performance") {
        item.tags = ["Best Performance"]
        return (
          item?.phone_details?.chipset?.match("Snapdragon") &&
          item?.phone_price > 20000 && item.ram > "4" && item.storage >= "128"
          && item?.speciality.includes('1080p display')
        )
      }
      return item
    });

    setFilterData(filterAll);
    // Pagination page count
    setPageCount(Math.ceil(newData.length / 20));
    
  }, [search, filterValue, datas, itemOffset])


  
  // Pagination handle click.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % newData.length;
    setItemOffset(newOffset);
  };

  // window.addEventListener('scroll', () => {
  //   const {
  //     scrollTop,
  //     scrollHeight,
  //     clientHeight
  //   } = document.documentElement;

  //   if (scrollTop + clientHeight >= scrollHeight - 5 &&
  //     limit <= filterData.length) {
  //     let newLimit = limit + 20;
  //     setLimit(newLimit)
  //   }
  // }, {
  //   passive: true
  // });

  // const handleShowMore = () => {
  //   if (limit <= filterData.length) {
  //     let newLimit = limit + 20;
  //     setLimit(newLimit)
  //   }
  // };

  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-md-12 py-2' style={{ backgroundColor: '#0095A0' }}>
          <Navbar
            setSearch={setSearch}
            setData={setData}
          />
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
              <select
                defaultValue={'All Products'}
                className='productFilter'
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
            <Products filterData={filterData} itemOffset={itemOffset} />

            <ReactPaginate
              breakLabel="..."
              forcePage={pageCount}
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              containerClassName="pagination"
              pageLinkClassName="page_num"
              activeLinkClassName="active"
              nextLinkClassName="page_num"
              previousLinkClassName="page_num"
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
