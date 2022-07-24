import React from "react"
import Select from 'react-select';


export default function Navbar() {
  const options = [
    { value: 'Best Value', label: 'Best Value' },
    { value: 'Best Camara', label: 'Best Camara' },
    { value: 'Best Parfarmance', label: 'Best Parfarmance' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <span className="navbar-brand text-light fw-bold" href="#">LOGO</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <span className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"></span>
          <div className='me-4 text-light'>
            <input type="text" className="search-form" placeholder="Search by Title or Brand" aria-label="Search by Title or Brand" aria-describedby="basic-addon2" />
            <span className="icon" id="basic-addon2"><i className="fa fa-search"></i></span>
          </div>
          <button type="button" className="btn bg-light rounded-0 text-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
                  <form class="row g-3">
                    <div class="col-12">
                      <label for="productName" class="form-label">Product Name</label>
                      <input type="text" class="form-control" id="productName" placeholder="Enter Product name" />
                    </div>
                    <div class="col-md-6">
                      <label for="brand" class="form-label">Brand</label>
                      <input type="text" class="form-control" id="brand" placeholder="Enter Brand Name" />
                    </div>
                    <div class="col-md-6">
                      <label for="ramRom" class="form-label">Ram/Rom</label>
                      <input type="text" class="form-control" id="ramRom" placeholder="Enter Ran/Rom" />
                    </div>
                    <div class="col-md-12">
                      <label class="form-label">Tag</label>
                      <Select
                        options={options}
                        placeholder="Select color"
                        isSearchable={true}
                        width='100%'
                        isMulti
                      />
                    </div>
                    <div class="col-12">
                      <label for="price" class="form-label">Price</label>
                      <input type="text" class="form-control" id="price" placeholder="Enter Price" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary">Publish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
