import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContexts";
import Swal from "sweetalert2";
import userImg from "../../assets/icons8-avatar-48.png"

const ProductDetails = () => {
  const product = useLoaderData();
  //  state
  const [bids, setBids] = useState([]);
  // modal ref
  const bidModalRef = useRef(null);
  console.log(product);

  const { user } = use(AuthContext);
  console.log(user)

  const {
    title,
    image,
    description,
    price_min,
    price_max,
    seller_name,
    location,
    condition,
    usage,
    seller_contact,
    _id: productId,
  } = product;

  //  use effect kore  this  product data load
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const bid = form.bid.value;
    const contact = form.contact.value;
    console.log(productId, name, email, bid, contact);
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_contact: contact,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bits to the 
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a,b)=>b.bid_price - a.bid_price)
          setBids(newBids)
        }
        // console.log('after bids post', data)
      });
  };

  return (
    <div>
      {/*product info */}
      <div>
        <div className=" mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <img src={image} alt={title} className="w-full h-[500px] object-cover rounded-xl" />
      <h2 className="text-3xl font-semibold mt-4">{title}</h2>
      <p className="text-gray-700 mt-2">{description}</p>

      <div className="mt-4">
        <p><strong>Price Range:</strong> {price_min} - {price_max} ৳</p>
        <p><strong>Condition:</strong> {condition}</p>
        <p><strong>Usage:</strong> {usage}</p>
        <p><strong>Seller:</strong> {seller_name}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Contact:</strong> {seller_contact}</p>
      </div>
       <button onClick={handleBidModalOpen} className="btn btn-primary w-full mt-3">
            I want to Buy this Product
          </button>
    </div>
        <div>
         
          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog ref={bidModalRef} className="modal ">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Give Seller Your Offered Price
              </h3>
              <p className="py-4">Offer something seller can not resist</p>

              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>

                  <input
                    type="text"
                    className="input"
                    name="name"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  {/* contact */}
                  <label className="label">Contact</label>

                  <input
                    type="text"
                    className="input"
                    name="contact"
                    placeholder="Your contact number"
                  />
                  {/* email */}
                  <label className="label">Email</label>

                  <input
                    type="email"
                    className="input"
                    name="email"
                    readOnly
                    defaultValue={user?.email}
                  /> 
                 

                  {/* bid amount */}

                  <label className="label">Bid</label>
                  <input
                    type="text"
                    className="input"
                    name="bid"
                    placeholder="Your Bid"
                  />

                  <button className="btn btn-neutral mt-4">
                    Place Your Bid
                  </button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/*bids for this product */}
      <div>
        <h3 className="text-3xl font-bold">
          Bids For This Products:
          <span className="text-primary">{bids.length}</span>
        </h3>
        {/* table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  SL No.
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              
           {
            bids.map((bid, index)=><tr>
                <th>
                  {index +1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        {
                          user&& <img
                          src={user.photoURL || userImg}
                        />
                        }
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid.buyer_name}</div>
                      
                    </div>
                  </div>
                </td>
                <td>
                  {bid.buyer_email}
                </td>
                <td>{bid.bid_price}</td>
                <th>
                  <button className="btn btn-ghost btn-xs btn-primary">{bid.status}</button>
                </th>
              </tr>)
           }
              
             
            </tbody>
           
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
