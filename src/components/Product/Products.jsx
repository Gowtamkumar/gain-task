import React from 'react'
import defaultimg from '../../asset/img/phone.jpeg'

export default function Products({ filterData, itemOffset }) {

  const endOffset = itemOffset + 20;

  return (

    <table className="table-sm mb-5" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th className="th-sm">Model </th>
          <th className="th-sm">Ram/Rom </th>
          <th className="th-sm text-center">Tag</th>
          <th className="th-sm">Price</th>
        </tr>
      </thead>
      <tbody>
        {filterData.slice(itemOffset, endOffset).length <= 0 ?
          <tr className="text-center">
            <th colSpan={4}>
              <div className='text-primary'>
                <span className="visually-hidden">Loading...</span>
                <div className="spinner-border" role="status">
                </div>
              </div>
            </th>
          </tr>
          // slice(0, limit)
          : filterData?.sort((a, b) => (a.brand > b.brand) ? 1 : -1).slice(itemOffset, endOffset).map((item, index) => {
            return (
              <tr key={index}>
                <td className='w-auto'>
                  <div className='d-flex align-items-center'>
                    <img src={item?.phone_images ? item?.phone_images[0] : defaultimg} className="card-img-top" key={index} alt="..." style={{ width: "100px", height: '100px' }} />
                    <div className='mx-2'>
                      <h5>{item?.phone_title}</h5>
                      <h5>{item?.brand}</h5>
                    </div>
                  </div>
                </td>
                <td className='w-auto'>{item?.ram}/{item?.storage}</td>
                <td className='w-auto'>
                  {item.tags?.map((tagItem, index) => {
                    return <span key={index} className={`${tagItem === "Best Value" ? "bg-success" : tagItem === "Best Camera" ? "bg-primary" : "bg-warning"} badge me-2`}>{tagItem}</span>
                  })}
                </td>
                <td>{item.phone_price?.toLocaleString('en-bn', { style: 'currency', currency: 'BDT' })}</td>
              </tr>)
          })
        }
      </tbody>
    </table>
  )
}
