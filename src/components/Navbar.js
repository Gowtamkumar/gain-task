import React, { useState } from "react"
import Select from 'react-select';


export default function Navbar({ setSearch, setData }) {
  const options = [
    { value: 'Best Value', label: 'Best Value' },
    { value: 'Best Camara', label: 'Best Camara' },
    { value: 'Best Parfarmance', label: 'Best Parfarmance' }
  ];
  const [formDataValues, setFormDataValues] = useState({});

  const handleChange = ({ target }) => {
    let newData = { ...formDataValues }
    newData[target.name] = target.value
    setFormDataValues(newData)
  }

  const handleSubmit = (event) => {

    formDataValues.tags = formDataValues.tags.reduce((obj, item, index) => (obj[index] = item.value, obj), []);
    formDataValues.ram = Number(formDataValues.ram)
    formDataValues.storage = Number(formDataValues.storage);
    formDataValues.phone_price = Number(formDataValues.phone_price);
    setData(formDataValues)

    setFormDataValues();
    event.preventDefault();
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <span className="navbar-brand text-light fw-bold" href="#">LOGO</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <span className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"></span>
          <div className='me-4 text-light'>
            <input
              onChange={({ target }) => setSearch(target.value)}
              type="text"
              className="search-form"
              placeholder="Search by Title or Brand"
              aria-label="Search by Title or Brand"
              aria-describedby="basic-addon2"
            />
            <span className="icon" id="basic-addon2"><i className="fa fa-search"></i></span>
          </div>


          <button type="button" onReset={true} className="btn bg-light rounded-0 text-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add Product
          </button>

          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header text-light" style={{ backgroundColor: '#0095A0' }}>
                  <h5 className="modal-title " id="staticBackdropLabel">Add Product</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <label htmlFor="productName" className="form-label">Product Name</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="phone_title"
                        value={formDataValues.phone_title}
                        className="form-control"
                        id="productName"
                        placeholder="Enter Product name"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="brand" className="form-label">Brand</label>
                      <input
                        onChange={handleChange}
                        name="brand"
                        value={formDataValues.brand}
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder="Enter Brand Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="ram" className="form-label">Ram</label>
                      <input
                        onChange={handleChange}
                        name='ram'
                        value={formDataValues.ram}
                        type="number"
                        className="form-control"
                        id="ram"
                        placeholder="Enter Ran"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="rom" className="form-label">Rom</label>
                      <input
                        onChange={handleChange}
                        name='storage'
                        value={formDataValues.storage}
                        type="number"
                        className="form-control"
                        id="rom"
                        placeholder="Enter Ran/Rom"
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Tag</label>
                      <Select
                        options={options}
                        placeholder="Select color"
                        // isSearchable={true}
                        width='100%'
                        isMulti
                        name="tags"
                        onChange={(value) => handleChange({ target: { name: 'tags', value } })}
                      />

                    </div>
                    <div className="col-12">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        onChange={handleChange}
                        name='phone_price'
                        type="number"
                        value={formDataValues.phone_price}
                        className="form-control"
                        id="price"
                        placeholder="Enter Price"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="reset" className="btn btn-primary">Reset</button>
                      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Publish</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
