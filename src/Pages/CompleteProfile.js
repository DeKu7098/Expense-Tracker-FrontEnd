import axios from "axios";
import "./CompleteProfile.css";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";




const CompleteProfile = () => {

    const token = useSelector(state => state.auth.IDTOKEN);
    console.log(token);
  
    const inputfullnameref = useRef();
    const imageurlref = useRef();

    useEffect( () => {
        fetchData()
    },[])

    const onsubmithandler = async(event) => {
        event.preventDefault();
        const fullname = inputfullnameref.current.value;
        const imageurl = imageurlref.current.value;

    
    const data = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg",
        {
            idToken: token,
            displayName: fullname,
            photoUrl: imageurl,
            returnSecureToken: true,
        })
        console.log(data.data);
        console.log(data.data.email);
    };

    const fetchData = async () => {
        const data = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg",
            {idToken: token}
        ).then(res =>{
          console.log(res);
        }).catch(err=> {
          console.log(err);
        }
          
        )
        
    }
    //console.log(userData);
    return (
        <React.Fragment>
          <div>
            <div className="style3">
              Winners never quit,Quitters Never win
              <div className="style4">Please Complete Your Profile</div>
              <LogoutButton />
            </div>
          </div>
          <div>
            <div className="style3">
              <div className="style4">
                <form onSubmit={onsubmithandler}>
                  <label for htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    type="fullname"
                    placeholder="Fullname"
                    ref={inputfullnameref}
                    
                    required
                  />
                  <label for htmlFor="url">
                    ImageUrl
                  </label>
                  <input
                    type="url"
                    placeholder="url"
                    ref={imageurlref}
                  
                   
                    required
                  />
                  <button type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
         
        </React.Fragment>
      );
};

export default CompleteProfile;