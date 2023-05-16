import React from 'react'
import Comments from './Comments';
// import DelButton from "./DelButton";
// import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'

function DelButton(props) {
  console.log(props);
  if (props.blog == 1) {
    return <button type="button" onClick={async (e) => {

      e.preventDefault();

      const blogId = props.blogId;
      try {

        const res = await fetch('/blogDelete', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            blogId
          })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
          window.alert("Invalid Blog");
          console.log("Invalid Blog");
        } else {
          window.alert("Blog saved successfuly");
          console.log("Blog saved successfuly");

          // navigate('/dashboard');
        }

      } catch (err) {
        console.log(err);
        // navigate('/dashboard');
      }
      window.location.reload();
    }} className="btn btn-outline-danger btn-sm mx-2">
      <i className="zmdi zmdi-delete"></i>
    </button>
  }
}

export default function Blogs() {
  const url = window.location.href;
  const blogId = url.slice(-24);
  const [userData, setUserData] = useState({});
  const getData = async () => {
    try {
      const res = await fetch('/blog/' + blogId, {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const blog = userData;


  const [impData, setImpData] = useState({});
  const getImpData = async () => {
    try {
      const res = await fetch('/authenticate/' + blogId, {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setImpData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getImpData();
  }, []);
  //   console.log(impData);

  return (
    <>
      <div className="card w-50 shadow mx-auto my-5" >
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{blog.topic}</h6>
          <p className="card-text">{blog.content}</p>
          <hr />

          <div className='d-flex bd-highlight mb-3'>

            {/* Blog Like button */}
            <div className='p-2 bd-highlight'>
              <button type="button" onClick={async (e) => {

                e.preventDefault();

                const blogId = blog._id;
                try {

                  const res = await fetch('/like', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      blogId
                    })
                  });

                  const data = await res.json();

                  if (res.status === 422 || !data) {
                    window.alert("Invalid Blog");
                    console.log("Invalid Blog");
                  } else {
                    window.alert("Blog saved successfuly");
                    console.log("Blog saved successfuly");

                    // navigate('/dashboard');
                  }

                } catch (err) {
                  console.log(err);
                  //   navigate('/login');
                }
                window.location.reload();
              }} className="btn btn-outline-danger btn-sm">
                <i className="zmdi zmdi-favorite"></i>
                <span>        {blog.likes}</span>
              </button>
            </div>

            {/* Blog delete botton */}
            <div className='ms-auto p-2 bd-highlight'>
              <DelButton blog={impData.blog} blogId={blog._id} />
            </div>
          </div>

        </div>
      </div>

      <Comments blogId={blog._id} />

      {/* All Comments section */}
      <div>

        {blog.comments && blog.comments.map((item) => (

          <div className="card w-50 shadow mx-auto" >
            <div className="card-body">
              <div className='row'>
                <div className='col-11'>
                  <p className="fw-bold card-title">{item.userName}</p>
                </div>
                <div className='col-1'>
                  <button type="button" onClick={async (e) => {

                    e.preventDefault();

                    const commentId = item._id;
                    try {

                      const res = await fetch('/commentDelete', {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          commentId
                        })
                      });

                      const data = await res.json();

                      if (res.status === 422 || !data) {
                        window.alert("Invalid Blog");
                        console.log("Invalid Blog");
                      } else {
                        window.alert("Blog saved successfuly");
                        console.log("Blog saved successfuly");

                        // navigate('/dashboard');
                      }

                    } catch (err) {
                      console.log(err);
                      // navigate('/dashboard');
                    }
                    window.location.reload();
                  }} className="btn btn-outline-danger btn-sm mx-2">
                    <i className="zmdi zmdi-delete"></i>
                  </button>
                </div>
              </div>
              <p className="card-text">{item.comment}</p>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}