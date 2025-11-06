
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAxios from "../../Hooks/useAxios";

const CreateAProduct = () => {
  
  // use custom hook
  const { user } = useAuth()
  //  use axios 
  // const axiosInstance = useAxios();
   
  const axiosSecure= useAxiosSecure()


  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const imageUrl = form.imageUrl.value;
    const minPrice = form.price_min.value;
    const maxPrice = form.price_max.value;
    console.log(title, imageUrl, minPrice, maxPrice);
 
    //   post
    const newProduct = { title, imageUrl, minPrice, maxPrice ,
      email: user.email,
      seller_name: user.displayName
    };
    // axios.post("http://localhost:3000/products/", newProduct).then((data) => {
    //   console.log(data);
    //   //  if diya check and show sweat alert
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Your Product has been created",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });

    //        useAxios
    axiosSecure.post('/products', newProduct)
    .then(data =>{
      console.log('after secure call',data.data)
      if (data.data.insertedId){
         Swal.fire({
         position: "top-end",
          icon: "success",
          title: "Your Product has been created",
          showConfirmButton: false,
          timer: 1500,
         });
      }
    })
  };

  return (
    <div className="w-1/2 mx-auto">
      <form onSubmit={handleCreateAProduct}>
        <h3 className="text-2xl font-bold text-center mt-5">
          Create A Product
        </h3>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Title</label>

          <input type="text" className="input w-full" name="title" />

          {/* Image URL */}
          <label className="label">Image URL</label>

          <input type="text" className="input w-full" name="imageUrl" />

          {/* bid amount Min */}

          <label className="label">Min Price</label>
          <input
            type="text"
            className="input w-full"
            name="price_min"
            placeholder="Minimum Price"
          />
          {/* bid amount max */}

          <label className="label">Max Price</label>
          <input
            type="text"
            className="input w-full"
            name="price_max"
            placeholder="Maximum Price"
          />

          <button className="btn btn-neutral mt-4">Add a product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProduct;
