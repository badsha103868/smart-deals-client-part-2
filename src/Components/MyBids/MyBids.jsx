import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContexts";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyBids = () => {
  // email ar asa kina check
  const { user } = use(AuthContext);
  // state
  const [bids, setBids] = useState([]);
  // axiosSecure
  const axiosSecure = useAxiosSecure();
   
  // access token 
  console.log('access token ', user.accessToken)
   
  // recap   axios secure diya token naua
  useEffect(()=>{
     axiosSecure.get(`/bids?email=${user.email}`)
     .then(data =>{
      setBids(data.data)
     })
  },[user, axiosSecure])


  // // local storage theke token naua

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //        headers: {
  //         authorization : `Bearer ${localStorage.getItem('token')}`
  //       }
        
        
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);
   
  // bids data load


  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //        headers: {
  //         authorization : `Bearer ${user.accessToken}`
  //       }
        
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  // delete
  const handleDeleteBid =(_id)=>{
         

  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
   }).then((result) => {
  if (result.isConfirmed) {
    
    // console.log('now delete')
    fetch(`http://localhost:3000/bids/${_id}`,{
         method: "DELETE",

    })
    .then(res =>res.json())
    .then(data =>{
      //  console.log('after delete', data)
      if(data.deletedCount){
         
       Swal.fire({
      title: "Deleted!",
      text: "Your bid has been deleted.",
      icon: "success"
        });
      //
      const remainingBids = bids.filter(bid => bid._id !== _id);

      setBids(remainingBids)

       }
    })
    }
   });
  }

  return (
    <div>
      <h3>My Bids: {bids.length}</h3>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  Sl. No
                </label>
              </th>
            
              <th>product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
          {
            bids.map((bid , index)=>   <tr key={bid._id}>
              <td>
               {index +1}
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                 {bid.buyer_name}
                
              </td>
              
              <td>{bid.bid_price}</td>
              <td>
                {bid.status === 'pending' ? <div className="badge badge-warning">
                 {bid.status}

                </div>: <div className="badge badge-success">
                 {bid.status}
             
                </div>}
              </td>
              <th>
                <button onClick={()=> handleDeleteBid(bid._id) } className="btn btn-outline btn-xs">Remove Bid</button>
              </th>
            </tr>)
          }
           
         
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default MyBids;
